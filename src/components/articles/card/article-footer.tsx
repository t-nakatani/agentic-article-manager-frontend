import type { Article } from "@/types/article"
import { Calendar, Eye } from "lucide-react"
import { formatRelativeDate } from "@/lib/utils"

interface ArticleFooterProps {
  article: Article
}

export function ArticleFooter({ article }: ArticleFooterProps) {
  return (
    <div className="flex items-center justify-between px-2.5 pb-2.5">
      {/* スマホの非表示と1行での表示のための省略を行うためにdivブロックに分離 */}
      <div className="hidden md:block  max-w-[80%]">
        <p className="text-xs text-theme-600 dark:text-theme-400 line-clamp-1">
          {article.one_line_summary}
        </p>
      </div>
      <div className="flex gap-3 text-[11px] text-muted-foreground ml-auto">
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
  )
}

