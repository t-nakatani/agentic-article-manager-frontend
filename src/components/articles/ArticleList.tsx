"use client"

import React from "react"
import { ArticleCard } from "./ArticleCard"
import { ArticleSkeleton } from "./ArticleSkeleton"
import { StickySearch } from "./StickySearch"
import { Pagination } from "@/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { SortField, SortDirection } from "@/types/article"
import type { Article } from "@/lib/api/articles"
import Link from "next/link"

interface ArticleListProps {
  articles: Article[]
  isLoading: boolean
  selectedTheme: string
  sortField: SortField
  sortDirection: SortDirection
  onSortFieldChange: (field: SortField) => void
  onSortDirectionChange: (direction: SortDirection) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  isSearching?: boolean
  stickySearch?: boolean
  onDeleteArticle: (articleId: string) => Promise<void>
  onRefresh: () => Promise<void> // 追加
}

const PAGE_SIZES = [10, 20, 50]

function sortArticles(articles: Article[], field: SortField, direction: SortDirection): Article[] {
  return [...articles].sort((a, b) => {
    const aValue = a[field]
    const bValue = b[field]

    // Handle null values for lastViewedAt
    if (field === "lastViewedAt") {
      if (aValue === null && bValue === null) return 0
      if (aValue === null) return 1
      if (bValue === null) return -1
    }

    const comparison = direction === "asc" ? 1 : -1
    return (aValue < bValue ? -1 : aValue > bValue ? 1 : 0) * comparison
  })
}

export function ArticleList({
  articles,
  isLoading,
  selectedTheme,
  sortField,
  sortDirection,
  onSortFieldChange,
  onSortDirectionChange,
  searchQuery,
  onSearchChange,
  isSearching = false,
  stickySearch = false,
  onDeleteArticle,
  onRefresh, // 追加
}: ArticleListProps) {
  const [currentPage, setCurrentPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(10)

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [pageSize, sortField, sortDirection, selectedTheme]) // Added sortField, sortDirection, selectedTheme

  if (isLoading) {
    return (
      <div className="space-y-4">
        <StickySearch
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          sortField={sortField}
          sortDirection={sortDirection}
          onSortFieldChange={onSortFieldChange}
          onSortDirectionChange={onSortDirectionChange}
          onRefresh={onRefresh}
          isSticky={stickySearch}
        />
        <ArticleSkeleton />
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <Alert>
        <AlertDescription>
          記事がありません。
          <Link href="/dev" className="text-theme-600 dark:text-theme-400 hover:underline mx-1">
            Chrome拡張機能
          </Link>
          をインストールして記事を追加してください。
        </AlertDescription>
      </Alert>
    )
  }

  // テーマIDとテーマ名の型の不一致を解決するため、テーマ名を小文字に変換して比較します
  const filteredArticles =
    selectedTheme === "all"
      ? articles
      : articles.filter((article) =>
          article.themes.some((theme) => theme.toLowerCase() === selectedTheme.toLowerCase()),
        )

  const sortedArticles = sortArticles(filteredArticles, sortField, sortDirection)

  // Calculate pagination
  const totalItems = sortedArticles.length
  const totalPages = Math.ceil(totalItems / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, totalItems)
  const currentArticles = sortedArticles.slice(startIndex, endIndex)

  return (
    <div className="space-y-4">
      <StickySearch
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        sortField={sortField}
        sortDirection={sortDirection}
        onSortFieldChange={onSortFieldChange}
        onSortDirectionChange={onSortDirectionChange}
        onRefresh={onRefresh}
        isSticky={stickySearch}
      />
      <div className="grid gap-4">
        {currentArticles.map((article) => (
          <ArticleCard key={article.article_id} article={article} onDelete={onDeleteArticle} />
        ))}
      </div>
      <div className="flex items-center justify-between border-t pt-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground min-w-[280px]">
          <span>表示件数:</span>
          <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PAGE_SIZES.map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span>
            {startIndex + 1}-{endIndex} / {totalItems}件
          </span>
        </div>
        <Pagination
          totalItems={totalItems}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  )
}

