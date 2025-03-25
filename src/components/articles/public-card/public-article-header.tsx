import { CardTitle } from "@/components/ui/card"
import { Favicon } from "../card/components/favicon"
import { SharedArticleType } from "./types"

interface PublicArticleHeaderProps {
  article: SharedArticleType
}

export function PublicArticleHeader({ article }: PublicArticleHeaderProps) {
  const handleTitleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    window.open(article.url, "_blank")
  }

  return (
    <div className="flex items-center justify-between space-x-2 px-2.5 py-1.5">
      <div className="flex items-center space-x-2 min-w-0">
        <Favicon url={article.url} size={16} className="mt-0.5" />
        <h2 
          className="flex-1 text-sm font-semibold leading-tight hover:text-theme-600 dark:hover:text-theme-400 transition-colors line-clamp-1 sm:line-clamp-1 line-clamp-2 cursor-pointer"
          onClick={handleTitleClick}
        >
          {article.title}
        </h2>
      </div>
    </div>
  )
} 