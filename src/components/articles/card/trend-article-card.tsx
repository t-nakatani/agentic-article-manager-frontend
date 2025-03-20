import { Article } from "@/types/article"
import { Favicon } from "./components/favicon"
import { ArticleMenu } from "./article-menu"
import { useState } from "react"
import { getContrastColor } from "@/lib/utils/color-utils"

interface TrendArticleCardProps {
  article: Article
}

export function TrendArticleCard({ article }: TrendArticleCardProps) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // メニューボタンなどがクリックされた場合は遷移しない
    if ((e.target as HTMLElement).closest("button")) {
      return
    }
    window.open(article.url, "_blank")
  }

  return (
    <div 
      className="flex flex-col rounded-md border border-theme-200 dark:border-theme-800 bg-card overflow-hidden hover:border-theme-300 dark:hover:border-theme-700 transition-colors shadow-sm cursor-pointer"
      onClick={handleClick}
    >
      {/* ヘッダー部分 */}
      <div className="flex items-center justify-between space-x-2 p-2.5">
        <div className="flex items-center space-x-2 min-w-0">
          <Favicon url={article.url} size={16} className="mt-0.5" />
          <h2 className="flex-1 text-sm font-semibold leading-tight hover:text-theme-600 dark:hover:text-theme-400 transition-colors line-clamp-1 sm:line-clamp-1 line-clamp-2">
            {article.title}
          </h2>
        </div>
      </div>

      {/* コンテンツ部分 */}
      <div className="px-2.5 py-1">
        <p className="text-sm text-theme-700 dark:text-theme-300 line-clamp-2">
        </p>
      </div>
    </div>
  )
}