"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { fetchArticles, deleteArticle } from "@/lib/redux/features/articles/articlesSlice"
import {
  selectPaginatedArticles,
  selectIsArticlesLoading,
  selectTotalItems,
} from "@/lib/redux/features/articles/selectors"
import { setCurrentPage, setPageSize } from "@/lib/redux/features/articleFilters/articleFiltersSlice"
import { toast } from "sonner"

export function useReduxArticles() {
  const dispatch = useAppDispatch()
  const paginatedArticles = useAppSelector(selectPaginatedArticles)
  const totalItems = useAppSelector(selectTotalItems)
  const isLoading = useAppSelector(selectIsArticlesLoading)
  const error = useAppSelector((state) => state.articles.error)
  const user = useAppSelector((state) => state.auth.user)
  const currentPage = useAppSelector((state) => state.articleFilters.currentPage)
  const pageSize = useAppSelector((state) => state.articleFilters.pageSize)

  // 元の記事データの有無を取得
  const allArticles = useAppSelector((state) => state.articles.items)

  useEffect(() => {
    if (user && allArticles.length === 0 && !isLoading) {
      dispatch(fetchArticles(user.uid))
    }
  }, [dispatch, user, allArticles.length, isLoading])

  const handleDeleteArticle = async (articleId: string) => {
    try {
      await dispatch(deleteArticle(articleId)).unwrap()
      toast.success("記事を削除しました")
    } catch (error) {
      toast.error("削除に失敗しました")
    }
  }

  const refreshArticles = async () => {
    if (user) {
      try {
        await dispatch(fetchArticles(user.uid)).unwrap()
      } catch (error) {
        // エラーはすでにthunkで処理されている
      }
    }
  }

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  const handlePageSizeChange = (size: number) => {
    dispatch(setPageSize(size))
  }

  return {
    articles: paginatedArticles,
    totalItems,
    currentPage,
    pageSize,
    isLoading,
    error,
    deleteArticle: handleDeleteArticle,
    refreshArticles,
    onPageChange: handlePageChange,
    onPageSizeChange: handlePageSizeChange,
  }
}

