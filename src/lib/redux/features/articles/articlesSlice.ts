import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import articlesAPI from "@/lib/api/articles"
import type { Article } from "@/lib/api/articles"
import { handleAPIError } from "@/lib/api/error"

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
  },
})

export default articlesSlice.reducer

