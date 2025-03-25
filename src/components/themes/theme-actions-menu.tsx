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
import { useState } from "react"
import { ThemeEditDialog } from "./theme-rename-dialog"
import { ThemeDeleteDialog } from "./theme-delete-dialog"
import { ThemeMoveDialog } from "./theme-move-dialog"
import { useReduxAuth } from "@/hooks/useReduxAuth"
import { useAppDispatch } from "@/lib/redux/hooks"
import { moveTheme } from "@/lib/redux/features/themes/themesSlice"
import { toast } from "sonner"

interface ThemeActionsMenuProps {
  nodeId: string
  nodeName: string
  isRootNode?: boolean
  onAddChild: (name: string) => void
  onRename: (newName: string) => void
  onDelete: () => void
  onExport: () => void
  className?: string
}

export function ThemeActionsMenu({
  nodeId,
  nodeName,
  isRootNode = false,
  onAddChild,
  onRename,
  onDelete,
  onExport,
  className,
}: ThemeActionsMenuProps) {
  const [showAddThemeModal, setShowAddThemeModal] = useState(false)
  const [showRenameModal, setShowRenameModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showMove, setShowMove] = useState(false)
  const { user } = useReduxAuth()
  const dispatch = useAppDispatch()

  const handleAddTheme = (name: string) => {
    onAddChild(name)
    setShowAddThemeModal(false)
  }
  
  const handleRenameTheme = (newName: string) => {
    onRename(newName)
    setShowRenameModal(false)
  }
  
  const handleDeleteConfirm = () => {
    onDelete()
    setShowDeleteConfirm(false)
  }

  // テーマ移動処理
  const handleMoveTheme = async (parentId: string | null) => {
    if (!user) return

    try {
      // 数値に変換（APIはnumber型を期待）
      const themeId = parseInt(nodeId, 10)
      // 「すべて」の場合はnullを渡す（APIクラス内で適切に処理される）
      const parentThemeId = parentId === "all" ? null : parentId ? parseInt(parentId, 10) : null

      await dispatch(
        moveTheme({
          userId: user.uid,
          themeId,
          parentThemeId,
        })
      ).unwrap()
      
      // 成功メッセージ
      toast.success("テーマを移動しました")
    } catch (error) {
      // エラーメッセージ
      toast.error("テーマの移動に失敗しました")
      console.error("テーマ移動エラー:", error)
    }

    // モーダルを閉じる
    setShowMove(false)
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
              setShowAddThemeModal(true)
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            サブテーマを追加
          </DropdownMenuItem>
          {!isRootNode && (
            <>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation()
                  setShowRenameModal(true)
                }}
              >
                <Pencil className="mr-2 h-4 w-4" />
                テーマを編集
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation()
                  setShowMove(true)
                }}
              >
                <Move className="mr-2 h-4 w-4" />
                テーマを移動
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation()
              onExport()
            }}
          >
            <Download className="mr-2 h-4 w-4" />
            エクスポート
          </DropdownMenuItem>
          {!isRootNode && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation()
                  setShowDeleteConfirm(true)
                }}
                className="text-red-600 dark:text-red-400"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                削除
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* テーマ追加モーダル */}
      {showAddThemeModal && (
        <ThemeEditDialog
          title="サブテーマを追加"
          confirmLabel="追加"
          currentName=""
          onConfirm={handleAddTheme}
          onOpenChange={(open) => setShowAddThemeModal(open)}
          open={showAddThemeModal}
          isNew={true}
        />
      )}
      
      {/* テーマ名変更モーダル */}
      {showRenameModal && (
        <ThemeEditDialog
          title="テーマ名を変更"
          confirmLabel="変更"
          currentName={nodeName}
          onConfirm={handleRenameTheme}
          onOpenChange={(open) => setShowRenameModal(open)}
          open={showRenameModal}
        />
      )}
      
      {/* テーマ削除確認モーダル */}
      {showDeleteConfirm && (
        <ThemeDeleteDialog
          themeName={nodeName}
          onConfirm={handleDeleteConfirm}
          onOpenChange={(open) => setShowDeleteConfirm(open)}
          open={showDeleteConfirm}
        />
      )}

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