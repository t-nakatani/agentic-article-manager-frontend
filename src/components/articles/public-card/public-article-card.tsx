import { Card } from "@/components/ui/card"
import { useState } from "react"
import { toast } from "sonner"
import { PublicArticleHeader } from "@/components/articles/public-card/public-article-header"
import { PublicArticleBody } from "@/components/articles/public-card/public-article-body"
import { PublicArticleFooter } from "@/components/articles/public-card/public-article-footer"

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

interface PublicArticleCardProps {
  article: SharedArticleType
}

export function PublicArticleCard({ article }: PublicArticleCardProps) {
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 15) + 1)
  const [hasLiked, setHasLiked] = useState(false)
  
  const handleLike = () => {
    if (!hasLiked) {
      setLikeCount(likeCount + 1)
      setHasLiked(true)
      toast.success("記事に「いいね！」しました")
    }
  }
  
  return (
    <div className="transition-all duration-300 transform hover:-translate-y-1">
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-md border-t-4 border-t-blue-500">
        <PublicArticleHeader article={article} />
        <PublicArticleBody article={article} />
        <PublicArticleFooter 
          article={article}
          likeCount={likeCount}
          hasLiked={hasLiked}
          onLike={handleLike}
        />
      </Card>
    </div>
  )
}