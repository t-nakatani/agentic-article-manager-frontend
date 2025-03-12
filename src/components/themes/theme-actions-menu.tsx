"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Plus, Pencil, Trash2, Download, Move } from "lucide-react"
import { cn } from "@/lib/utils"

interface ThemeActionsMenuProps {
  onAddChild: () => void
  onEdit: () => void
  onMove: () => void
  onExport: () => void
  onDelete: () => void
  className?: string
}

export function ThemeActionsMenu({
  onAddChild,
  onEdit,
  onMove,
  onExport,
  onDelete,
  className,
}: ThemeActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-6 w-6 shrink-0", className)}
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open theme menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation()
            onAddChild()
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          サブテーマを追加
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation()
            onEdit()
          }}
        >
          <Pencil className="mr-2 h-4 w-4" />
          テーマを編集
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation()
            onMove()
          }}
        >
          <Move className="mr-2 h-4 w-4" />
          テーマを移動
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation()
            onExport()
          }}
        >
          <Download className="mr-2 h-4 w-4" />
          エクスポート
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          className="text-red-600 dark:text-red-400"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          削除
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 