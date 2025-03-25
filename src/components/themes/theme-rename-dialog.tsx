"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"

interface ThemeEditDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onConfirm: (newName: string) => void
  currentName?: string
  isNew?: boolean
  // 新しいインターフェース用
  title?: string
  confirmLabel?: string
  nodeName?: string
  onCancel?: () => void
  isOpen?: boolean
}

export function ThemeEditDialog({ 
  open, 
  onOpenChange, 
  onConfirm, 
  currentName = "", 
  isNew = false,
  // 新しいインターフェース
  title: customTitle,
  confirmLabel,
  nodeName,
  onCancel,
  isOpen,
}: ThemeEditDialogProps) {
  // 古いAPIと新しいAPIの互換性を保つ
  const isDialogOpen = isOpen !== undefined ? isOpen : open
  const name = nodeName !== undefined ? nodeName : currentName
  const [inputValue, setInputValue] = useState(name)

  // ダイアログが開かれたときに名前をセット
  useEffect(() => {
    if (isDialogOpen) {
      setInputValue(name)
    }
  }, [isDialogOpen, name])

  const handleConfirm = () => {
    onConfirm(inputValue)
    if (onOpenChange) onOpenChange(false)
    if (onCancel) onCancel()
  }

  const handleCancel = () => {
    if (onOpenChange) onOpenChange(false)
    if (onCancel) onCancel()
  }

  const dialogTitle = customTitle || (isNew ? "テーマの作成" : "テーマ名の変更")
  const description = isNew ? "新しいテーマ名を入力してください。" : "新しいテーマ名を入力してください。"
  const buttonText = confirmLabel || (isNew ? "作成" : "変更")

  return (
    <Dialog open={isDialogOpen} onOpenChange={onOpenChange || handleCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Input 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} 
            placeholder="テーマ名" 
            className="w-full" 
            autoFocus
          />
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleCancel}>
            キャンセル
          </Button>
          <Button onClick={handleConfirm}>{buttonText}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// 後方互換性のために旧コンポーネントをエクスポート
export { ThemeEditDialog as ThemeRenameDialog }

