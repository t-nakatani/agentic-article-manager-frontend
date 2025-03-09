import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { SortField, SortDirection } from "@/types/article"

interface ArticleSortProps {
  field: SortField
  direction: SortDirection
  onFieldChange: (value: SortField) => void
  onDirectionChange: (value: SortDirection) => void
}

export function ArticleSort({ field, direction, onFieldChange, onDirectionChange }: ArticleSortProps) {
  return (
    <div className="flex items-center justify-end gap-3">
      <Select value={field} onValueChange={onFieldChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="created_at">登録日</SelectItem>
          <SelectItem value="last_viewed_at">最終閲覧</SelectItem>
        </SelectContent>
      </Select>
      <Select value={direction} onValueChange={onDirectionChange}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Order..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="desc">新しい順</SelectItem>
          <SelectItem value="asc">古い順</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

