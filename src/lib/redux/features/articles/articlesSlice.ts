import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import articlesAPI from "@/lib/api/articles"
import type { Article } from "@/lib/api/articles"
import { handleAPIError } from "@/lib/api/error"
import { RootState } from "@/lib/redux/store"
import { toast } from "sonner"

interface ArticlesState {
  items: Article[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
  faviconCache: Record<string, string | null>
}

const initialState: ArticlesState = {
  items: [],
  status: "idle",
  error: null,
  faviconCache: {},
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

export const regenerateArticle = createAsyncThunk(
  "articles/regenerateArticle",
  async ({ articleId, userId, url }: { articleId: string; userId: string; url: string }, { rejectWithValue }) => {
    try {
      await articlesAPI.regenerateArticle(articleId, {
        user_id: userId,
        url: url,
      })
      
      toast.success("要約を再生成しました", {
        description: "更新された内容を確認してください",
      })
      
      return { articleId }
    } catch (error) {
      toast.error("再生成に失敗しました", {
        description: "もう一度お試しください",
      })
      await handleAPIError(error)
      return rejectWithValue("要約の再生成に失敗しました")
    }
  }
)

export const cacheFavicon = createAsyncThunk(
  "articles/cacheFavicon",
  async ({ domain, faviconUrl }: { domain: string; faviconUrl: string | null }) => {
    return { domain, faviconUrl }
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
      .addCase(regenerateArticle.pending, (state) => {
        state.status = "loading"
      })
      .addCase(regenerateArticle.fulfilled, (state, action) => {
        state.status = "succeeded"
        // action.payloadは{ articleId }のみなので、ここでは記事の内容を更新せず
      })
      .addCase(regenerateArticle.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload as string
      })
      .addCase(cacheFavicon.fulfilled, (state, action) => {
        const { domain, faviconUrl } = action.payload
        state.faviconCache[domain] = faviconUrl
      })
  },
})

export default articlesSlice.reducer

