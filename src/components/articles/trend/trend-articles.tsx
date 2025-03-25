"use client"

import { useState, useMemo } from "react"
import { ChevronDown, ChevronUp, TrendingUp } from "lucide-react"
import type { Article } from "@/types/article"
import { PublicArticleCardList } from "@/components/articles/public-card/public-article-card-list"
import { SharedArticleType } from "@/components/articles/public-card/types"

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

  // ArticleをSharedArticleTypeに変換する関数
  const convertToSharedArticles = (articles: Article[]): SharedArticleType[] => {
    return articles.map(article => ({
      article_id: article.article_id,
      id: article.article_id, // ArticleのIDをSharedArticleTypeのIDに使用
      title: article.title,
      url: article.url,
      one_line_summary: article.one_line_summary,
      created_at: article.created_at,
      updated_at: article.created_at, // 仮にcreated_atを使用
      is_favorite: article.is_favorite || false,
      is_read_later: article.read_later || false,
      is_processed: true, // デフォルト値
      user_id: "", // デフォルト値
      themes: article.themes,
      last_viewed_at: article.last_viewed_at
    }));
  };

  const sharedArticles = convertToSharedArticles(articles);

  return (
    <div 
      className="border border-indigo-200 dark:border-indigo-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div 
        className="flex items-center justify-between p-4 bg-indigo-50 dark:bg-indigo-950 cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <TrendingUp className="h-5 w-5" />
            <h2 className="text-l font-semibold tracking-tight">トレンド記事</h2>
          </div>
          <span className="bg-indigo-500 text-white dark:bg-indigo-600 dark:text-indigo-50 text-xs px-2.5 py-1 rounded-full font-medium">
            {title}
          </span>
        </div>
        <div className="flex items-center">
          {isCollapsed ? (
            <ChevronDown className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
          ) : (
            <ChevronUp className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
          )}
        </div>
      </div>

      {!isCollapsed && (
        <div className="p-4 bg-white dark:bg-indigo-950">
          <PublicArticleCardList articles={sharedArticles} />
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
    
    // ArticleにtrendGroupがない場合を考慮
    articles.forEach((article) => {
      // @ts-ignore trendGroupが存在しない場合はdefaultを使用
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