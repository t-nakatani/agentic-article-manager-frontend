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
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (newName: string) => void
  currentName: string
  isNew?: boolean
}

export function ThemeEditDialog({ 
  open, 
  onOpenChange, 
  onConfirm, 
  currentName, 
  isNew = false 
}: ThemeEditDialogProps) {
  const [name, setName] = useState(currentName)

  // ダイアログが開かれたときに現在の名前をセット
  useEffect(() => {
    if (open) {
      setName(currentName)
    }
  }, [open, currentName])

  const handleConfirm = () => {
    onConfirm(name)
    onOpenChange(false)
  }

  const title = isNew ? "テーマの作成" : "テーマ名の変更"
  const description = isNew ? "新しいテーマ名を入力してください。" : "新しいテーマ名を入力してください。"
  const buttonText = isNew ? "作成" : "変更"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Input 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="テーマ名" 
            className="w-full" 
            autoFocus
          />
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            キャンセル
          </Button>
          <Button onClick={handleConfirm}>{buttonText}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

