"use client"

import { ArticleCard } from "@/components/articles/card/article-card"
import { ArticleListSkeleton } from "./article-list-skeleton"
import { StickySearch } from "../search/sticky-search"
import { ArticleListFooter } from "./article-list-footer"
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
  onRefresh: () => Promise<void>
  // ページネーション関連のpropsを追加
  currentPage?: number
  pageSize?: number
  totalItems?: number
  onPageChange?: (page: number) => void
  onPageSizeChange?: (size: number) => void
  showFavorites: boolean
  onShowFavoritesChange: (showFavorites: boolean) => void
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
  onRefresh,
  // ページネーション関連のpropsにデフォルト値を設定
  currentPage = 1,
  pageSize = 20,
  totalItems = 0,
  onPageChange = () => {},
  onPageSizeChange = () => {},
  showFavorites,
  onShowFavoritesChange,
}: ArticleListProps) {
  // 共通のStickySearchコンポーネント
  const searchComponent = (
    <StickySearch
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
      sortField={sortField}
      sortDirection={sortDirection}
      onSortFieldChange={onSortFieldChange}
      onSortDirectionChange={onSortDirectionChange}
      showFavorites={showFavorites}
      onShowFavoritesChange={onShowFavoritesChange}
      onRefresh={onRefresh}
      isSticky={stickySearch}
    />
  );
  
  // 記事がない場合のメッセージ
  const noArticlesMessage = (
    <>
      記事がありません。
      <Link href="/dev" className="text-theme-600 dark:text-theme-400 hover:underline mx-1">
        Chrome拡張機能
      </Link>
      をインストールして記事を追加してください。
    </>
  );
  
  // 検索結果がない場合のメッセージ
  const noSearchResultsMessage = <>検索条件に一致する記事がありません。検索条件を変更してください。</>;

  if (isLoading) {
    return (
      <div className="space-y-4">
        {searchComponent}
        <ArticleListSkeleton />
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <div className="space-y-4">
        {searchComponent}
        <Alert>
          <AlertDescription>
            {totalItems === 0 ? noArticlesMessage : noSearchResultsMessage}
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {searchComponent}
      <div className="grid gap-4 sm:gap-2.5 animate-fadeIn">
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} onDelete={onDeleteArticle} />
        ))}
      </div>
      <ArticleListFooter
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  )
}
