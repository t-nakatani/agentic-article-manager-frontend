"use client"

import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { selectArticleMemoState } from "@/lib/redux/features/articles/selectors"
import { saveArticleMemo, setArticleMemoVisible } from "@/lib/redux/features/articles/articlesSlice"
import { useReduxAuth } from "@/hooks/useReduxAuth"
import { toast } from "sonner"

interface MemoButtonProps {
  articleId: string
  onToggle: (showMemo: boolean) => void
}

export function MemoButton({ articleId, onToggle }: MemoButtonProps) {
  const { user } = useReduxAuth()
  const dispatch = useAppDispatch()
  
  // Reduxからメモの状態を取得
  const { memo, memoEdit, memoVisible, memoSaving } = useAppSelector(state => 
    selectArticleMemoState(state, articleId)
  )
  
  const [isAnimating, setIsAnimating] = useState(false)

  const handleToggleMemo = async (e: React.MouseEvent) => {
    e.stopPropagation()
    
    // 現在表示中の場合は閉じる前に保存
    if (memoVisible && memoEdit !== memo && !memoSaving) {
      try {
        await dispatch(saveArticleMemo({ 
          articleId, 
          memo: memoEdit 
        })).unwrap()
        
        toast.success("メモを保存しました")
      } catch (error) {
        console.error("メモの保存に失敗しました", error)
        toast.error("メモの保存に失敗しました")
      }
    }
    
    // 表示/非表示を切り替え
    const newVisibleState = !memoVisible
    dispatch(setArticleMemoVisible({ 
      articleId, 
      isVisible: newVisibleState 
    }))
    
    // 親コンポーネントに通知
    onToggle(newVisibleState)
    
    // アニメーション
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 300)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`h-8 w-8 rounded-full ${
        // メモ表示中は強調色、それ以外はデフォルトの灰色
        memoVisible 
          ? 'text-theme-500 dark:text-theme-400' 
          : 'text-gray-600 dark:text-gray-600'
      } ${isAnimating ? 'scale-125' : ''} transition-all duration-300`}
      onClick={handleToggleMemo}
      aria-label={memoVisible ? "メモを閉じる" : "メモを開く"}
      disabled={memoSaving}
    >
      <Pencil className="h-4 w-4" />
    </Button>
  )
} 