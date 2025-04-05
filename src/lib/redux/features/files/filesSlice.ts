import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiClient } from "@/lib/api-client"
import type { File } from "@/lib/api/files"

// 状態の型定義
interface FilesState {
  items: File[]
  isLoading: boolean
  error: string | null
}

// 初期状態
const initialState: FilesState = {
  items: [],
  isLoading: false,
  error: null
}

// ファイル取得のための非同期アクション
export const fetchFiles = createAsyncThunk(
  "files/fetchFiles",
  async (userId: string, { rejectWithValue }) => {
    try {
      return await apiClient.files.getFiles(userId)
    } catch (error) {
      console.error("ファイル取得エラー:", error)
      return rejectWithValue("ファイルの取得に失敗しました。後でもう一度お試しください。")
    }
  }
)

// ファイルスライスの作成
const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiles.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.items = action.payload
        state.isLoading = false
      })
      .addCase(fetchFiles.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  }
})

export const filesReducer = filesSlice.reducer; 