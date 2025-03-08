import type { Article } from "@/types/article"
import { Calendar, Eye } from "lucide-react"
import { formatRelativeDate } from "@/lib/utils"

interface ArticleFooterProps {
  article: Article
}

export function ArticleFooter({ article }: ArticleFooterProps) {
  return (
    <div className="flex justify-end gap-3 px-2.5 pb-2.5 text-[11px] text-muted-foreground">
      <div className="flex items-center gap-1">
        <Calendar className="h-3 w-3" />
        <span>{formatRelativeDate(article.created_at)}</span>
      </div>
      <div className="flex items-center gap-1">
        <Eye className="h-3 w-3" />
        <span>{formatRelativeDate(article.last_viewed_at)}</span>
      </div>
    </div>
  )
}

