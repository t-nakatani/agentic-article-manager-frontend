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

export const toggleReadLater = createAsyncThunk(
  "articles/toggleReadLater",
  async ({ articleId, isReadLater, userId }: { articleId: string; isReadLater: boolean; userId: string }, { rejectWithValue }) => {
    try {
      await articlesAPI.toggleReadLater(articleId, { user_id: userId, read_later: isReadLater })
      return { articleId, isReadLater }
    } catch (error) {
      return rejectWithValue("リードレーター状態の更新に失敗しました")
    }
  }
)

export const saveArticleMemo = createAsyncThunk(
  "articles/saveArticleMemo",
  async ({ articleId, memo }: { articleId: string; memo: string }, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState
      const userId = state.auth.user?.uid
      
      if (!userId) {
        return rejectWithValue("ユーザーIDが見つかりません")
      }
      
      // APIを呼び出してメモを保存
      await articlesAPI.saveMemo(articleId, { user_id: userId, memo })
      
      return { articleId, memo }
    } catch (error) {
      return rejectWithValue("メモの保存に失敗しました")
    }
  }
)

export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setArticleMemo: (state, action: PayloadAction<{ articleId: string; memo: string }>) => {
      // メモの状態をローカルで更新（保存前の一時的な状態）
      const { articleId, memo } = action.payload
      const article = state.items.find(item => item.article_id === articleId)
      if (article) {
        article.memoEdit = memo // memoEditはUI上での編集中の値
      }
    },
    
    setArticleMemoVisible: (state, action: PayloadAction<{ articleId: string; isVisible: boolean }>) => {
      // メモの表示/非表示状態を更新
      const { articleId, isVisible } = action.payload
      const article = state.items.find(item => item.article_id === articleId)
      if (article) {
        article.memoVisible = isVisible
      }
    },
  },
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
      .addCase(toggleReadLater.fulfilled, (state, action) => {
        const { articleId, isReadLater } = action.payload
        const article = state.items.find(item => item.article_id === articleId)
        if (article) {
          article.read_later = isReadLater
        }
      })
      .addCase(saveArticleMemo.pending, (state, action) => {
        const { articleId } = action.meta.arg
        const article = state.items.find(item => item.article_id === articleId)
        if (article) {
          article.memoSaving = true
        }
      })
      .addCase(saveArticleMemo.fulfilled, (state, action) => {
        const { articleId, memo } = action.payload
        const article = state.items.find(item => item.article_id === articleId)
        if (article) {
          article.memo = memo
          article.memoEdit = memo // 編集中の値も更新
          article.memoSaving = false
        }
      })
      .addCase(saveArticleMemo.rejected, (state, action) => {
        const { articleId } = action.meta.arg
        const article = state.items.find(item => item.article_id === articleId)
        if (article) {
          article.memoSaving = false
        }
      })
  },
})

export const { setArticleMemo, setArticleMemoVisible } = articlesSlice.actions

export default articlesSlice.reducer

