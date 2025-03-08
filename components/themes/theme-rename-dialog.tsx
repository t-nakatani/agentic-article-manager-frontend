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
import { useState } from "react"

interface ThemeRenameDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (newName: string) => void
  currentName: string
}

export function ThemeRenameDialog({ open, onOpenChange, onConfirm, currentName }: ThemeRenameDialogProps) {
  const [name, setName] = useState(currentName)

  const handleConfirm = () => {
    onConfirm(name)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>テーマ名の変更</DialogTitle>
          <DialogDescription>新しいテーマ名を入力してください。</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="テーマ名" className="w-full" />
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            キャンセル
          </Button>
          <Button onClick={handleConfirm}>変更</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

