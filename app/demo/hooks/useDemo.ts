"use client"

import { useState, useEffect, useMemo } from "react"
import { mockArticles } from "@/data/mock/articles"
import { useSearch } from "@/hooks/useSearch"
import type { SortField, SortDirection } from "@/types/article"
import type { Article } from "@/lib/api/articles"

export function useDemo() {
  const [selectedTheme, setSelectedTheme] = useState<string>("all")
  const [sortField, setSortField] = useState<SortField>("created_at")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [stickySearch, setStickySearch] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [articles, setArticles] = useState<Article[]>([])
  // ページネーション関連の状態を追加
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // 初期ロード時に200msの遅延を追加
  useEffect(() => {
    const timer = setTimeout(() => {
      // mockArticlesを直接Article型に変換して使用
      const demoArticles: Article[] = mockArticles.map((article, index) => ({
        article_id: `demo-${index}`,
        title: article.title,
        one_line_summary: article.one_line_summary,
        themes: article.themes,
        url: article.url,
        created_at: article.registeredAt,
        last_viewed_at: article.lastViewedAt,
      }))
      setArticles(demoArticles)
      setIsLoading(false)
    }, 200)

    return () => clearTimeout(timer)
  }, [])

  // 検索機能を使用
  const {
    query: searchQuery,
    setQuery: setSearchQuery,
    searchResults: filteredBySearch,
    isSearching,
  } = useSearch(articles, {
    debounceMs: 300,
  })

  // テーマでフィルタリング
  const filteredArticles = useMemo(() => {
    if (selectedTheme === "all") {
      return filteredBySearch
    }
    return filteredBySearch.filter((article) =>
      article.themes.some((theme) => theme.toLowerCase() === selectedTheme.toLowerCase()),
    )
  }, [filteredBySearch, selectedTheme])

  // ソート機能
  const sortedArticles = useMemo(() => {
    return [...filteredArticles].sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]

      // Handle null values for last_viewed_at
      if (sortField === "last_viewed_at") {
        if (aValue === null && bValue === null) return 0
        if (aValue === null) return 1
        if (bValue === null) return -1
      }

      const comparison = sortDirection === "asc" ? 1 : -1
      return (aValue < bValue ? -1 : aValue > bValue ? 1 : 0) * comparison
    })
  }, [filteredArticles, sortField, sortDirection])

  // フィルタリングとソートが変更されたらページをリセット
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedTheme, searchQuery, sortField, sortDirection])

  // ページネーションされた記事を取得
  const getPaginatedArticles = () => {
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = Math.min(startIndex + pageSize, sortedArticles.length)
    return sortedArticles.slice(startIndex, endIndex)
  }

  // 記事削除のモック関数
  const handleDeleteArticle = async (articleId: string) => {
    console.log("Demo mode: Delete article", articleId)
    return Promise.resolve()
  }

  // デモ用のリフレッシュ関数
  const handleRefresh = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 200))
    setIsLoading(false)
    console.log("Demo mode: Refresh articles")
  }

  return {
    selectedTheme,
    setSelectedTheme,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    searchQuery,
    setSearchQuery,
    searchResults: getPaginatedArticles(),
    totalItems: sortedArticles.length,
    currentPage,
    pageSize,
    onPageChange: setCurrentPage,
    onPageSizeChange: setPageSize,
    isSearching,
    stickySearch,
    isLoading,
    handleDeleteArticle,
    handleRefresh,
  }
}

