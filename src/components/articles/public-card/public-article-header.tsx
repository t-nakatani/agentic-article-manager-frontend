import { CardHeader, CardTitle } from "@/components/ui/card"
import { Favicon } from "../card/components/favicon"

interface PublicArticleHeaderProps {
  article: SharedArticleType
}

export function PublicArticleHeader({ article }: PublicArticleHeaderProps) {
  return (
    <CardHeader className="pb-2">
      <div className="flex items-center space-x-2">
        <Favicon url={article.url} size={16} className="mt-0.5" />
        <CardTitle className="text-lg font-semibold line-clamp-2">
          {article.title}
        </CardTitle>
      </div>
    </CardHeader>
  )
} 