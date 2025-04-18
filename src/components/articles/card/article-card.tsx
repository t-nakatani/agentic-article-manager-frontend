"use client"

import * as React from "react"
import { articlesAPI } from "@/lib/api/articles"
import type { Article } from "@/types/article"
import { ArticleHeader } from "./article-header"
import { ArticleFooter } from "./article-footer"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import { toggleArticleSelection } from "@/lib/redux/features/articleFilters/articleFiltersSlice"
import { selectArticleMemoState } from "@/lib/redux/features/articles/selectors"
import { ArticleMemo } from "../memo/article-memo"
import { useReduxAuth } from "@/hooks/useReduxAuth"

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
  const { user } = useReduxAuth()
  
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
        return;
      }
      
      // 記事の選択状態を切り替え
      dispatch(toggleArticleSelection(article.article_id));
      return;
    }
    
    // 通常モードの場合
    if ((e.target as HTMLElement).closest("button")) {
      return;
    }
    
    // ユーザーが認証済みの場合、閲覧履歴を記録
    if (user) {
      try {
        articlesAPI.recordArticleView(article.article_id, user.uid)
          .catch((err: any) => console.error("記事閲覧の記録に失敗しました", err));
      } catch (error) {
        console.error("記事閲覧の記録中にエラーが発生しました", error);
      }
    }
    
    // 記事ページを開く（タイトルクリックと同じ挙動）
    window.open(article.url, "_blank");
  }

  return (
    <div 
      className={`
        ${isSelected 
          ? "bg-indigo-50/60 dark:bg-indigo-900/20" 
          : "bg-transparent"
        } 
        hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-all duration-200 cursor-pointer
      `}
      onClick={handleCardClick}
    >
      <div>
        <ArticleHeader 
          article={article}
          onDelete={handleDelete}
          onToggleFavorite={handleFavoriteToggle}
          onToggleMemo={handleMemoToggle}
        />
        
        <ArticleFooter article={article} />
      </div>
      
      {/* メモセクション - 表示状態はReduxで管理 */}
      {memoVisible && (
        <>
          <div className="border-t border-indigo-200 dark:border-indigo-800 mx-2.5 my-0"></div>
          <ArticleMemo articleId={article.article_id} />
        </>
      )}
    </div>
  )
}

