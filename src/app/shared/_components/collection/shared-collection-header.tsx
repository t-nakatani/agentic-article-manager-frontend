import { Share, Eye } from "lucide-react"
import { SocialShareButtons } from "./social-share-buttons"
import { Separator } from "@/components/ui/separator"

interface SharedCollectionHeaderProps {
  title: string
  articleCount: number
  shareId: string
}

export function SharedCollectionHeader({ title, articleCount, shareId }: SharedCollectionHeaderProps) {
  return (
    <header className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-blue-100 shadow-sm transition-all duration-300 hover:shadow-md">
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
        <div className="flex items-center bg-blue-100 px-3 py-1 rounded-full text-blue-700 text-sm transition-all duration-300 hover:bg-blue-200">
          <Eye className="h-4 w-4 mr-1" />
          <span>56回閲覧されています</span>
        </div>
      </div>
      
      <Separator className="my-4 bg-blue-100" />
      
      <div className="mt-2">
        <h2 className="text-md font-medium mb-3 text-blue-700">このコレクションを共有する</h2>
        <SocialShareButtons shareId={shareId} />
      </div>
    </header>
  )
} 