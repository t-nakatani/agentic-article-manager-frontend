import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { TreeNode } from "@/types/theme"
import { themesAPI, ROOT_THEME_PARENT_ID } from "@/lib/api/themes"
import { handleAPIError } from "@/lib/api/error"
import { toast } from "sonner"

// APIレスポンスの型 (themes.tsからコピー)
interface ApiThemeNode {
  id: number
  name: string
  children: ApiThemeNode[]
}

interface ThemeResponse {
  root: ApiThemeNode[]
}

// Helper function to convert API response to TreeNode structure
const convertApiNodesToTreeNodes = (apiNodes: ApiThemeNode[]): TreeNode[] => {
  const convertNode = (apiNode: ApiThemeNode): TreeNode => ({
    id: apiNode.id.toString(), // Convert id to string
    label: apiNode.name, // Map name to label
    children: apiNode.children.map(convertNode),
  })
  return apiNodes.map(convertNode)
}

// Helper function to add the "all" root node
const addRootNode = (treeNodes: TreeNode[]): TreeNode[] => {
  return [
    {
      id: "all",
      label: "すべて",
      children: treeNodes,
    },
  ]
}

interface ThemesState {
  themeTree: TreeNode[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
  selectedTheme: string
}

const initialState: ThemesState = {
  themeTree: [],
  status: "idle",
  error: null,
  selectedTheme: "all",
}

export const fetchThemes = createAsyncThunk(
  "themes/fetchThemes",
  async (userId: string, { rejectWithValue }) => {
    try {
      let response = await themesAPI.getThemes(userId)
      if (!response) {
        // Initialize if themes don't exist
        await themesAPI.initializeThemes({ user_id: userId })
        response = await themesAPI.getThemes(userId) // Fetch again after init
      }
      // Convert API response to TreeNode[] and add root node
      if (response && response.root) {
        const treeNodes = convertApiNodesToTreeNodes(response.root)
        return addRootNode(treeNodes)
      }
      return addRootNode([]) // Return empty tree with root if response is empty after init
    } catch (error) {
      await handleAPIError(error)
      return rejectWithValue("Failed to fetch themes")
    }
  }
)

export const createTheme = createAsyncThunk(
  "themes/createTheme",
  async (
    { userId, parentId, name }: { userId: string; parentId: string | null; name: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await themesAPI.createTheme({
        user_id: userId,
        // Handle "all" node case for parent_theme_id
        parent_theme_id: parentId === "all" ? null : parentId ? Number(parentId) : null,
        theme_name: name,
      })

      // Refetch themes to update the tree structure correctly
      await dispatch(fetchThemes(userId))

      // Return the new theme details (optional, might not be needed if refetching)
      return {
        themeId: response.theme_id.toString(),
        parentId,
        name,
      }
    } catch (error) {
      await handleAPIError(error)
      return rejectWithValue("Failed to create theme")
    }
  }
)

export const updateTheme = createAsyncThunk(
  "themes/updateTheme",
  async (
    { userId, themeId, name }: { userId: string; themeId: string; name: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      // Cannot rename the "all" node
      if (themeId === "all") {
        toast.error("ルートテーマの名前は変更できません。")
        return rejectWithValue("Cannot rename root theme")
      }
      await themesAPI.updateThemeName(Number(themeId), {
        user_id: userId,
        theme_name: name,
      })
      // Refetch themes to update the tree structure correctly
      await dispatch(fetchThemes(userId))
      return { themeId, name }
    } catch (error) {
      await handleAPIError(error)
      return rejectWithValue("Failed to update theme")
    }
  }
)

export const deleteTheme = createAsyncThunk(
  "themes/deleteTheme",
  async (
    { userId, themeId }: { userId: string; themeId: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      // Cannot delete the "all" node
      if (themeId === "all") {
        toast.error("ルートテーマは削除できません。")
        return rejectWithValue("Cannot delete root theme")
      }
      await themesAPI.deleteTheme(themeId, userId)
      // Refetch themes to update the tree structure correctly
      await dispatch(fetchThemes(userId))
      return themeId
    } catch (error) {
      await handleAPIError(error)
      return rejectWithValue("Failed to delete theme")
    }
  }
)

export const exportTheme = createAsyncThunk(
  "themes/exportTheme",
  async ({ userId, themeId }: { userId: string; themeId: string }, { rejectWithValue }) => {
    try {
      // Cannot export the "all" node virtually
      if (themeId === "all") {
        toast.error("ルートテーマ全体のエクスポートは現在サポートされていません。")
        return rejectWithValue("Cannot export root theme directly")
      }
      const response = await themesAPI.exportTheme(Number(themeId), {
        user_id: userId,
      })
      return { requestId: response.request_id, themeId }
    } catch (error) {
      await handleAPIError(error)
      return rejectWithValue("Failed to export theme")
    }
  }
)

export const moveTheme = createAsyncThunk(
  "themes/moveTheme",
  async (
    { userId, themeId, parentThemeId }: { userId: string; themeId: number; parentThemeId: number | null },
    { rejectWithValue, dispatch }
  ) => {
    try {
      await themesAPI.updateThemePath(themeId, userId, parentThemeId)
      // Refetch themes to get the updated tree structure
      await dispatch(fetchThemes(userId))
      // Return null or some indicator, as the state is updated via refetch
      return null
    } catch (error) {
      await handleAPIError(error)
      return rejectWithValue("Failed to move theme")
    }
  }
)

export const themesSlice = createSlice({
  name: "themes",
  initialState,
  reducers: {
    setSelectedTheme: (state, action: PayloadAction<string>) => {
      state.selectedTheme = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchThemes.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchThemes.fulfilled, (state, action: PayloadAction<TreeNode[] | undefined>) => {
        // Directly set the fetched and processed tree
        state.themeTree = action.payload || []
        state.status = "succeeded"
        state.error = null
      })
      .addCase(fetchThemes.rejected, (state, action) => {
        state.status = "failed"
        state.error = (action.payload as string) || "Unknown error"
        state.themeTree = [] // Reset tree on failure
      })
      .addCase(createTheme.pending, (state) => {
        // Optionally set loading state here if needed for UI feedback
        state.status = "loading"
      })
      .addCase(createTheme.fulfilled, (state, action) => {
        toast.success("テーマを作成しました", {
          description: `"${action.payload.name}" を作成しました`,
        })
      })
      .addCase(createTheme.rejected, (state, action) => {
        state.error = (action.payload as string) || "Failed to create theme"
      })
      .addCase(updateTheme.pending, (state) => {
        state.status = "loading"
      })
      .addCase(updateTheme.fulfilled, (state, action) => {
        toast.success("テーマ名を更新しました", {
          description: `"${action.payload.name}" に更新しました`,
        })
      })
      .addCase(updateTheme.rejected, (state, action) => {
        state.error = (action.payload as string) || "Failed to update theme"
      })
      .addCase(deleteTheme.pending, (state) => {
        state.status = "loading"
      })
      .addCase(deleteTheme.fulfilled, (state, action) => {
        if (state.selectedTheme === action.payload) {
          state.selectedTheme = "all"
        }
        toast.success("テーマを削除しました")
      })
      .addCase(deleteTheme.rejected, (state, action) => {
        state.error = (action.payload as string) || "Failed to delete theme"
      })
      .addCase(exportTheme.pending, (state) => {
        // Optional: set loading status specifically for export if needed
      })
      .addCase(exportTheme.fulfilled, (state, action) => {
        toast.success("エクスポートリクエストを送信しました", {
          description: "テーマのエクスポート処理が開始されました。",
        })
      })
      .addCase(exportTheme.rejected, (state, action) => {
        toast.error("エクスポートに失敗しました", {
          description: (action.payload as string) || "不明なエラー",
        })
      })
      .addCase(moveTheme.pending, (state) => {
        state.status = "loading"
      })
      .addCase(moveTheme.fulfilled, (state) => {
        toast.success("テーマを移動しました")
      })
      .addCase(moveTheme.rejected, (state, action) => {
        state.error = (action.payload as string) || "Failed to move theme"
      })
  },
})

export const { setSelectedTheme } = themesSlice.actions
export default themesSlice.reducer

