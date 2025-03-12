"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp, Clock } from "lucide-react"
import type { SortField, SortDirection } from "@/types/article"

interface ArticleSortProps {
  field: SortField
  direction: SortDirection
  onFieldChange: (field: SortField) => void
  onDirectionChange: (direction: SortDirection) => void
}

export function ArticleSort({ field, direction, onFieldChange, onDirectionChange }: ArticleSortProps) {
  const toggleDirection = () => {
    onDirectionChange(direction === "asc" ? "desc" : "asc")
  }

  return (
    <div className="flex items-center justify-end">
      <div className="flex border rounded-md overflow-hidden">
        <Select value={field} onValueChange={onFieldChange}>
          <SelectTrigger className="w-[140px] border-0 rounded-none focus:ring-0 focus:ring-offset-0">
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              <SelectValue placeholder="並び順" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="created_at">登録日</SelectItem>
            <SelectItem value="last_viewed_at">最終閲覧</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="h-9 w-[1px] bg-border"></div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDirection}
          className="h-9 w-9 rounded-none border-0"
          aria-label={direction === "asc" ? "古い順" : "新しい順"}
        >
          {direction === "asc" ? (
            <ArrowUp className="h-4 w-4" />
          ) : (
            <ArrowDown className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  )
}

