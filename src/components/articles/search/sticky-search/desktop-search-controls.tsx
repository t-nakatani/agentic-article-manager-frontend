import { cn } from "@/lib/utils"
import { ArticleSearch } from "../article-search"
import { ArticleSort } from "../article-sort"
import { ArticleFilter } from "../article-filter"
import { Button } from "@/components/ui/button"
import { RefreshCw, Download } from "lucide-react"
import type { SortField, SortDirection } from "@/types/article"

interface DesktopSearchControlsProps {
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
  isRefreshing: boolean
  handleRefresh: () => Promise<void>
  toggleSelectionMode: () => void
}

export function DesktopSearchControls({
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
  isRefreshing,
  handleRefresh,
  toggleSelectionMode
}: DesktopSearchControlsProps) {
  return (
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
        showReadLater={showReadLater}
        onShowReadLaterChange={onShowReadLaterChange}
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
  )
} 