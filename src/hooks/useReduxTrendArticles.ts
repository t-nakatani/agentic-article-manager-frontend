"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { fetchTrendArticles } from "@/lib/redux/features/trendArticles/trendArticlesSlice"
import { toast } from "sonner"
import { selectIsAuthenticated } from "@/lib/redux/features/auth/selectors"

export function useReduxTrendArticles() {
  const dispatch = useAppDispatch()
  const { articles: trendArticles, status: trendStatus, error } = useAppSelector((state) => state.trendArticles)
  const user = useAppSelector((state) => state.auth.user)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  // ユーザーIDが利用可能になったらトレンド記事を取得
  useEffect(() => {
    if (user && trendStatus === "idle") {
      dispatch(fetchTrendArticles(user.uid))
    }
  }, [dispatch, user, trendStatus])

  // 記事を再取得する関数
  const refreshTrendArticles = async () => {
    if (!user) return
    
    // 認証されていないユーザーの場合は操作を制限
    if (!isAuthenticated) {
      toast.info("この機能を使用するにはログインが必要です")
      return
    }

    try {
      await dispatch(fetchTrendArticles(user.uid)).unwrap()
    } catch (error) {
      toast.error("トレンド記事の更新に失敗しました")
      console.error("トレンド記事の更新エラー:", error)
    }
  }

  return {
    trendArticles,
    isTrendLoading: trendStatus === "loading",
    hasTrendArticles: trendArticles.length > 0,
    refreshTrendArticles,
    trendError: error
  }
} 