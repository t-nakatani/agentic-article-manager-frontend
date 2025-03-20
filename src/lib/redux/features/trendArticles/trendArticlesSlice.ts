import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import type { Article } from "@/types/article"
import trendArticlesAPI, { TrendArticle } from "@/lib/api/trend-articles"

// APIからのレスポンスをアプリケーションの記事形式に変換する関数
const mapTrendArticleToArticle = (trendArticle: TrendArticle): Article => {
  return {
    article_id: trendArticle.trend_article_id.toString(),
    title: trendArticle.title,
    url: trendArticle.url,
    // 一旦すべて同じグループに
    trendGroup: "latest",
    // 他の必須フィールドに適切なデフォルト値を設定
    one_line_summary: "",
    themes: [],
    registeredAt: new Date().toISOString(),
  };
};

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
  async (_: void, { rejectWithValue }) => {
    try {
      const trendArticles = await trendArticlesAPI.getTrendArticles()
      // APIレスポンスをアプリケーションで使用する形式に変換
      return trendArticles.map(mapTrendArticleToArticle)
    } catch (error) {
      console.error("トレンド記事の取得に失敗しました:", error)
      return rejectWithValue("トレンド記事の取得に失敗しました")
    }
  }
)

const trendArticlesSlice = createSlice({
  name: "trendArticles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendArticles.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchTrendArticles.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.articles = action.payload
        state.error = null
      })
      .addCase(fetchTrendArticles.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload as string
      })
  }
})

export default trendArticlesSlice.reducer 