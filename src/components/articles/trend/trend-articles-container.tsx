"use client"

import { useReduxTrendArticles } from "@/hooks/useReduxTrendArticles"
import { TrendArticles } from "./trend-articles"
import { Skeleton } from "@/components/ui/skeleton"

interface TrendArticlesContainerProps {
  onDeleteArticle: (articleId: string) => Promise<void>
}

export function TrendArticlesContainer({ onDeleteArticle }: TrendArticlesContainerProps) {
  const {
    trendArticles,
    isTrendLoading,
    hasTrendArticles,
    trendError,
  } = useReduxTrendArticles()

  // ローディング表示
  if (isTrendLoading) {
    return (
      <div className="mb-6">
        <div className="border-2 border-theme-200 dark:border-theme-800 rounded-lg p-4 bg-theme-50 dark:bg-theme-900">
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-5 w-24" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    )
  }

  // エラー時や記事がない場合は表示しない
  if (trendError || !hasTrendArticles) {
    return null
  }

  return (
    <div className="mb-6">
      <TrendArticles articles={trendArticles} onDelete={onDeleteArticle} />
    </div>
  )
} 