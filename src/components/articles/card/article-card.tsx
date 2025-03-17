"use client"

import type React from "react"
import type { Article } from "@/types/article"
import { Card } from "@/components/ui/card"
import { ArticleHeader } from "./article-header"
import { ArticleFooter } from "./article-footer"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import { toggleArticleSelection } from "@/lib/redux/features/articleFilters/articleFiltersSlice"
import { cn } from "@/lib/utils"

interface ArticleCardProps {
  article: Article
  onDelete: (articleId: string) => Promise<void>
  onFavoriteToggle?: (articleId: string, isFavorited: boolean) => void
}

export function ArticleCard({ article, onDelete, onFavoriteToggle }: ArticleCardProps) {
  // Reduxから選択モードの状態を取得
  const dispatch = useAppDispatch()
  const isSelectionMode = useAppSelector(state => state.articleFilters.isSelectionMode)
  const selectedArticleIds = useAppSelector(state => state.articleFilters.selectedArticleIds)
  
  // この記事が選択されているかどうか
  const isSelected = selectedArticleIds.includes(article.article_id)

  const handleDelete = async () => {
    await onDelete(article.article_id)
  }

  const handleFavoriteToggle = (isFavorited: boolean) => {
    if (onFavoriteToggle) {
      onFavoriteToggle(article.article_id, isFavorited)
    }
  }

  const handleCardClick = (e: React.MouseEvent) => {
    // 選択モードの場合
    if (isSelectionMode) {
      // ボタンクリックの場合は何もしない（ボタンの動作を優先）
      if ((e.target as HTMLElement).closest("button")) {
        return
      }
      
      // 記事の選択状態を切り替え
      dispatch(toggleArticleSelection(article.article_id))
      return
    }
    
    // 通常モードの場合は従来通りの動作
    if ((e.target as HTMLElement).closest("button")) {
      return
    }
    window.open(article.url, "_blank")
  }

  return (
    <Card
      className={cn(
        "bg-white dark:bg-theme-900 hover:shadow-lg transition-all duration-200 cursor-pointer shadow-none border border-sky-100 dark:border-sky-900 hover:border-theme-200 dark:hover:border-theme-800 rounded-xl overflow-hidden relative before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-theme-200/50 dark:before:bg-theme-700/30",
        isSelectionMode && "hover:border-theme-400 dark:hover:border-theme-600",
        isSelected && "border-theme-400 dark:border-theme-600 bg-theme-50 dark:bg-theme-950"
      )}
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

