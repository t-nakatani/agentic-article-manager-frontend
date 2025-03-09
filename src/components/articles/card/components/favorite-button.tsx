"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { StarIcon } from "./star-icon"
import { useReduxAuth } from "@/hooks/useReduxAuth"
import articlesAPI from "@/lib/api/articles"
import { useToast } from "@/components/ui/use-toast"

interface FavoriteButtonProps {
  articleId: string
  initialFavorited?: boolean
  onToggle?: (isFavorited: boolean) => void
}

export function FavoriteButton({ articleId, initialFavorited = false, onToggle }: FavoriteButtonProps) {
  const { user } = useReduxAuth()
  const { toast } = useToast()
  const [isFavorited, setIsFavorited] = useState(initialFavorited)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation() // カードのクリックイベントが発火しないようにする
    
    if (!user || isLoading) return
    
    // 即座に状態を更新してアニメーションを開始
    const newFavoriteState = !isFavorited
    setIsFavorited(newFavoriteState)
    setIsAnimating(true)
    setIsLoading(true)
    
    // アニメーション終了のタイマーを設定
    setTimeout(() => setIsAnimating(false), 300)
    
    try {
      // APIリクエストを実行（結果を待たずにUIは更新済み）
      await articlesAPI.toggleFavorite(articleId, {
        user_id: user.uid,
        is_favorite: newFavoriteState
      })
      
      console.log(`記事ID: ${articleId} のお気に入り状態を ${newFavoriteState} に変更しました`)
      
      if (onToggle) {
        onToggle(newFavoriteState)
      }
    } catch (error) {
      // エラー時は元の状態に戻す
      console.error("お気に入り状態の更新に失敗しました", error)
      setIsFavorited(!newFavoriteState)
      
      toast({
        title: "お気に入りの更新に失敗しました",
        description: "もう一度お試しください",
        variant: "destructive",
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