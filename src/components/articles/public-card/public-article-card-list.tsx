import { PublicArticleCard } from "./public-article-card"
import { SharedArticleType } from "./types"

interface PublicArticleCardListProps {
  articles: SharedArticleType[]
}

export function PublicArticleCardList({ articles }: PublicArticleCardListProps) {
  return (
    <div className="transition-all duration-300">
      <div className="flex flex-col gap-6 mt-6">
        {articles.map((article) => (
          <PublicArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
} 