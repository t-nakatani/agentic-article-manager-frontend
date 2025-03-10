"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import type { Article } from "@/lib/api/articles"
import { Calendar, Eye } from "lucide-react"
import { formatRelativeDate } from "@/lib/utils"
import { ArticleTagsDialog } from "./article-tags-dialog"
import { ArticleDeleteDialog } from "./article-delete-dialog"
import { ArticleCardMenu } from "./article-card-menu"
import { useReduxAuth } from "@/hooks/useReduxAuth" // AuthContextの代わりにuseReduxAuthを使用
import articlesAPI from "@/lib/api/articles"
import { toast } from "sonner"

interface ArticleCardProps {
  article: Article
  onDelete: (articleId: string) => Promise<void>
}

export function ArticleCard({ article, onDelete }: ArticleCardProps) {
  const { user } = useReduxAuth() // AuthContextの代わりにuseReduxAuthを使用
  const [showTags, setShowTags] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)

  const handleDelete = async () => {
    try {
      await onDelete(article.article_id)
      toast.success("記事を削除しました")
    } catch (error) {
      toast.error("削除に失敗しました")
    } finally {
      setShowDeleteConfirm(false)
    }
  }

  const handleRegenerate = async () => {
    if (!user) return

    try {
      setIsRegenerating(true)
      await articlesAPI.regenerateArticle(article.article_id, {
        user_id: user.uid,
        url: article.url,
      })
      toast.success("要約を再生成しました", {
        description: "更新された内容を確認してください",
      })
    } catch (error) {
      toast.error("再生成に失敗しました", {
        description: "もう一度お試しください",
      })
    } finally {
      setIsRegenerating(false)
    }
  }

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) {
      return
    }
    window.open(article.url, "_blank")
  }

  return (
    <>
      <Card
        className="bg-white dark:bg-theme-900 hover:shadow-lg transition-all duration-200 cursor-pointer"
        onClick={handleCardClick}
      >
        <CardContent className="p-2.5">
          <div className="space-y-0.5">
            <div className="flex items-start gap-2">
              <h2 className="flex-1 text-sm font-semibold leading-tight hover:text-theme-600 dark:hover:text-theme-400 transition-colors line-clamp-1">
                {article.title}
              </h2>
              <ArticleCardMenu
                articleId={article.article_id}
                onShowTags={() => setShowTags(true)}
                onDelete={() => setShowDeleteConfirm(true)}
                onRegenerate={handleRegenerate}
              />
            </div>
            <p className="text-xs text-theme-600 dark:text-theme-400 line-clamp-1">{article.one_line_summary}</p>
            <div className="flex justify-end gap-3 text-[11px] text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{formatRelativeDate(article.created_at)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{formatRelativeDate(article.last_viewed_at)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <ArticleTagsDialog article={article} open={showTags} onOpenChange={setShowTags} />
      <ArticleDeleteDialog
        article={article}
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        onConfirm={handleDelete}
      />
    </>
  )
}

