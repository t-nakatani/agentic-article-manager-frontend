"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { StarIcon } from "./star-icon"
import { useReduxAuth } from "@/hooks/useReduxAuth"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { toggleFavorite } from "@/lib/redux/features/articles/articlesSlice"
import { toast } from "sonner"

interface FavoriteButtonProps {
  articleId: string
  initialFavorited?: boolean
  onToggle?: (isFavorited: boolean) => void
}

export function FavoriteButton({ articleId, initialFavorited = false, onToggle }: FavoriteButtonProps) {
  const { user } = useReduxAuth()
  const dispatch = useAppDispatch()
  
  // Reduxストアから記事の状態を取得
  const article = useAppSelector(state => 
    state.articles.items.find(item => item.article_id === articleId)
  )
  
  // ローカルステートはReduxの状態を反映するだけ
  const [isFavorited, setIsFavorited] = useState(initialFavorited)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  // Reduxストアの状態が変わったらローカルステートを更新
  useEffect(() => {
    if (article) {
      setIsFavorited(article.is_favorite || false)
    }
  }, [article])

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation() // カードのクリックイベントが発火しないようにする
    
    if (!user || isLoading) return
    
    // アニメーション用のローカルステートを更新
    const newFavoriteState = !isFavorited
    setIsAnimating(true)
    setIsLoading(true)
    
    // アニメーション終了のタイマーを設定
    setTimeout(() => setIsAnimating(false), 300)
    
    try {
      // Reduxアクションをディスパッチ
      await dispatch(toggleFavorite({ articleId, isFavorite: newFavoriteState })).unwrap()
      
      // 親コンポーネントのコールバックも呼び出す（後方互換性のため）
      if (onToggle) {
        onToggle(newFavoriteState)
      }
    } catch (error) {
      // エラー時はトースト表示のみ（状態はReduxで管理）
      console.error("お気に入り状態の更新に失敗しました", error)
      
      toast.error("お気に入りの更新に失敗しました", {
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
      onClick={handleToggleFavorite}
      className="relative h-6 w-6 shrink-0"
      aria-label={isFavorited ? "お気に入りから削除" : "お気に入りに追加"}
      disabled={isLoading || !user}
    >
      <StarIcon isFavorited={isFavorited} isAnimating={isAnimating} />
    </Button>
  )
} 