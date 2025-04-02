import { PublicArticleCard } from "./public-article-card"
import { SharedArticleType } from "./types"

interface PublicArticleCardListProps {
  articles: SharedArticleType[]
}

export function PublicArticleCardList({ articles }: PublicArticleCardListProps) {
  return (
    <div className="transition-all duration-300">
      {/* シート形式の記事一覧 */}
      <div className="rounded-lg border border-indigo-200 dark:border-indigo-800 bg-card shadow-sm animate-fadeIn overflow-hidden">
        {articles.map((article, index) => (
          <div key={article.id}>
            <PublicArticleCard article={article} />
            {/* 最後の項目以外にセパレータを表示 */}
            {index < articles.length - 1 && (
              <div className="border-t border-indigo-100 dark:border-indigo-900"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
} 