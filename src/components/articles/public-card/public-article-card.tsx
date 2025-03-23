import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, BookmarkPlus, ThumbsUp, Share } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"

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
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold line-clamp-2">
            {article.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm text-gray-600 mb-3 line-clamp-3">
            {article.one_line_summary}
          </CardDescription>
          <div className="h-1 w-full bg-gray-100 rounded-full mb-4">
            <div className="h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-500" style={{ width: `${Math.floor(Math.random() * 61) + 40}%` }} />
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between pt-0 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm"
              className={`px-2 transition-colors duration-300 ${hasLiked ? "text-red-500" : "text-gray-500"}`}
              onClick={handleLike}
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              <span>{likeCount}</span>
            </Button>
            <Button variant="ghost" size="sm" className="px-2 text-gray-500 transition-colors duration-300 hover:text-blue-500">
              <BookmarkPlus className="h-4 w-4 mr-1" />
              <span>保存</span>
            </Button>
          </div>
          <Button variant="outline" size="sm" className="transition-all duration-300 hover:bg-blue-50" asChild>
            <Link href={article.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-1" />
              <span>記事を読む</span>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}