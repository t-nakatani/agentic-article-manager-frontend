import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Link, Check } from "lucide-react"
import { toast } from "sonner"

interface SocialShareButtonsProps {
  shareId: string
}

export function SocialShareButtons({ shareId }: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  
  const shareUrl = `${window.location.origin}/shared/${shareId}`
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true)
      toast.success("リンクをコピーしました")
      setTimeout(() => setCopied(false), 2000)
    })
  }
  
  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    window.open(url, "_blank", "width=600,height=400")
  }
  
  const shareToTwitter = () => {
    const text = "厳選された記事コレクションを見てください！"
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`
    window.open(url, "_blank", "width=600,height=400")
  }
  
  return (
    <div className="flex flex-wrap gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        className="border-blue-200 hover:border-blue-300 hover:bg-blue-50 text-blue-600"
        onClick={shareToFacebook}
      >
        <Facebook className="h-4 w-4 mr-2" />
        Facebook
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="border-blue-200 hover:border-blue-300 hover:bg-blue-50 text-blue-600"
        onClick={shareToTwitter}
      >
        <Twitter className="h-4 w-4 mr-2" />
        Twitter
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="border-blue-200 hover:border-blue-300 hover:bg-blue-50 text-blue-600"
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
  )
} 