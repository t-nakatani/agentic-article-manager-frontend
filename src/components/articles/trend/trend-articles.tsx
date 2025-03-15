"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"
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
      className="space-y-4 mb-4 border-2 border-theme-200 dark:border-theme-800 rounded-lg p-4 bg-gradient-to-r from-theme-50 to-white dark:from-theme-950 dark:to-theme-900 cursor-pointer"
      onClick={() => setIsCollapsed(!isCollapsed)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold tracking-tight text-theme-700 dark:text-theme-300">トレンド記事</h2>
          <span className="bg-theme-500 text-white dark:bg-theme-600 dark:text-theme-50 text-xs px-2 py-0.5 rounded-full font-medium">
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
        <div className="grid gap-3.5" onClick={(e) => e.stopPropagation()}>
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
    <div className="space-y-4">
      <TrendSection title="test-1" articles={section1Articles} onDelete={onDelete} />
      <TrendSection title="test-2" articles={section2Articles} onDelete={onDelete} />
      <TrendSection title="test-3" articles={section3Articles} onDelete={onDelete} />
    </div>
  )
} 