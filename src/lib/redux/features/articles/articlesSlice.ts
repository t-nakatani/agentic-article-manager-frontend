import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import articlesAPI from "@/lib/api/articles"
import type { Article } from "@/lib/api/articles"
import { handleAPIError } from "@/lib/api/error"
import { RootState } from "@/lib/redux/store"

interface ArticlesState {
  items: Article[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: ArticlesState = {
  items: [],
  status: "idle",
  error: null,
}

export const fetchArticles = createAsyncThunk("articles/fetchArticles", async (userId: string, { rejectWithValue }) => {
  try {
    return await articlesAPI.getArticles(userId)
  } catch (error) {
    await handleAPIError(error)
    return rejectWithValue("Failed to fetch articles")
  }
})

export const deleteArticle = createAsyncThunk(
  "articles/deleteArticle",
  async (articleId: string, { rejectWithValue }) => {
    try {
      await articlesAPI.deleteArticle(articleId)
      return articleId
    } catch (error) {
      await handleAPIError(error)
      return rejectWithValue("Failed to delete article")
    }
  },
)

export const toggleFavorite = createAsyncThunk(
  "articles/toggleFavorite",
  async ({ articleId, isFavorite }: { articleId: string; isFavorite: boolean }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState
      const user = state.auth.user
      
      if (!user) {
        return rejectWithValue("ユーザーが認証されていません")
      }
      
      await articlesAPI.toggleFavorite(articleId, {
        user_id: user.uid,
        is_favorite: isFavorite
      })
      
      return { articleId, isFavorite }
    } catch (error) {
      await handleAPIError(error)
      return rejectWithValue("お気に入りの更新に失敗しました")
    }
  }
)

export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.items = action.payload
        state.error = null
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = "failed"
        state.error = (action.payload as string) || "Unknown error"
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.items = state.items.filter((article) => article.article_id !== action.payload)
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const { articleId, isFavorite } = action.payload
        const article = state.items.find(item => item.article_id === articleId)
        if (article) {
          article.is_favorite = isFavorite
        }
      })
  },
})

export default articlesSlice.reducer

