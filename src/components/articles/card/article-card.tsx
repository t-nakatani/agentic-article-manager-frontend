"use client"

import type React from "react"
import type { Article } from "@/types/article"
import { ArticleHeader } from "./article-header"
import { ArticleFooter } from "./article-footer"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import { toggleArticleSelection } from "@/lib/redux/features/articleFilters/articleFiltersSlice"
import { selectArticleMemoState } from "@/lib/redux/features/articles/selectors"
import { ArticleMemo } from "../memo/article-memo"
import { setArticleMemoVisible } from "@/lib/redux/features/articles/articlesSlice"

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

  const handleTitleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 親要素へのイベントバブリングを停止
    
    // 選択モードの場合は記事選択の挙動を優先
    if (isSelectionMode) {
      dispatch(toggleArticleSelection(article.article_id));
      return;
    }
    
    // 通常モードの場合は記事ページを開く
    window.open(article.url, "_blank");
  };

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
    
    // メモの表示/非表示を切り替え
    dispatch(setArticleMemoVisible({ 
      articleId: article.article_id, 
      isVisible: !memoVisible 
    }));
  }

  return (
    <div 
      className={`flex flex-col rounded-md border ${
        isSelected 
          ? "border-indigo-500 dark:border-indigo-400 bg-indigo-50/60 dark:bg-indigo-900/20 shadow-md" 
          : "border-indigo-200 dark:border-indigo-800 bg-card"
      } overflow-hidden hover:border-indigo-300 hover:bg-indigo-50/30 dark:hover:border-indigo-700 dark:hover:bg-indigo-900/10 transition-all duration-200 shadow-sm cursor-pointer`}
      onClick={handleCardClick}
    >
      <div>
        <ArticleHeader 
          article={article}
          onDelete={handleDelete}
          onToggleFavorite={handleFavoriteToggle}
          // onToggleReadLater={handleReadLaterToggle}
          onToggleMemo={handleMemoToggle}
          onTitleClick={handleTitleClick}
        />
        
        {/* <div className="px-2.5 py-1">
          <p className="text-sm text-theme-700 dark:text-theme-300 line-clamp-2">
            {article.one_line_summary}
          </p>
        </div> */}
        
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

