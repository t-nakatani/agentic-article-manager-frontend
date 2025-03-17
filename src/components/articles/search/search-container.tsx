"use client"

import { StickySearch } from "./sticky-search"
import type { SortField, SortDirection } from "@/types/article"

interface SearchContainerProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  sortField: SortField
  sortDirection: SortDirection
  onSortFieldChange: (field: SortField) => void
  onSortDirectionChange: (direction: SortDirection) => void
  showFavorites: boolean
  onShowFavoritesChange: (showFavorites: boolean) => void
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
  onRefresh,
  isSticky = true
}: SearchContainerProps) {
  return (
    <div className="mb-4">
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
        isSticky={isSticky}
      />
    </div>
  )
} 