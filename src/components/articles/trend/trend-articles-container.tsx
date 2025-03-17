"use client"

import { useReduxTrendArticles } from "@/hooks/useReduxTrendArticles"
import { TrendArticles } from "./trend-articles"

interface TrendArticlesContainerProps {
  onDeleteArticle: (articleId: string) => Promise<void>
}

export function TrendArticlesContainer({ onDeleteArticle }: TrendArticlesContainerProps) {
  const {
    trendArticles,
    isTrendLoading,
    hasTrendArticles,
  } = useReduxTrendArticles()

  if (isTrendLoading || !hasTrendArticles) {
    return null
  }

  return (
    <div className="mb-6">
      <TrendArticles articles={trendArticles} onDelete={onDeleteArticle} />
    </div>
  )
} 