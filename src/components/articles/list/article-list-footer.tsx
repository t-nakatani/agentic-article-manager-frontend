"use client"

import { Pagination } from "@/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ArticleListFooterProps {
  currentPage: number
  pageSize: number
  totalItems: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  visible?: boolean
}

const PAGE_SIZES = [20, 50, 100]

export function ArticleListFooter({
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  visible = true
}: ArticleListFooterProps) {
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, totalItems)
  
  if (!visible || totalItems === 0) {
    return null
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t pt-4 gap-4">
      <div className="flex items-center gap-4 text-sm text-muted-foreground min-w-[280px]">
        <span>表示件数:</span>
        <Select value={pageSize.toString()} onValueChange={(value) => onPageSizeChange(Number(value))}>
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PAGE_SIZES.map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span>
          {startIndex + 1}-{endIndex} / {totalItems}件
        </span>
      </div>
      <Pagination
        totalItems={totalItems}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </div>
  )
} 