"use client"

import type React from "react"
import type { Article } from "@/types/article"
import { ArticleHeader } from "./article-header"
import { ArticleFooter } from "./article-footer"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import { toggleArticleSelection } from "@/lib/redux/features/articleFilters/articleFiltersSlice"
import { setArticleMemoVisible } from "@/lib/redux/features/articles/articlesSlice"
import { selectArticleMemoState } from "@/lib/redux/features/articles/selectors"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { ArticleMemo } from "../memo/article-memo"

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
  
  // メモの表示状態をReduxから取得
  const { memoVisible } = useAppSelector(state => 
    selectArticleMemoState(state, article.article_id)
  )

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

  const handleMemoToggle = (show: boolean) => {
    // 表示状態の変更はMemoButtonコンポーネント内で処理するため、
    // ここでは何もしない
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
    <div 
      className={`flex flex-col rounded-md border ${
        isSelected ? "border-theme-500 dark:border-theme-400" : "border-theme-200 dark:border-theme-800"
      } bg-card overflow-hidden hover:border-theme-300 dark:hover:border-theme-700 transition-colors shadow-sm cursor-pointer`}
    >
      <div onClick={handleCardClick}>
        <ArticleHeader 
          article={article}
          onDelete={handleDelete}
          onToggleFavorite={handleFavoriteToggle}
          onToggleMemo={handleMemoToggle}
        />
        
        <div className="px-2.5 py-1">
          <p className="text-sm text-theme-700 dark:text-theme-300 line-clamp-2">
            {article.summary}
          </p>
        </div>
        
        <ArticleFooter article={article} />
      </div>
      
      {/* メモセクション - 表示状態はReduxで管理 */}
      {memoVisible && (
        <>
          <div className="border-t border-theme-200 dark:border-theme-800 mx-2.5 my-0"></div>
          <ArticleMemo articleId={article.article_id} />
        </>
      )}
    </div>
  )
}

