"use client"

import { useState, useMemo } from "react"
import { ChevronDown, ChevronUp, TrendingUp } from "lucide-react"
import type { Article } from "@/types/article"
import { TrendArticleCard } from "../card/trend-article-card"

interface TrendArticlesProps {
  articles: Article[]
  onDelete: (articleId: string) => Promise<void>
}

interface TrendSectionProps {
  title: string
  articles: Article[]
}

// 個別のトレンドセクションコンポーネント
function TrendSection({ title, articles, onDelete }: TrendSectionProps) {
  const [isCollapsed, setIsCollapsed] = useState(true) // 初期状態で折りたたむ

  return (
    <div 
      className="mb-0 border border-theme-200 dark:border-theme-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div 
        className="flex items-center justify-between p-4 bg-gradient-to-r from-theme-100 to-theme-50 dark:from-theme-900 dark:to-theme-800 cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-theme-700 dark:text-theme-300">
            <TrendingUp className="h-5 w-5" />
            <h2 className="text-l font-semibold tracking-tight">トレンド記事</h2>
          </div>
          <span className="bg-theme-500 text-white dark:bg-theme-600 dark:text-theme-50 text-xs px-2 py-1 rounded-full font-medium">
            {title}
          </span>
        </div>
        <div className="flex items-center">
          {isCollapsed ? (
            <ChevronDown className="h-5 w-5 text-theme-500 dark:text-theme-400" />
          ) : (
            <ChevronUp className="h-5 w-5 text-theme-500 dark:text-theme-400" />
          )}
        </div>
      </div>

      {!isCollapsed && (
        <div className="grid gap-3 p-4 bg-white dark:bg-theme-950">
          {articles.map((article) => (
            <TrendArticleCard 
              key={article.article_id} 
              article={article} 
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function TrendArticles({ articles, onDelete }: TrendArticlesProps) {
  // 記事をグループ化する（APIレスポンスがグループ化されていない場合のフォールバック）
  const groupedArticles = useMemo(() => {
    // 記事のグループが既に設定されている場合はそのまま使用
    const groups: Record<string, Article[]> = {};
    
    articles.forEach((article) => {
      const groupKey = article.trendGroup || 'default';
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(article);
    });
    
    // グループがない場合は、均等に分割する
    if (Object.keys(groups).length === 1 && groups['default']) {
      const defaultArticles = groups['default'];
      const groupSize = Math.ceil(defaultArticles.length / 3);
      
      return {
        'トレンド1': defaultArticles.slice(0, groupSize),
        'トレンド2': defaultArticles.slice(groupSize, groupSize * 2),
        'トレンド3': defaultArticles.slice(groupSize * 2)
      };
    }
    
    return groups;
  }, [articles]);

  return (
    <div className="grid gap-2.5">
      {Object.entries(groupedArticles).map(([title, groupArticles]) => 
        groupArticles.length > 0 && (
          <TrendSection 
            key={title} 
            title={title} 
            articles={groupArticles} 
            onDelete={onDelete} 
          />
        )
      )}
    </div>
  )
} 