"use client"

import { useState } from "react"
import { toast } from "sonner"
import { PublicArticleHeader } from "@/components/articles/public-card/public-article-header"
import { PublicArticleBody } from "@/components/articles/public-card/public-article-body"
import { PublicArticleFooter } from "@/components/articles/public-card/public-article-footer"
import { SharedArticleType } from "./types"

interface PublicArticleCardProps {
  article: SharedArticleType
}

export function PublicArticleCard({ article }: PublicArticleCardProps) {
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 15) + 1)
  const [hasLiked, setHasLiked] = useState(false)
  
  const handleLike = () => {
    if (!hasLiked) {
      setLikeCount(likeCount + 1)
      setHasLiked(true)
      toast.success("記事に「いいね！」しました")
    }
  }

  const handleCardClick = () => {
    window.open(article.url, "_blank")
  }
  
  return (
    <div 
      className="flex flex-col p-1.5 md:flex-row rounded-md bg-card overflow-hidden hover:border-indigo-300 hover:bg-indigo-50/30 dark:hover:border-indigo-700 dark:hover:bg-indigo-900/10 transition-all duration-200 shadow-sm cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex-1">
        <PublicArticleHeader article={article} />
        <PublicArticleBody article={article} />
        <PublicArticleFooter 
          article={article}
          likeCount={likeCount}
          hasLiked={hasLiked}
          onLike={handleLike}
        />
      </div>
    </div>
  )
}