"use client"

import { StickySearch } from "./sticky-search/index"
import { SelectionToolbar } from "../selection/selection-toolbar"
import type { SortField, SortDirection } from "@/types/article"
import { cn } from "@/lib/utils"
import { useAppSelector } from "@/lib/redux/hooks"

interface SearchContainerProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  sortField: SortField
  sortDirection: SortDirection
  onSortFieldChange: (field: SortField) => void
  onSortDirectionChange: (direction: SortDirection) => void
  showFavorites: boolean
  onShowFavoritesChange: (showFavorites: boolean) => void
  showReadLater: boolean
  onShowReadLaterChange: (showReadLater: boolean) => void
  onRefresh: () => Promise<void>
  isSticky?: boolean
}

export function SearchContainer({
  searchQuery,
  onSearchChange,
  sortField,
  sortDirection,
  onSortFieldChange,
  onSortDirectionChange,
  showFavorites,
  onShowFavoritesChange,
  showReadLater,
  onShowReadLaterChange,
  onRefresh,
  isSticky = true
}: SearchContainerProps) {
  const isSelectionMode = useAppSelector(state => state.articleFilters.isSelectionMode)

  return (
    // 常にスティッキー表示する
    <div className={cn("mb-4 sticky top-[57px] z-30")}>
      {isSelectionMode ? (
        <SelectionToolbar />
      ) : (
        <StickySearch
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          sortField={sortField}
          sortDirection={sortDirection}
          onSortFieldChange={onSortFieldChange}
          onSortDirectionChange={onSortDirectionChange}
          showFavorites={showFavorites}
          onShowFavoritesChange={onShowFavoritesChange}
          showReadLater={showReadLater}
          onShowReadLaterChange={onShowReadLaterChange}
          onRefresh={onRefresh}
          isSticky={isSticky}
        />
      )}
    </div>
  )
} 