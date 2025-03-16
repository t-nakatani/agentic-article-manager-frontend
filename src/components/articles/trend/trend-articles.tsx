"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ChevronDown, ChevronUp, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Article } from "@/types/article"
import { ArticleCard } from "../card/article-card"

interface TrendArticlesProps {
  articles: Article[]
  onDelete: (articleId: string) => Promise<void>
}

interface TrendSectionProps {
  title: string
  articles: Article[]
  onDelete: (articleId: string) => Promise<void>
}

// 個別のトレンドセクションコンポーネント
function TrendSection({ title, articles, onDelete }: TrendSectionProps) {
  const [isCollapsed, setIsCollapsed] = useState(true) // 初期状態で折りたたむ

  return (
    <div 
      className="mb-0 border-2 border-theme-200 dark:border-theme-800 rounded-lg p-4 bg-theme-50 dark:bg-theme-900 cursor-pointer"
      onClick={() => setIsCollapsed(!isCollapsed)}
    >
      <div className="flex items-center justify-between mb-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-theme-700 dark:text-theme-300">
            <TrendingUp className="h-5 w-7" />
            <h2 className="text-xl font-semibold tracking-tight">トレンド記事</h2>
          </div>
          <span className="bg-theme-500 text-white dark:bg-theme-600 dark:text-theme-50 text-xs px-1.5 py-0.7 rounded-full font-medium">
            trend: {title}
          </span>
        </div>
        <div className="flex items-center">
          {isCollapsed ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronUp className="h-4 w-4" />
          )}
        </div>
      </div>

      {!isCollapsed && (
        <div className="grid gap-2 mt-4" onClick={(e) => e.stopPropagation()}>
          {articles.map((article) => (
            <ArticleCard 
              key={article.article_id} 
              article={article} 
              onDelete={onDelete} 
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function TrendArticles({ articles, onDelete }: TrendArticlesProps) {
  // 記事を3つのグループに分ける（各グループ3つの記事）
  const section1Articles = articles.slice(0, 3)
  const section2Articles = articles.slice(3, 6)
  const section3Articles = articles.slice(6, 9)

  return (
    <div className="grid gap-2.5">
      <TrendSection title="test-1" articles={section1Articles} onDelete={onDelete} />
      <TrendSection title="test-2" articles={section2Articles} onDelete={onDelete} />
      <TrendSection title="test-3" articles={section3Articles} onDelete={onDelete} />
    </div>
  )
} 