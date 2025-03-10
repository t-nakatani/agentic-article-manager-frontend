"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Plus, Pencil, Trash2, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeEditDialog } from "./theme-rename-dialog"
import { ThemeDeleteDialog } from "./theme-delete-dialog"

interface ThemeNodeActionsProps {
  nodeId: string
  nodeName: string
  isRootNode: boolean
  onAddChild: (name: string) => void
  onRename: (newName: string) => void
  onDelete: () => void
  onExport: () => void
  className?: string
}

export function ThemeNodeActions({
  nodeId,
  nodeName,
  isRootNode,
  onAddChild,
  onRename,
  onDelete,
  onExport,
  className,
}: ThemeNodeActionsProps) {
  const [showEdit, setShowEdit] = useState(false)
  const [showAddChild, setShowAddChild] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  // ルートノードの場合は追加ボタンのみ表示
  if (isRootNode) {
    return (
      <>
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-6 w-6 shrink-0", className)}
          onClick={(e) => {
            e.stopPropagation()
            setShowAddChild(true)
          }}
        >
          <Plus className="h-4 w-4" />
          <span className="sr-only">Add theme</span>
        </Button>

        <ThemeEditDialog 
          open={showAddChild} 
          onOpenChange={setShowAddChild} 
          onConfirm={(name) => onAddChild(name)} 
          currentName="新しいテーマ" 
          isNew={true} 
        />
      </>
    )
  }

  return (
    <>
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
              setShowAddChild(true)
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            サブテーマを追加
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation()
              setShowEdit(true)
            }}
          >
            <Pencil className="mr-2 h-4 w-4" />
            テーマを編集
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
              setShowDelete(true)
            }}
            className="text-red-600 dark:text-red-400"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            削除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ThemeEditDialog 
        open={showEdit} 
        onOpenChange={setShowEdit} 
        onConfirm={onRename} 
        currentName={nodeName} 
      />

      <ThemeEditDialog 
        open={showAddChild} 
        onOpenChange={setShowAddChild} 
        onConfirm={(name) => {
          onAddChild(name)
        }} 
        currentName="新しいテーマ" 
        isNew={true} 
      />

      <ThemeDeleteDialog 
        open={showDelete} 
        onOpenChange={setShowDelete} 
        onConfirm={onDelete} 
        themeName={nodeName} 
      />
    </>
  )
}

