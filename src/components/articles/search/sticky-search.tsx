"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ArticleSearch } from "./article-search"
import { ArticleSort } from "./article-sort"
import { ArticleFilter } from "./article-filter"
import { Button } from "@/components/ui/button"
import { RefreshCw, ChevronDown, ChevronUp, Download, X, Check } from "lucide-react"
import type { SortField, SortDirection } from "@/types/article"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { setSelectionMode } from "@/lib/redux/features/articleFilters/articleFiltersSlice"

interface StickySearchProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  sortField: SortField
  sortDirection: SortDirection
  onSortFieldChange: (field: SortField) => void
  onSortDirectionChange: (direction: SortDirection) => void
  showFavorites: boolean
  onShowFavoritesChange: (showFavorites: boolean) => void
  onRefresh: () => Promise<void>
  className?: string
  isSticky?: boolean
}

export function StickySearch({
  searchQuery,
  onSearchChange,
  sortField,
  sortDirection,
  onSortFieldChange,
  onSortDirectionChange,
  showFavorites,
  onShowFavoritesChange,
  onRefresh,
  className,
  isSticky = false,
}: StickySearchProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  
  // Reduxから選択モードの状態を取得
  const dispatch = useAppDispatch()
  const isSelectionMode = useAppSelector(state => state.articleFilters.isSelectionMode)
  const selectedArticleIds = useAppSelector(state => state.articleFilters.selectedArticleIds)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await onRefresh()
    } finally {
      setIsRefreshing(false)
    }
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  // 選択モードの切り替え
  const toggleSelectionMode = () => {
    dispatch(setSelectionMode(!isSelectionMode))
  }
  
  // 選択を確定する処理
  const handleConfirmSelection = () => {
    // ここで選択された記事に対する処理を実行
    // 例: ダウンロードやエクスポートなど
    console.log('選択された記事:', selectedArticleIds)
    
    // 処理後に選択モードを終了
    dispatch(setSelectionMode(false))
  }

  return (
    <div
      className={cn(
        "rounded-lg border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        // isSticky && "sticky top-[120px] z-30",
        className,
      )}
    >
      <div className="p-4 space-y-4 md:space-y-0">
        {/* 選択モード時のヘッダー */}
        {isSelectionMode ? (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSelectionMode}
                className="mr-2"
                aria-label="選択モードを終了"
              >
                <X className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">
                {selectedArticleIds.length}件の記事を選択中
              </span>
            </div>
            <Button
              variant="default"
              size="sm"
              onClick={handleConfirmSelection}
              className="ml-auto"
              disabled={selectedArticleIds.length === 0}
            >
              <Check className="mr-2 h-4 w-4" />
              選択を確定
            </Button>
          </div>
        ) : (
          <>
            {/* 通常モード時のモバイル表示 */}
            <div className="flex items-center justify-between w-full md:hidden">
              <div className="flex-1">
                <ArticleSearch value={searchQuery} onChange={onSearchChange} />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleCollapse}
                className="ml-3"
                aria-label={isCollapsed ? "展開" : "折りたたむ"}
              >
                {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
              </Button>
            </div>
            
            <div className={cn("flex flex-wrap items-center gap-3 justify-end md:hidden", isCollapsed && "hidden")}>
              <ArticleSort
                field={sortField}
                direction={sortDirection}
                onFieldChange={onSortFieldChange}
                onDirectionChange={onSortDirectionChange}
              />
              <ArticleFilter
                showFavorites={showFavorites}
                onShowFavoritesChange={onShowFavoritesChange}
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleRefresh}
                className={cn("h-9 w-9", isRefreshing && "animate-spin")}
                disabled={isRefreshing}
              >
                <RefreshCw className="h-4 w-4" />
                <span className="sr-only">記事を更新</span>
              </Button>
              
              {/* 選択モードボタン（モバイル） */}
              <Button
                variant="outline"
                size="icon"
                onClick={toggleSelectionMode}
                className="h-9 w-9"
              >
                <Download className="h-4 w-4" />
                <span className="sr-only">記事を選択</span>
              </Button>
            </div>
            
            {/* 通常モード時のデスクトップ表示 */}
            <div className="hidden md:grid md:grid-cols-[1fr_auto_auto_auto_auto] md:gap-3 md:items-center">
              <ArticleSearch value={searchQuery} onChange={onSearchChange} />
              <ArticleSort
                field={sortField}
                direction={sortDirection}
                onFieldChange={onSortFieldChange}
                onDirectionChange={onSortDirectionChange}
              />
              <ArticleFilter
                showFavorites={showFavorites}
                onShowFavoritesChange={onShowFavoritesChange}
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleRefresh}
                className={cn("h-9 w-9", isRefreshing && "animate-spin")}
                disabled={isRefreshing}
              >
                <RefreshCw className="h-4 w-4" />
                <span className="sr-only">記事を更新</span>
              </Button>
              
              {/* 選択モードボタン（デスクトップ） */}
              <Button
                variant="outline"
                size="icon"
                onClick={toggleSelectionMode}
                className="h-9 w-9"
              >
                <Download className="h-4 w-4" />
                <span className="sr-only">記事を選択</span>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

