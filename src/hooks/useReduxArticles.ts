"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { 
  fetchArticles, 
  deleteArticle,
  toggleFavorite 
} from "@/lib/redux/features/articles/articlesSlice"
import {
  selectPaginatedArticles,
  selectIsArticlesLoading,
  selectTotalItems,
} from "@/lib/redux/features/articles/selectors"
import { 
  setCurrentPage, 
  setPageSize,
  setShowFavorites 
} from "@/lib/redux/features/articleFilters/articleFiltersSlice"
import { toast } from "@/components/ui/use-toast"

export function useReduxArticles() {
  const dispatch = useAppDispatch()
  const paginatedArticles = useAppSelector(selectPaginatedArticles)
  const totalItems = useAppSelector(selectTotalItems)
  const isLoading = useAppSelector(selectIsArticlesLoading)
  const error = useAppSelector((state) => state.articles.error)
  const user = useAppSelector((state) => state.auth.user)
  const currentPage = useAppSelector((state) => state.articleFilters.currentPage)
  const pageSize = useAppSelector((state) => state.articleFilters.pageSize)
  const showFavorites = useAppSelector((state) => state.articleFilters.showFavorites)

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
      toast({
        title: "記事を削除しました",
      })
    } catch (error) {
      toast({
        title: "削除に失敗しました",
        variant: "destructive",
      })
    }
  }

  const handleToggleFavorite = async (articleId: string, isFavorite: boolean) => {
    try {
      await dispatch(toggleFavorite({ articleId, isFavorite })).unwrap()
    } catch (error) {
      toast({
        title: "お気に入りの更新に失敗しました",
        variant: "destructive",
      })
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

  const handleShowFavoritesChange = (show: boolean) => {
    dispatch(setShowFavorites(show))
  }

  return {
    articles: paginatedArticles,
    totalItems,
    currentPage,
    pageSize,
    showFavorites,
    isLoading,
    error,
    deleteArticle: handleDeleteArticle,
    toggleFavorite: handleToggleFavorite,
    refreshArticles,
    onPageChange: handlePageChange,
    onPageSizeChange: handlePageSizeChange,
    onShowFavoritesChange: handleShowFavoritesChange,
  }
}

