import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Link } from "lucide-react"

export function SocialShareSection() {
  return (
    <div className="mb-8">
      <div className="bg-white p-5 rounded-lg border shadow-sm transition-all duration-300 hover:shadow-md">
        <h2 className="text-lg font-medium mb-3">このコレクションを共有する</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          <Button variant="outline" size="sm" className="bg-[#1877F2] hover:bg-[#166FE5] text-white border-none transition-all duration-300">
            <Facebook className="h-4 w-4 mr-2" />
            Facebook
          </Button>
          <Button variant="outline" size="sm" className="bg-[#1DA1F2] hover:bg-[#1a94da] text-white border-none transition-all duration-300">
            <Twitter className="h-4 w-4 mr-2" />
            Twitter
          </Button>
          <Button variant="outline" size="sm" className="bg-gray-100 hover:bg-gray-200 text-gray-800 transition-all duration-300">
            <Link className="h-4 w-4 mr-2" />
            リンクをコピー
          </Button>
        </div>
      </div>
    </div>
  )
} 