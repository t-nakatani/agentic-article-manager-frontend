import { CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, BookmarkPlus, ThumbsUp, Share } from "lucide-react"
import Link from "next/link"
import { SharedArticleType } from "./types"

interface PublicArticleFooterProps {
  article: SharedArticleType
  likeCount: number
  hasLiked: boolean
  onLike: () => void
}

export function PublicArticleFooter({ 
  article, 
  likeCount, 
  hasLiked, 
  onLike 
}: PublicArticleFooterProps) {
  return (
    <CardFooter className="flex items-center justify-between pt-3 border-t border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 dark:border-blue-900/40">
      <div className="flex items-center space-x-2">
        <Button 
          variant="ghost" 
          size="sm"
          className={`px-2.5 rounded-full transition-all duration-300 ${
            hasLiked 
              ? "text-red-500 bg-red-50 dark:bg-red-950/30 shadow-inner" 
              : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
          onClick={onLike}
        >
          <ThumbsUp className={`h-4 w-4 mr-1.5 ${hasLiked ? "animate-pulse" : ""}`} />
          <span className="font-medium">{likeCount}</span>
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="px-2.5 rounded-full text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all duration-300"
        >
          <BookmarkPlus className="h-4 w-4 mr-1.5" />
          <span className="font-medium">保存</span>
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="px-2.5 rounded-full text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-all duration-300"
        >
          <Share className="h-4 w-4 mr-1.5" />
          <span className="font-medium">共有</span>
        </Button>
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0 hover:from-blue-600 hover:to-indigo-600 shadow-sm hover:shadow transition-all duration-300" 
        asChild
      >
        <Link href={article.url} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="h-4 w-4 mr-1.5" />
          <span>読む</span>
        </Link>
      </Button>
    </CardFooter>
  )
} 