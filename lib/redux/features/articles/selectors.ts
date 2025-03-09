import { createSelector } from "@reduxjs/toolkit"
import type { RootState } from "@/lib/redux/store"
import type { Article } from "@/lib/api/articles"
import { selectThemeNameById } from "@/lib/redux/features/themes/selectors"

// 基本セレクター
const selectArticles = (state: RootState) => state.articles.items
const selectArticlesStatus = (state: RootState) => state.articles.status
const selectArticlesError = (state: RootState) => state.articles.error

// フィルター関連のセレクター
const selectSelectedTheme = (state: RootState) => state.articleFilters.selectedTheme
const selectSortField = (state: RootState) => state.articleFilters.sortField
const selectSortDirection = (state: RootState) => state.articleFilters.sortDirection
const selectSearchQuery = (state: RootState) => state.articleFilters.searchQuery
const selectCurrentPage = (state: RootState) => state.articleFilters.currentPage
const selectPageSize = (state: RootState) => state.articleFilters.pageSize

// メモ化されたセレクター: テーマでフィルタリングされた記事
export const selectFilteredArticlesByTheme = createSelector(
  [selectArticles, selectSelectedTheme, (state) => state],
  (articles, selectedTheme, state): Article[] => {
    if (selectedTheme === "all") {
      return articles
    }
    
    // テーマIDからテーマ名を取得
    const themeName = selectThemeNameById(state, selectedTheme)
    
    if (!themeName || themeName === "all") {
      return articles
    }
    
    return articles.filter((article) =>
      article.themes.some((theme) => theme.toLowerCase() === themeName.toLowerCase()),
    )
  },
)

// お気に入りでフィルタリングされた記事
export const selectFilteredArticlesByFavorite = createSelector(
  [selectFilteredArticlesByTheme, (state) => state.articleFilters.showFavorites],
  (articles, showFavorites): Article[] => {
    if (!showFavorites) {
      return articles
    }
    
    return articles.filter((article) => article.is_favorite === true)
  }
)

// ソート前のフィルタリングチェーンを更新
export const selectSortedArticles = createSelector(
  [selectFilteredArticlesByFavorite, selectSortField, selectSortDirection],
  (articles, field, direction): Article[] => {
    return [...articles].sort((a, b) => {
      const aValue = a[field]
      const bValue = b[field]

      // Handle null values for lastViewedAt
      if (field === "last_viewed_at") {
        if (aValue === null && bValue === null) return 0
        if (aValue === null) return 1
        if (bValue === null) return -1
      }

      const comparison = direction === "asc" ? 1 : -1
      return (aValue < bValue ? -1 : aValue > bValue ? 1 : 0) * comparison
    })
  },
)

// メモ化されたセレクター: 検索クエリでフィルタリングされた記事
export const selectSearchedArticles = createSelector(
  [selectSortedArticles, selectSearchQuery],
  (articles, query): Article[] => {
    if (!query.trim()) return articles

    const normalizedQuery = query.toLowerCase()
    return articles.filter((article) => {
      const titleMatch = article.title.toLowerCase().includes(normalizedQuery)
      const summaryMatch = article.one_line_summary.toLowerCase().includes(normalizedQuery)
      return titleMatch || summaryMatch
    })
  },
)

// メモ化されたセレクター: ページネーションされた記事
export const selectPaginatedArticles = createSelector(
  [selectSearchedArticles, selectCurrentPage, selectPageSize],
  (articles, currentPage, pageSize): Article[] => {
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = Math.min(startIndex + pageSize, articles.length)
    return articles.slice(startIndex, endIndex)
  },
)

// メモ化されたセレクター: 総アイテム数
export const selectTotalItems = createSelector([selectSearchedArticles], (articles): number => articles.length)

// ローディング状態のセレクター
export const selectIsArticlesLoading = createSelector([selectArticlesStatus], (status): boolean => status === "loading")

