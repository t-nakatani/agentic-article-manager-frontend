"use client"

import type React from "react"

import type { Article } from "@/types/article"
import { Card } from "@/components/ui/card"
import { ArticleHeader } from "./article-header"
import { ArticleContent } from "./article-content"
import { ArticleFooter } from "./article-footer"

interface ArticleCardProps {
  article: Article
  onDelete: (articleId: string) => Promise<void>
}

export function ArticleCard({ article, onDelete }: ArticleCardProps) {
  const handleDelete = async () => {
    await onDelete(article.article_id)
  }

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) {
      return
    }
    window.open(article.url, "_blank")
  }

  return (
    <Card
      className="bg-white dark:bg-theme-900 hover:shadow-lg transition-all duration-200 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="space-y-0.5">
        <ArticleHeader article={article} onDelete={handleDelete} />
        <ArticleContent article={article} />
        <ArticleFooter article={article} />
      </div>
    </Card>
  )
}

