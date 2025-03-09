"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { StarIcon } from "./star-icon"

interface FavoriteButtonProps {
  articleId: string
  initialFavorited?: boolean
  onToggle?: (isFavorited: boolean) => void
}

export function FavoriteButton({ articleId, initialFavorited = false, onToggle }: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(initialFavorited)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation() // カードのクリックイベントが発火しないようにする
    
    setIsAnimating(true)
    setIsFavorited(!isFavorited)

    console.log(`記事ID: ${articleId} のお気に入り状態を ${!isFavorited} に変更しました`)

    if (onToggle) {
      onToggle(!isFavorited)
    }

    // アニメーション終了後にフラグをリセット
    setTimeout(() => setIsAnimating(false), 300)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggleFavorite}
      className="relative h-6 w-6 shrink-0"
      aria-label={isFavorited ? "お気に入りから削除" : "お気に入りに追加"}
    >
      <StarIcon isFavorited={isFavorited} isAnimating={isAnimating} />
    </Button>
  )
} 