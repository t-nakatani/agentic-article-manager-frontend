"use client"

import type { Article } from "@/types/article"
import { ArticleMenu } from "./article-menu"
import { useState } from "react"
import { ArticleTagsDialog } from "../dialogs/article-tags-dialog"
import { ArticleDeleteDialog } from "../dialogs/article-delete-dialog"
import { useReduxAuth } from "@/hooks/useReduxAuth" // useAuthをuseReduxAuthに変更
import articlesAPI from "@/lib/api/articles"
import { useToast } from "@/components/ui/use-toast"
import { FavoriteButton } from "./components/favorite-button"

interface ArticleHeaderProps {
  article: Article
  onDelete: () => void
}

export function ArticleHeader({ article, onDelete }: ArticleHeaderProps) {
  const { toast } = useToast()
  const { user } = useReduxAuth() // useAuthをuseReduxAuthに変更
  const [showTags, setShowTags] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)

  const handleRegenerate = async () => {
    if (!user) return

    try {
      setIsRegenerating(true)
      await articlesAPI.regenerateArticle(article.article_id, {
        user_id: user.uid,
        url: article.url,
      })
      toast({
        title: "要約を再生成しました",
        description: "更新された内容を確認してください",
      })
    } catch (error) {
      toast({
        title: "再生成に失敗しました",
        description: "もう一度お試しください",
        variant: "destructive",
      })
    } finally {
      setIsRegenerating(false)
    }
  }

  return (
    <>
      <div className="flex items-start gap-2 p-2.5">
        <h2 className="flex-1 text-sm font-semibold leading-tight hover:text-theme-600 dark:hover:text-theme-400 transition-colors line-clamp-1">
          {article.title}
        </h2>
        <div className="flex items-center">
          <FavoriteButton articleId={article.article_id} />
          <ArticleMenu
            articleId={article.article_id}
            onShowTags={() => setShowTags(true)}
            onDelete={() => setShowDeleteConfirm(true)}
            onRegenerate={handleRegenerate}
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

