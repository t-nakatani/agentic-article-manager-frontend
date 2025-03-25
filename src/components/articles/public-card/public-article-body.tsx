import { SharedArticleType } from "./types"

interface PublicArticleBodyProps {
  article: SharedArticleType
}

export function PublicArticleBody({ article }: PublicArticleBodyProps) {
  return (
    <div className="px-2.5 py-1">
      <p className="text-xs text-theme-700 dark:text-theme-300 line-clamp-2">
        {article.one_line_summary}
      </p>
      <div className="h-1 w-full bg-gray-100 dark:bg-gray-800 rounded-full mt-2">
        <div 
          className="h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-500" 
          style={{ width: `${Math.floor(Math.random() * 61) + 40}%` }} 
        />
      </div>
    </div>
  )
} 