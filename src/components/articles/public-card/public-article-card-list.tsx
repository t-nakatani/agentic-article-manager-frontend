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
      <div className="mb-6 flex items-center justify-between bg-blue-50 p-4 rounded-lg border border-blue-100">
        <h2 className="text-xl font-semibold text-blue-800">厳選された記事</h2>
        <div className="text-sm bg-white px-3 py-1 rounded-full text-blue-600 font-medium">全{articles.length}件</div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {articles.map((article) => (
          <PublicArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
} 