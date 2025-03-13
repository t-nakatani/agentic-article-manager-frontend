"use client"

import { ArticleCard } from "@/components/articles/card/article-card"
import { ArticleListSkeleton } from "./article-list-skeleton"
import { StickySearch } from "../search/sticky-search"
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

const PAGE_SIZES = [10, 20, 50]

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

  // 総ページ数を計算
  const totalPages = Math.ceil(totalItems / pageSize)
  // 表示範囲を計算
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, totalItems)

  return (
    <div className="space-y-4">
      {searchComponent}
      <div className="grid gap-3.5">
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} onDelete={onDeleteArticle} />
        ))}
      </div>
      {totalItems > 0 && onPageChange && onPageSizeChange && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">表示件数:</span>
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => onPageSizeChange(parseInt(value))}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={pageSize.toString()} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalItems / pageSize)}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  )
}

