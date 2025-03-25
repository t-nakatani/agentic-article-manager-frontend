"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { PlusIcon, PenSquareIcon, TrashIcon, DownloadIcon, MoreHorizontalIcon } from "lucide-react"

import { ThemeDeleteDialog } from "./theme-delete-dialog"
import { ThemeEditDialog } from "./theme-rename-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeMoveDialog } from "./theme-move-dialog"
import { useReduxAuth } from "@/hooks/useReduxAuth"
import { useAppDispatch } from "@/lib/redux/hooks"
import { moveTheme } from "@/lib/redux/features/themes/themesSlice"
import { toast } from "sonner"

interface ThemeNodeActionsProps {
  nodeId: string
  nodeName: string
  isRootNode?: boolean
  onAddChild: (name: string) => void
  onRename: (newName: string) => void
  onDelete: () => void
  onExport: () => void
  className?: string
}

export function ThemeNodeActions({
  nodeId,
  nodeName,
  isRootNode = false,
  onAddChild,
  onRename,
  onDelete,
  onExport,
  className,
}: ThemeNodeActionsProps) {
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
      const parentThemeId = parentId === "all" ? null : parseInt(parentId, 10)

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
      <div className={cn("flex gap-1", className)}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent align="end" className="w-48 bg-white dark:bg-gray-950">
              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer text-xs"
                onClick={() => setShowAddThemeModal(true)}
              >
                <PlusIcon className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                サブテーマを追加
              </DropdownMenuItem>

              {!isRootNode && (
                <>
                  <DropdownMenuItem
                    className="flex items-center gap-2 cursor-pointer text-xs"
                    onClick={() => setShowRenameModal(true)}
                  >
                    <PenSquareIcon className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                    テーマ名を変更
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem
                    className="flex items-center gap-2 cursor-pointer text-xs"
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    <TrashIcon className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
                    テーマを削除
                  </DropdownMenuItem>
                </>
              )}
              
              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer text-xs"
                onClick={onExport}
              >
                <DownloadIcon className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                エクスポート
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
      </div>

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

