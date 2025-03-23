import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Link, Check } from "lucide-react"
import { toast } from "sonner"

interface CollectionSocialShareProps {
  shareId: string
}

export function CollectionSocialShare({ shareId }: CollectionSocialShareProps) {
  const [copied, setCopied] = useState(false)
  
  const shareUrl = `${window.location.origin}/shared/${shareId}`
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        setCopied(true)
        toast.success("URLをクリップボードにコピーしました")
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(() => {
        toast.error("URLのコピーに失敗しました")
      })
  }
  
  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank', 'width=600,height=400')
  }
  
  const shareToTwitter = () => {
    const text = "記事コレクションをチェックしてみてください！"
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank', 'width=600,height=400')
  }
  
  return (
    <div className="mt-4 py-3 border-t border-blue-100">
      <p className="text-sm text-blue-700 mb-3">以下のボタンからこのコレクションを共有できます：</p>
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-[#1877F2] hover:bg-[#166FE5] text-white border-none transition-all duration-300"
          onClick={shareToFacebook}
        >
          <Facebook className="h-4 w-4 mr-2" />
          Facebook
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-[#1DA1F2] hover:bg-[#1a94da] text-white border-none transition-all duration-300"
          onClick={shareToTwitter}
        >
          <Twitter className="h-4 w-4 mr-2" />
          Twitter
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 transition-all duration-300"
          onClick={copyToClipboard}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              コピー済み
            </>
          ) : (
            <>
              <Link className="h-4 w-4 mr-2" />
              リンクをコピー
            </>
          )}
        </Button>
      </div>
    </div>
  )
} 