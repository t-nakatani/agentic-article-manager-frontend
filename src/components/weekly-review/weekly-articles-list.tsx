"use client"

import { ArticleCard } from "@/components/articles/card/article-card"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Article } from "@/lib/api/articles"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

interface WeeklyArticlesListProps {
  articles: Article[]
  isLoading: boolean
  weekRangeText: string
  onDeleteArticle: (articleId: string) => Promise<void>
}

export function WeeklyArticlesList({
  articles,
  isLoading,
  weekRangeText,
  onDeleteArticle,
}: WeeklyArticlesListProps) {
  const [expanded, setExpanded] = useState(true)

  // お気に入りの切り替え用のダミー関数
  const handleFavoriteToggle = (articleId: string, isFavorited: boolean) => {
    // 実際の実装ではRedux actionをディスパッチする
  }

  if (isLoading) {
    return <ListSkeleton />
  }

  if (articles.length === 0) {
    return (
      <Card className="border border-indigo-200 dark:border-indigo-800 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-indigo-700 dark:text-indigo-300">
            {weekRangeText}の記事
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>
              この期間に読んだ記事はありません。
              <Link href="/dev" className="text-indigo-600 dark:text-indigo-400 hover:underline mx-1">
                Chrome拡張機能
              </Link>
              をインストールして記事を追加してください。
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border border-indigo-200 dark:border-indigo-800 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-indigo-700 dark:text-indigo-300">
              {weekRangeText}の記事
            </CardTitle>
            <CardDescription className="text-indigo-500 dark:text-indigo-400">
              この期間に読んだ記事が{articles.length}件あります
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-800 hover:text-indigo-700 dark:hover:text-indigo-300"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
            <span className="sr-only">
              {expanded ? "折りたたむ" : "展開する"}
            </span>
          </Button>
        </div>
      </CardHeader>
      {expanded && (
        <CardContent>
          <div className="grid gap-2.5">
            {articles.map((article) => (
              <ArticleCard
                key={article.article_id}
                article={article}
                onDelete={onDeleteArticle}
                onFavoriteToggle={handleFavoriteToggle}
              />
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  )
}

function ListSkeleton() {
  return (
    <Card className="border border-indigo-200 dark:border-indigo-800 shadow-sm">
      <CardHeader className="pb-3">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-32 mt-1" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[100px] w-full" />
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 