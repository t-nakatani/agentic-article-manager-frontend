import type { Article } from "@/types/article"
import { Calendar, Eye } from "lucide-react"
import { formatRelativeDate } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

interface ArticleFooterProps {
  article: Article
}

export function ArticleFooter({ article }: ArticleFooterProps) {
  const isMobile = useMediaQuery("(max-width: 640px)")

  return (
    <div className="flex items-center justify-between px-2.5 pb-2.5">
      <p className="text-xs text-theme-600 dark:text-theme-400 line-clamp-1 max-w-[70%]">
        {article.one_line_summary}
      </p>
      <div className="flex gap-3 text-[11px] text-muted-foreground">
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>{formatRelativeDate(article.created_at)}</span>
        </div>
        {!isMobile && (
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            <span>{formatRelativeDate(article.last_viewed_at)}</span>
          </div>
        )}
      </div>
    </div>
  )
}

