import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ThemeDeleteDialogProps {
  // 古いインターフェース
  open?: boolean
  onOpenChange?: (open: boolean) => void
  themeName?: string
  // 新しいインターフェース
  nodeName?: string
  isOpen?: boolean
  onCancel?: () => void
  onConfirm: () => void
}

export function ThemeDeleteDialog({ 
  open, 
  onOpenChange, 
  onConfirm, 
  themeName,
  // 新しいインターフェース
  nodeName,
  isOpen,
  onCancel
}: ThemeDeleteDialogProps) {
  // 古いAPIと新しいAPIの互換性を保つ
  const isDialogOpen = isOpen !== undefined ? isOpen : open
  const displayName = nodeName || themeName || ""

  const handleConfirm = () => {
    onConfirm()
    if (onOpenChange) onOpenChange(false)
    if (onCancel) onCancel()
  }

  const handleCancel = () => {
    if (onOpenChange) onOpenChange(false)
    if (onCancel) onCancel()
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={onOpenChange || handleCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>テーマを削除しますか？</DialogTitle>
          <DialogDescription className="line-clamp-2">{displayName}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleCancel}>
            キャンセル
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            削除
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

