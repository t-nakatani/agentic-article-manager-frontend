"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, FileDown, Loader2, HelpCircle, Share } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { setSelectionMode } from "@/lib/redux/features/articleFilters/articleFiltersSlice"
import { toast } from "sonner"
import bulkArticleAPI from "@/lib/api/bulk-article"
import { ExportHelpModal } from "@/components/articles/selection/export-help-modal"
import { ShareArticlesModal } from "./share-articles-modal"

interface SelectionToolbarProps {
  className?: string
}

export function SelectionToolbar({ className }: SelectionToolbarProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  
  // Reduxから選択モードの状態を取得
  const dispatch = useAppDispatch()
  const isSelectionMode = useAppSelector(state => state.articleFilters.isSelectionMode)
  const selectedArticleIds = useAppSelector(state => state.articleFilters.selectedArticleIds)
  const userId = useAppSelector(state => state.auth.user?.uid)

  // 選択モードの切り替え
  const toggleSelectionMode = () => {
    dispatch(setSelectionMode(!isSelectionMode))
  }
  
  // 選択した記事をMDでエクスポートする処理
  const handleExportAsMd = async () => {
    if (!userId) {
      toast.error("ログインが必要です")
      return
    }
    
    if (selectedArticleIds.length === 0) {
      toast.error("エクスポートする記事を選択してください")
      return
    }
    
    setIsExporting(true)
    
    try {
      // 外部APIを呼び出してエクスポート処理を開始
      await bulkArticleAPI.exportArticlesAsMd(userId, selectedArticleIds)
      
      toast.success('エクスポート処理を開始しました。完了までしばらくお待ちください')
      // 処理後に選択モードを終了
      dispatch(setSelectionMode(false))
    } catch (error) {
      console.error('エクスポートエラー:', error)
      toast.error('エクスポート処理に失敗しました。後でもう一度お試しください')
    } finally {
      setIsExporting(false)
    }
  }

  if (!isSelectionMode) {
    return null
  }

  return (
    <div className={cn(
      "rounded-lg border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4",
      className
    )}>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSelectionMode}
            className="mr-2"
            aria-label="選択モードを終了"
            disabled={isExporting}
          >
            <X className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">
            {selectedArticleIds.length}件の記事を選択中
          </span>
        </div>
        <div className="flex items-center ml-auto">
          <Button
            variant="default"
            size="sm"
            onClick={handleExportAsMd}
            disabled={selectedArticleIds.length === 0 || isExporting}
          >
            {isExporting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <FileDown className="mr-2 h-4 w-4" />
            )}
            MDでエクスポート
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsShareModalOpen(true)}
            disabled={selectedArticleIds.length === 0}
            className="ml-2"
          >
            <Share className="mr-2 h-4 w-4" />
            共有
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="ml-2 h-8 w-8"
            onClick={() => setIsHelpModalOpen(true)}
          >
            <HelpCircle className="h-4 w-4" />
            <span className="sr-only">エクスポートについてのヘルプ</span>
          </Button>
          
          {/* モーダルコンポーネント */}
          <ExportHelpModal 
            isOpen={isHelpModalOpen} 
            onClose={() => setIsHelpModalOpen(false)} 
          />
          
          {/* 共有モーダル */}
          <ShareArticlesModal
            isOpen={isShareModalOpen}
            onClose={() => setIsShareModalOpen(false)}
            selectedArticleIds={selectedArticleIds}
          />
        </div>
      </div>
    </div>
  )
} 