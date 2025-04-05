import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { Node, Edge } from "reactflow"
import { themesAPI } from "@/lib/api/themes"
import { handleAPIError } from "@/lib/api/error"
import { toast } from "sonner"

interface ThemesState {
  nodes: Node[]
  edges: Edge[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
  selectedTheme: string
}

const initialState: ThemesState = {
  nodes: [],
  edges: [],
  status: "idle",
  error: null,
  selectedTheme: "all",
}

export const fetchThemes = createAsyncThunk("themes/fetchThemes", async (userId: string, { rejectWithValue }) => {
  try {
    const response = await themesAPI.getThemes(userId)
    if (!response) {
      // テーマが存在しない場合は初期化
      await themesAPI.initializeThemes({ user_id: userId })
      return await themesAPI.getThemes(userId)
    }
    return response
  } catch (error) {
    await handleAPIError(error)
    return rejectWithValue("Failed to fetch themes")
  }
})

export const createTheme = createAsyncThunk(
  "themes/createTheme",
  async (
    { userId, parentId, name }: { userId: string; parentId: string | null; name: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await themesAPI.createTheme({
        user_id: userId,
        parent_theme_id: parentId ? Number(parentId) : null,
        theme_name: name,
      })

      return {
        themeId: response.theme_id.toString(),
        parentId,
        name,
      }
    } catch (error) {
      await handleAPIError(error)
      return rejectWithValue("Failed to create theme")
    }
  },
)

export const updateTheme = createAsyncThunk(
  "themes/updateTheme",
  async (
    { userId, themeId, name }: { userId: string; themeId: string; name: string },
    { rejectWithValue },
  ) => {
    try {
      await themesAPI.updateThemeName(Number(themeId), {
        user_id: userId,
        theme_name: name,
      })
      return { themeId, name }
    } catch (error) {
      await handleAPIError(error)
      return rejectWithValue("Failed to update theme")
    }
  },
)

export const deleteTheme = createAsyncThunk(
  "themes/deleteTheme",
  async ({ userId, themeId }: { userId: string; themeId: string }, { rejectWithValue }) => {
    try {
      await themesAPI.deleteTheme(themeId, userId)
      return themeId
    } catch (error) {
      await handleAPIError(error)
      return rejectWithValue("Failed to delete theme")
    }
  },
)

export const saveThemes = createAsyncThunk(
  "themes/saveThemes",
  async ({ userId, nodes, edges }: { userId: string; nodes: Node[]; edges: Edge[] }, { rejectWithValue }) => {
    try {
      // 実際のAPIでは、ノードとエッジをサーバーに保存するロジックが必要
      // 現在のAPIでは直接的なsaveThemesメソッドがないため、ここではモックとして実装
      toast.success("テーマを保存しました", {
        description: "テーマの変更を保存しました。",
      })
      return { nodes, edges }
    } catch (error) {
      await handleAPIError(error)
      return rejectWithValue("Failed to save themes")
    }
  },
)

export const exportTheme = createAsyncThunk(
  "themes/exportTheme",
  async ({ userId, themeId }: { userId: string; themeId: string }, { rejectWithValue }) => {
    try {
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
    { rejectWithValue }
  ) => {
    try {
      await themesAPI.updateThemePath(themeId, userId, parentThemeId)
      // 移動後のテーマツリーを再取得
      return await themesAPI.getThemes(userId)
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
    setNodes: (state, action: PayloadAction<Node[]>) => {
      state.nodes = action.payload
    },
    setEdges: (state, action: PayloadAction<Edge[]>) => {
      state.edges = action.payload
    },
    setSelectedTheme: (state, action: PayloadAction<string>) => {
      state.selectedTheme = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchThemes.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchThemes.fulfilled, (state, action) => {
        if (action.payload) {
          state.nodes = action.payload.nodes
          state.edges = action.payload.edges
        }
        state.status = "succeeded"
        state.error = null
      })
      .addCase(fetchThemes.rejected, (state, action) => {
        state.status = "failed"
        state.error = (action.payload as string) || "Unknown error"
      })
      .addCase(createTheme.fulfilled, (state, action) => {
        const { themeId, parentId, name } = action.payload

        // 新しいノードを追加
        const newNode: Node = {
          id: themeId,
          type: "theme",
          position: { x: 0, y: 0 }, // 位置は後で調整される
          data: { label: name },
        }

        state.nodes.push(newNode)

        // 親ノードがある場合はエッジも追加
        if (parentId) {
          const newEdge: Edge = {
            id: `e-${parentId}-${themeId}`,
            source: parentId,
            target: themeId,
            animated: true,
          }
          state.edges.push(newEdge)
        }

        toast.success("テーマを作成しました", {
          description: `"${name}" を作成しました`,
        })
      })
      .addCase(updateTheme.fulfilled, (state, action) => {
        const { themeId, name } = action.payload

        // ノードの名前を更新
        state.nodes = state.nodes.map((node) =>
          node.id === themeId ? { ...node, data: { ...node.data, label: name } } : node,
        )

        toast.success("テーマを更新しました", {
          description: `"${name}" に更新しました`,
        })
      })
      .addCase(deleteTheme.fulfilled, (state, action) => {
        const themeId = action.payload

        // 削除するノードとその子孫ノードを特定
        const nodesToDelete = new Set<string>()
        const findDescendants = (nodeId: string) => {
          nodesToDelete.add(nodeId)
          state.edges.filter((edge) => edge.source === nodeId).forEach((edge) => findDescendants(edge.target))
        }

        findDescendants(themeId)

        // ノードを削除
        state.nodes = state.nodes.filter((node) => !nodesToDelete.has(node.id))

        // 関連するエッジを削除
        state.edges = state.edges.filter((edge) => !nodesToDelete.has(edge.source) && !nodesToDelete.has(edge.target))

        toast.success("テーマを削除しました")
      })
      .addCase(saveThemes.fulfilled, (state, action) => {
        const { nodes, edges } = action.payload
        state.nodes = nodes
        state.edges = edges
        
        toast.success("テーマを保存しました", {
          description: "テーマの変更を保存しました。",
        })
      })
      .addCase(exportTheme.fulfilled, (state, action) => {
        toast.success("エクスポートリクエストを送信しました", {
          description: "テーマのエクスポート処理が開始されました。",
        })
      })
      .addCase(exportTheme.rejected, (state, action) => {
        toast.error("エクスポートに失敗しました", {
          description: action.payload as string || "エラーが発生しました。",
        })
      })
      .addCase(moveTheme.pending, (state) => {
        state.status = "loading"
      })
      .addCase(moveTheme.fulfilled, (state, action) => {
        state.status = "succeeded"
        if (action.payload) {
          state.nodes = action.payload.nodes
          state.edges = action.payload.edges
        }
      })
      .addCase(moveTheme.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload as string
      })
  },
})

export const { setNodes, setEdges, setSelectedTheme } = themesSlice.actions
export const themesReducer = themesSlice.reducer;

