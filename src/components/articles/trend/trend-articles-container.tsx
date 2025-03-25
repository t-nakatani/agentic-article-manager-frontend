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
        <div className="border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 bg-indigo-50 dark:bg-indigo-950 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-20 w-full rounded-md" />
            <Skeleton className="h-20 w-full rounded-md" />
            <Skeleton className="h-20 w-full rounded-md" />
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
    <div className="mb-6 space-y-2.5">
      <TrendArticles articles={trendArticles} onDelete={onDeleteArticle} />
    </div>
  )
} 