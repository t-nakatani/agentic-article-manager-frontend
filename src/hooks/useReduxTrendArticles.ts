"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { fetchTrendArticles } from "@/lib/redux/features/trendArticles/trendArticlesSlice"
import { toast } from "sonner"

export function useReduxTrendArticles() {
  const dispatch = useAppDispatch()
  const { articles: trendArticles, status: trendStatus, error } = useAppSelector((state) => state.trendArticles)
  const user = useAppSelector((state) => state.auth.user)

  // ユーザーIDが利用可能になったらトレンド記事を取得
  useEffect(() => {
    if (user && trendStatus === "idle") {
      dispatch(fetchTrendArticles(user.uid))
    }
  }, [dispatch, user, trendStatus])

  // 記事を再取得する関数
  const refreshTrendArticles = async () => {
    if (!user) return

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