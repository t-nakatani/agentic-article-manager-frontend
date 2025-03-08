"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Tags, Trash2, BookOpen } from "lucide-react"

interface ArticleMenuProps {
  articleId: string
  onShowTags: () => void
  onDelete: () => void
}

export function ArticleMenu({ articleId, onShowTags, onDelete }: ArticleMenuProps) {
  const router = useRouter()

  const handleTopicView = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/articles/${articleId}/topics`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0 -mr-1" onClick={(e) => e.stopPropagation()}>
          <MoreHorizontal className="h-3.5 w-3.5" />
          <span className="sr-only">メニューを開く</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation()
            onShowTags()
          }}
        >
          <Tags className="mr-2 h-4 w-4" />
          タグを表示
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleTopicView}>
          <BookOpen className="mr-2 h-4 w-4" />
          トピック要約
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          className="text-red-600 dark:text-red-400"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          削除
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

