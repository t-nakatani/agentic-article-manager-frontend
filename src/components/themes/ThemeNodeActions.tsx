"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeEditDialog } from "./theme-rename-dialog"
import { ThemeDeleteDialog } from "./theme-delete-dialog"
import { ThemeMoveDialog } from "./theme-move-dialog"
import { ThemeActionsMenu } from "./theme-actions-menu"
import { useReduxAuth } from "@/hooks/useReduxAuth"
import { useAppDispatch } from "@/lib/redux/hooks"
import { moveTheme } from "@/lib/redux/features/themes/themesSlice"
import { toast } from "sonner"

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
  const [showMove, setShowMove] = useState(false)
  const { user } = useReduxAuth()
  const dispatch = useAppDispatch()

  // テーマ移動処理
  const handleMoveTheme = async (targetParentId: string) => {
    if (!user) return

    try {
      // 数値に変換（APIはnumber型を期待）
      const themeId = parseInt(nodeId, 10)
      // 「すべて」の場合はnullを渡す（APIクラス内で適切に処理される）
      const parentId = targetParentId === "all" ? null : parseInt(targetParentId, 10)

      await dispatch(
        moveTheme({
          userId: user.uid,
          themeId,
          parentThemeId: parentId,
        })
      ).unwrap()
      
      // 成功メッセージ
      toast.success("テーマを移動しました")
    } catch (error) {
      // エラーメッセージ
      toast.error("テーマの移動に失敗しました")
      console.error("テーマ移動エラー:", error)
    }
  }

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
      <ThemeActionsMenu
        className={className}
        onAddChild={() => setShowAddChild(true)}
        onEdit={() => setShowEdit(true)}
        onMove={() => setShowMove(true)}
        onExport={onExport}
        onDelete={() => setShowDelete(true)}
      />

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

      <ThemeMoveDialog
        open={showMove}
        onOpenChange={setShowMove}
        onConfirm={handleMoveTheme}
        themeName={nodeName}
        nodeId={nodeId}
      />
    </>
  )
}

