import { CardContent, CardDescription } from "@/components/ui/card"

interface PublicArticleBodyProps {
  article: SharedArticleType
}

export function PublicArticleBody({ article }: PublicArticleBodyProps) {
  return (
    <CardContent>
      <CardDescription className="text-sm text-gray-600 mb-3 min-h-[5rem]">
        <p className="line-clamp-3">
          {article.one_line_summary}
        </p>
      </CardDescription>
      <div className="h-1 w-full bg-gray-100 rounded-full mb-4">
        <div 
          className="h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-500" 
          style={{ width: `${Math.floor(Math.random() * 61) + 40}%` }} 
        />
      </div>
    </CardContent>
  )
} 