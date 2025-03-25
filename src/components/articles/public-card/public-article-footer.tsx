import { Button } from "@/components/ui/button"
import { ExternalLink, BookmarkPlus, ThumbsUp, Share, Calendar } from "lucide-react"
import Link from "next/link"
import { SharedArticleType } from "./types"
import { formatRelativeDate } from "@/lib/utils"

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
  <div className="flex items-center space-x-1">
    <Button 
      variant="ghost" 
      size="sm" 
      className="w-7 h-7 p-0 rounded-full"
      asChild
    >
    </Button>
  </div>
  )
} 