import { Article } from "@/types/article"
import { PublicArticleCard } from "./public-article-card"

interface PublicArticleCardListProps {
  articles: Article[]
  className?: string
}

export function PublicArticleCardList({ articles, className = "" }: PublicArticleCardListProps) {
  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        記事がありません
      </div>
    )
  }
  
  return (
    <div className={`grid grid-cols-1 gap-4 ${className}`}>
      {articles.map((article) => (
        <PublicArticleCard key={article.id || article.article_id} article={article} />
      ))}
    </div>
  )
} 