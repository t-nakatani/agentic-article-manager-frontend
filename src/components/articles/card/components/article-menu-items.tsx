"use client"

import { Tags, Trash2, RefreshCw } from "lucide-react"
import type { MenuItem } from "../article-menu"

interface CreateTagsMenuItemProps {
  onShowTags: () => void
}

export function createTagsMenuItem({ onShowTags }: CreateTagsMenuItemProps): MenuItem {
  return {
    icon: <Tags className="mr-2 h-4 w-4" />,
    label: "タグを表示",
    onClick: (e) => {
      e.stopPropagation()
      onShowTags()
    }
  }
}

interface CreateRegenerateMenuItemProps {
  onRegenerate: () => void
}

export function createRegenerateMenuItem({ onRegenerate }: CreateRegenerateMenuItemProps): MenuItem {
  return {
    icon: <RefreshCw className="mr-2 h-4 w-4" />,
    label: "要約を再生成",
    onClick: (e) => {
      e.stopPropagation()
      onRegenerate()
    }
  }
}

interface CreateDeleteMenuItemProps {
  onDelete: () => void
}

export function createDeleteMenuItem({ onDelete }: CreateDeleteMenuItemProps): MenuItem {
  return {
    icon: <Trash2 className="mr-2 h-4 w-4" />,
    label: "削除",
    onClick: (e) => {
      e.stopPropagation()
      onDelete()
    },
    className: "text-red-600 dark:text-red-400",
    isDanger: true
  }
} 