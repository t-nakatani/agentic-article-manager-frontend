"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ArticleSearch } from "./article-search"
import { ArticleSort } from "./article-sort"
import { ArticleFilter } from "./article-filter"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import type { SortField, SortDirection } from "@/types/article"

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

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await onRefresh()
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <div
      className={cn(
        "rounded-lg border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        isSticky && "sticky top-[57px] z-30",
        className,
      )}
    >
      <div className="p-4">
        <div className="grid gap-4 sm:grid-cols-[1fr_auto_auto_auto]">
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
        </div>
      </div>
    </div>
  )
}

