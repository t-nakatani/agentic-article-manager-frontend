import { Button } from "@/components/ui/button"
import { useReduxAuth } from "@/hooks/useReduxAuth"
import { BookmarkIcon, BookmarkFilledIcon } from "@/components/icons"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { toggleReadLater } from "@/lib/redux/features/articles/articlesSlice"
import { toast } from "sonner"

interface ReadLaterButtonProps {
  articleId: string
  initialReadLater?: boolean
  onToggle?: (isReadLater: boolean) => void
}

export function ReadLaterButton({ articleId, initialReadLater = false, onToggle }: ReadLaterButtonProps) {
  const { user } = useReduxAuth()
  const dispatch = useAppDispatch()
  
  // Reduxストアから記事の状態を取得
  const article = useAppSelector(state => 
    state.articles.items.find(item => item.article_id === articleId)
  )
  
  // ローカルステートはReduxの状態を反映する
  const [isReadLater, setIsReadLater] = useState(initialReadLater)
  const [isLoading, setIsLoading] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  
  // Reduxストアの状態が変わったらローカルステートを更新
  useEffect(() => {
    if (article) {
      setIsReadLater(article.read_later || false)
    }
  }, [article])

  const handleToggleReadLater = async (e: React.MouseEvent) => {
    e.stopPropagation()
    
    if (!user || isLoading) return
    
    // アニメーション用のローカルステートを更新
    setIsAnimating(true)
    setIsLoading(true)
    
    // アニメーション終了のタイマー
    setTimeout(() => setIsAnimating(false), 300)
    
    try {
      // Reduxアクションをディスパッチ
      const newState = !isReadLater
      await dispatch(toggleReadLater({ 
        articleId, 
        isReadLater: newState,
        userId: user.uid 
      })).unwrap()
      
      // 親コンポーネントのコールバックも呼び出す（後方互換性のため）
      if (onToggle) {
        onToggle(newState)
      }
    } catch (error) {
      // エラー時はトースト表示
      console.error("後で読む状態の更新に失敗しました", error)
      
      toast.error("後で読むの更新に失敗しました", {
        description: "もう一度お試しください",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggleReadLater}
      className="relative h-6 w-6 shrink-0"
      aria-label={isReadLater ? "後で読むから削除" : "後で読むに追加"}
      disabled={isLoading || !user}
    >
      {isReadLater ? (
        <BookmarkFilledIcon 
          className={cn(
            "h-4 w-4 text-blue-500 dark:text-blue-400",
            isAnimating && "animate-bookmark-added"
          )} 
        />
      ) : (
        <BookmarkIcon 
          className={cn(
            "h-4 w-4",
            isAnimating && "animate-bookmark-removed"
          )} 
        />
      )}
    </Button>
  )
} 