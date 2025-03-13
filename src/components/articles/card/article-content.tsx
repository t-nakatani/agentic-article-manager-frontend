import type { Article } from "@/types/article"

interface ArticleContentProps {
  article: Article
}

export function ArticleContent({ article }: ArticleContentProps) {
  return <p className="px-2 text-xs text-theme-600 dark:text-theme-400 line-clamp-1 max-w-[85%]">{article.one_line_summary}</p>
}

