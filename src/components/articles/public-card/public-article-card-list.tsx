import { PublicArticleCard } from "./public-article-card"

interface SharedArticleType {
  article_id: string;
  id: string;
  title: string;
  url: string;
  one_line_summary: string;
  created_at: string;
  updated_at: string;
  is_favorite: boolean;
  is_read_later: boolean;
  is_processed: boolean;
  user_id: string;
  themes: string[];
  last_viewed_at: string | null;
}

interface PublicArticleCardListProps {
  articles: SharedArticleType[]
}

export function PublicArticleCardList({ articles }: PublicArticleCardListProps) {
  return (
    <div className="transition-all duration-300">
      <div className="grid gap-6 md:grid-cols-2 mt-6">
        {articles.map((article) => (
          <PublicArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
} 