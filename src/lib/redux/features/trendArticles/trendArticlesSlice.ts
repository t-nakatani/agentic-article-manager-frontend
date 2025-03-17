import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import type { Article } from "@/lib/api/articles"
import { trendArticlesAPI } from "@/lib/api/articles"

interface TrendArticlesState {
  articles: Article[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: TrendArticlesState = {
  articles: [],
  status: "idle",
  error: null
}

// トレンド記事を取得するための非同期アクション
export const fetchTrendArticles = createAsyncThunk(
  "trendArticles/fetchTrendArticles",
  async (userId: string) => {
    try {
      const response = await trendArticlesAPI.getTrendArticles(userId)
      return response.articles
    } catch (error) {
      console.error("トレンド記事の取得に失敗しました:", error)
      throw error
    }
  }
)

const trendArticlesSlice = createSlice({
  name: "trendArticles",
  initialState,
  reducers: {
    clearTrendArticles: (state) => {
      state.articles = []
      state.status = "idle"
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendArticles.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchTrendArticles.fulfilled, (state, action: PayloadAction<Article[]>) => {
        state.status = "succeeded"
        state.articles = action.payload
        state.error = null
      })
      .addCase(fetchTrendArticles.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "トレンド記事の取得に失敗しました"
      })
  }
})

export const { clearTrendArticles } = trendArticlesSlice.actions
export default trendArticlesSlice.reducer 