"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Filter, Star, BookmarkIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

interface ArticleFilterProps {
  showFavorites: boolean
  onShowFavoritesChange: (showFavorites: boolean) => void
  showReadLater: boolean
  onShowReadLaterChange: (showReadLater: boolean) => void
}

export function ArticleFilter({
  showFavorites,
  onShowFavoritesChange,
  showReadLater,
  onShowReadLaterChange,
}: ArticleFilterProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9">
          <Filter className="h-4 w-4" />
          <span className="sr-only">フィルタ</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>フィルタ設定</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={showFavorites}
          onCheckedChange={onShowFavoritesChange}
        >
          <Star className="mr-2 h-4 w-4 text-yellow-500" />
          <span>お気に入り</span>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showReadLater}
          onCheckedChange={onShowReadLaterChange}
        >
          <BookmarkIcon className="mr-2 h-4 w-4 text-blue-500" />
          <span>あとで読む</span>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 