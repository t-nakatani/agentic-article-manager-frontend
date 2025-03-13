"use client"

import type { Article } from "@/types/article"
import { ArticleMenu } from "./article-menu"
import { useState } from "react"
import { ArticleTagsDialog } from "../dialogs/article-tags-dialog"
import { ArticleDeleteDialog } from "../dialogs/article-delete-dialog"
import { useReduxAuth } from "@/hooks/useReduxAuth"
import articlesAPI from "@/lib/api/articles"
import { toast } from "sonner"
import { FavoriteButton } from "./components/favorite-button"
import { useAppDispatch } from "@/lib/redux/hooks"
import { regenerateArticle } from "@/lib/redux/features/articles/articlesSlice"

interface ArticleHeaderProps {
  article: Article
  onDelete: () => Promise<void>
  favicon?: string | null
}

export function ArticleHeader({ article, onDelete, favicon }: ArticleHeaderProps) {
  const { user } = useReduxAuth()
  const dispatch = useAppDispatch()
  const [showTags, setShowTags] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)

  const handleRegenerate = async () => {
    if (!user) return

    try {
      setIsRegenerating(true)
      await dispatch(regenerateArticle({
        articleId: article.article_id,
        userId: user.uid,
        url: article.url
      })).unwrap()
    } catch (error) {
      // エラー処理はReduxアクション内で行われるため、ここでは何もしない
    } finally {
      setIsRegenerating(false)
    }
  }

  return (
    <>
      <div className="flex items-start gap-2 p-2.5">
        {favicon && (
          <div className="flex-shrink-0 w-4 h-4 mt-0.5">
            <img 
              src={favicon} 
              alt="" 
              className="w-full h-full object-contain"
              width={16}
              height={16}
              onError={(e) => {
                // エラー時に画像を非表示にする
                (e.target as HTMLImageElement).style.display = 'none'
              }}
            />
          </div>
        )}
        <h2 className="flex-1 text-sm font-semibold leading-tight hover:text-theme-600 dark:hover:text-theme-400 transition-colors line-clamp-1">
          {article.title}
        </h2>
        <div className="flex items-center">
          <FavoriteButton 
            articleId={article.article_id} 
            initialFavorited={article.is_favorite}
          />
          <ArticleMenu
            articleId={article.article_id}
            onShowTags={() => setShowTags(true)}
            onDelete={() => setShowDeleteConfirm(true)}
            onRegenerate={handleRegenerate}
            isRegenerating={isRegenerating}
          />
        </div>
      </div>

      <ArticleTagsDialog article={article} open={showTags} onOpenChange={setShowTags} />
      <ArticleDeleteDialog
        article={article}
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        onConfirm={onDelete}
      />
    </>
  )
}

