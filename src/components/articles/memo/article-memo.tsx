"use client"

import { Textarea } from "@/components/ui/textarea"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { saveArticleMemo, setArticleMemo } from "@/lib/redux/features/articles/articlesSlice"
import { selectArticleMemoState } from "@/lib/redux/features/articles/selectors"
import { toast } from "sonner"

interface ArticleMemoProps {
  articleId: string
}

export function ArticleMemo({ articleId }: ArticleMemoProps) {
  const dispatch = useAppDispatch()
  
  // Reduxから状態を取得
  const { memoEdit, memoSaving } = useAppSelector(state => 
    selectArticleMemoState(state, articleId)
  )

  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // 入力中の値をReduxに反映
    dispatch(setArticleMemo({ 
      articleId, 
      memo: e.target.value 
    }))
  }

  const handleSaveMemo = async () => {
    try {
      await dispatch(saveArticleMemo({ 
        articleId, 
        memo: memoEdit 
      })).unwrap()
      
      toast.success("メモを保存しました")
    } catch (error) {
      console.error("メモの保存に失敗しました", error)
      toast.error("メモの保存に失敗しました", {
        description: "もう一度お試しください",
      })
    }
  }

  // キーボードイベントハンドラ
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Macの場合はCommand + Enter、それ以外の場合はCtrl + Enter
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault() // デフォルトの改行を防止
      handleSaveMemo()
    }
  }

  return (
    <div className="px-2.5 py-3">
      <Textarea
        placeholder="この記事についてメモを残しましょう..."
        value={memoEdit}
        onChange={handleMemoChange}
        className="min-h-[80px] resize-vertical mb-2"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      />
      <div className="flex justify-end items-center">
        <div className="text-xs text-theme-500 dark:text-theme-400">
          {memoSaving ? (
            <span>保存中...</span>
          ) : (
            <span>Ctrl / ⌘ + Enter で保存</span>
          )}
        </div>
      </div>
    </div>
  )
}
