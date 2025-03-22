"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { fetchTrendArticles } from "@/lib/redux/features/trendArticles/trendArticlesSlice"
import { toast } from "sonner"
import { selectIsAuthenticated } from "@/lib/redux/features/auth/selectors"

export function useReduxTrendArticles() {
  const dispatch = useAppDispatch()
  const { articles: trendArticles, status: trendStatus, error } = useAppSelector((state) => state.trendArticles)

  // コンポーネントがマウントされたらトレンド記事を取得
  useEffect(() => {
    if (trendStatus === "idle") {
      dispatch(fetchTrendArticles())
    }
  }, [dispatch, trendStatus])

  // 記事を再取得する関数
  const refreshTrendArticles = async () => {
    try {
      await dispatch(fetchTrendArticles()).unwrap()
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