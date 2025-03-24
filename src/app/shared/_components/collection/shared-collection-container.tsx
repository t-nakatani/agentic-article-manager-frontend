import { Share } from "lucide-react"
import { SocialShareButtons } from "./social-share-buttons"
import { Separator } from "@/components/ui/separator"
import { PublicArticleCardList } from "@/components/articles/public-card/public-article-card-list"

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

interface SharedCollectionContainerProps {
  title: string
  articleCount: number
  shareId: string
  articles: SharedArticleType[]
}

export function SharedCollectionContainer({ 
  title, 
  articleCount, 
  shareId,
  articles 
}: SharedCollectionContainerProps) {
  return (
    <div className="space-y-8">
      <header className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-blue-100 shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="flex items-center mb-4">
          <div className="bg-blue-500 text-white p-2 rounded-full mr-3 transition-transform duration-300 hover:scale-110">
            <Share className="h-5 w-5" />
          </div>
          <h1 className="text-2xl font-bold text-blue-800">{title}</h1>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-blue-600">
            {articleCount}件の厳選された記事コレクション
          </p>
        </div>
        
        <Separator className="my-4 bg-blue-100" />

        <PublicArticleCardList articles={articles} />

        <Separator className="my-4 bg-blue-100" />

        <div className="mt-2">
          <h2 className="text-md font-medium mb-3 text-blue-700">このコレクションを共有する</h2>
          <SocialShareButtons shareId={shareId} />
        </div>
      </header>


    </div>
  )
} 