"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ExportHelpModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ExportHelpModal({ isOpen, onClose }: ExportHelpModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>マークダウンエクスポートについて</DialogTitle>
          <DialogDescription>
            選択した記事をマークダウン形式でエクスポートする機能です。
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div>
            <h3 className="font-medium">エクスポートの内容</h3>
            <p className="text-sm text-muted-foreground mt-1">
              タイトル/URL/記事のコンテンツが出力されます。
            </p>
          </div>
          
          <div>
            <h3 className="font-medium">エクスポート方法</h3>
            <ol className="text-sm text-muted-foreground mt-1 list-decimal pl-4 space-y-1">
              <li>エクスポートしたい記事を選択</li>
              <li>「mdでExport」ボタンをクリック</li>
              <li>処理が完了すると、ダウンロードが自動的に開始されます</li>
            </ol>
          </div>
          
          <div>
            <h3 className="font-medium">注意事項</h3>
            <ul className="text-sm text-muted-foreground mt-1 list-disc pl-4 space-y-1">
              <li>多数の記事を選択すると処理に時間がかかる場合があります</li>
              <li>エクスポート後は自動的に選択モードが終了します</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 