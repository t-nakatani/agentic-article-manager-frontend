"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import type { SortField, SortDirection } from "@/types/article"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { setSelectionMode } from "@/lib/redux/features/articleFilters/articleFiltersSlice"
import { MobileSearchHeader } from "./mobile-search-header"
import { MobileSearchControls } from "./mobile-search-controls"
import { DesktopSearchControls } from "./desktop-search-controls"

interface StickySearchProps {
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
  showReadLater,
  onShowReadLaterChange,
  onRefresh,
  className,
  isSticky = false,
}: StickySearchProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  
  // Reduxから選択モードの状態を取得
  const dispatch = useAppDispatch()
  const isSelectionMode = useAppSelector(state => state.articleFilters.isSelectionMode)

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

  return (
    <div
      className={cn(
        "rounded-lg border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className,
      )}
    >
      <div className="p-4 space-y-4 md:space-y-0">
        {/* モバイルヘッダー */}
        <MobileSearchHeader 
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          isCollapsed={isCollapsed}
          toggleCollapse={toggleCollapse}
        />
        
        {/* モバイルコントロール */}
        <MobileSearchControls
          isCollapsed={isCollapsed}
          sortField={sortField}
          sortDirection={sortDirection}
          onSortFieldChange={onSortFieldChange}
          onSortDirectionChange={onSortDirectionChange}
          showFavorites={showFavorites}
          onShowFavoritesChange={onShowFavoritesChange}
          showReadLater={showReadLater}
          onShowReadLaterChange={onShowReadLaterChange}
          isRefreshing={isRefreshing}
          handleRefresh={handleRefresh}
          toggleSelectionMode={toggleSelectionMode}
        />
        
        {/* デスクトップコントロール */}
        <DesktopSearchControls
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
          isRefreshing={isRefreshing}
          handleRefresh={handleRefresh}
          toggleSelectionMode={toggleSelectionMode}
        />
      </div>
    </div>
  )
} 