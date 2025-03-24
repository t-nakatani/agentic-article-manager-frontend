"use client"

import type { Article } from "@/types/article"
import { ArticleMenu, MenuItem } from "./article-menu"
import { useState } from "react"
import { ArticleTagsDialog } from "../dialogs/article-tags-dialog"
import { ArticleDeleteDialog } from "../dialogs/article-delete-dialog"
import { useReduxAuth } from "@/hooks/useReduxAuth"
import { toast } from "sonner"
import { FavoriteButton } from "./components/favorite-button"
import { useAppDispatch } from "@/lib/redux/hooks"
import { regenerateArticle } from "@/lib/redux/features/articles/articlesSlice"
import { Favicon } from "./components/favicon"
import { ReadLaterButton } from "./components/read-later-button"
import { createTagsMenuItem, createRegenerateMenuItem, createDeleteMenuItem } from "./components/article-menu-items"
import { MemoButton } from "./components/memo-button"

interface ArticleHeaderProps {
  article: Article
  onShowTags?: () => void
  onDelete?: () => void
  onRegenerate?: () => void
  onToggleFavorite?: (isFavorited: boolean) => void
  onToggleReadLater?: (isReadLater: boolean) => void
  onToggleMemo?: (showMemo: boolean) => void
  onTitleClick?: (e: React.MouseEvent) => void
}

export function ArticleHeader({
  article,
  onDelete,
  onToggleFavorite,
  onToggleReadLater,
  onToggleMemo,
  onTitleClick
}: ArticleHeaderProps) {
  const { user } = useReduxAuth()
  const dispatch = useAppDispatch()
  const [showTags, setShowTags] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)

  // タグダイアログ表示処理
  const handleShowTags = () => {
    setShowTags(true)
  }

  // 削除確認ダイアログ表示処理
  const handleShowDeleteConfirm = () => {
    setShowDeleteConfirm(true)
  }

  // 再生成処理
  const handleRegenerate = async () => {
    if (!user) return

    try {
      setIsRegenerating(true)
      await dispatch(regenerateArticle({
        articleId: article.article_id,
        userId: user.uid,
        url: article.url
      })).unwrap()
      toast.success("要約の再生成が開始されました")
    } catch (error) {
      toast.error("要約の再生成に失敗しました")
    } finally {
      setIsRegenerating(false)
    }
  }

  // メニュー項目を作成
  const menuItems: MenuItem[] = [
    createTagsMenuItem({ onShowTags: handleShowTags }),
    createRegenerateMenuItem({ onRegenerate: handleRegenerate }),
    createDeleteMenuItem({ onDelete: handleShowDeleteConfirm })
  ]

  return (
    <div className="flex items-center justify-between space-x-2 px-2.5 py-1.5">
      <div className="flex items-center space-x-2 min-w-0">
        <Favicon url={article.url} size={16} className="mt-0.5" />
        <h2 
          className="flex-1 text-sm font-semibold leading-tight hover:text-theme-600 dark:hover:text-theme-400 transition-colors line-clamp-1 sm:line-clamp-1 line-clamp-2 cursor-pointer"
          onClick={onTitleClick}
        >
          {article.title}
        </h2>
      </div>
      <div className="flex items-center space-x-1">
        <FavoriteButton
          articleId={article.article_id}
          initialFavorited={article.is_favorite}
          onToggle={onToggleFavorite}
        />
        <ReadLaterButton
          articleId={article.article_id}
          initialReadLater={article.read_later}
          onToggle={onToggleReadLater}
        />
        <MemoButton
          articleId={article.article_id}
          initialMemo={article.memo}
          onToggle={onToggleMemo}
        />
        <ArticleMenu menuItems={menuItems} />
      </div>

      {/* タグ表示ダイアログ */}
      <ArticleTagsDialog
        article={article}
        open={showTags}
        onOpenChange={setShowTags}
      />

      {/* 削除確認ダイアログ */}
      <ArticleDeleteDialog
        article={article}
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        onConfirm={() => {
          onDelete()
          setShowDeleteConfirm(false)
        }}
      />
    </div>
  )
}

