import { cn } from "@/lib/utils"
import { ArticleSort } from "../article-sort"
import { ArticleFilter } from "../article-filter"
import { Button } from "@/components/ui/button"
import { RefreshCw, Download } from "lucide-react"
import type { SortField, SortDirection } from "@/types/article"

interface MobileSearchControlsProps {
  isCollapsed: boolean
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

export function MobileSearchControls({
  isCollapsed,
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
}: MobileSearchControlsProps) {
  return (
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
  )
} 