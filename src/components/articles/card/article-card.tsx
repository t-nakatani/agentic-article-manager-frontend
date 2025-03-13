"use client"

import type React from "react"
import type { Article } from "@/types/article"
import { Card } from "@/components/ui/card"
import { ArticleHeader } from "./article-header"
import { ArticleFooter } from "./article-footer"

interface ArticleCardProps {
  article: Article
  onDelete: (articleId: string) => Promise<void>
  onFavoriteToggle?: (articleId: string, isFavorited: boolean) => void
}

export function ArticleCard({ article, onDelete, onFavoriteToggle }: ArticleCardProps) {
  const handleDelete = async () => {
    await onDelete(article.article_id)
  }

  const handleFavoriteToggle = (isFavorited: boolean) => {
    if (onFavoriteToggle) {
      onFavoriteToggle(article.article_id, isFavorited)
    }
  }

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) {
      return
    }
    window.open(article.url, "_blank")
  }

  return (
    <Card
      className="bg-white dark:bg-theme-900 hover:shadow-lg transition-all duration-200 cursor-pointer shadow-none"
      onClick={handleCardClick}
    >
      <div className="space-y-0.5">
        <ArticleHeader 
          article={article} 
          onDelete={handleDelete} 
          onFavoriteToggle={handleFavoriteToggle}
        />
        <ArticleFooter article={article} />
      </div>
    </Card>
  )
}

