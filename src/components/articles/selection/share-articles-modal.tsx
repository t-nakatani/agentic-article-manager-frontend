import { useState } from "react"
import { Loader2, Copy, Check } from "lucide-react"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAppSelector } from "@/lib/redux/hooks"
import { bulkArticleAPI } from "@/lib/api/bulk-article"

interface ShareArticlesModalProps {
  isOpen: boolean
  onClose: () => void
  selectedArticleIds: string[]
}

export function ShareArticlesModal({ isOpen, onClose, selectedArticleIds }: ShareArticlesModalProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [shareUrl, setShareUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [shareTitle, setshareTitle] = useState("共有コレクション")
  
  // ユーザーIDを取得
  const userId = useAppSelector(state => state.auth.user?.uid)

  // 共有リンクを生成する関数
  const generateShareLink = async () => {
    if (!userId) {
      toast.error("ログインが必要です")
      return
    }
    
    if (selectedArticleIds.length === 0) {
      toast.error("共有する記事を選択してください")
      return
    }

    setIsGenerating(true)
    
    try {
      // APIを呼び出して共有リンクを生成
      const response = await bulkArticleAPI.shareArticles(userId, selectedArticleIds, shareTitle)
      
      // 共有URLを生成
      const url = `${window.location.origin}/shared/${response.share_id}`
      setShareUrl(url)
      
      toast.success('共有リンクを生成しました')
    } catch (error) {
      console.error('共有リンク生成エラー:', error)
      toast.error('リンクの生成に失敗しました。後でもう一度お試しください')
    } finally {
      setIsGenerating(false)
    }
  }

  // クリップボードにコピーする関数
  const copyToClipboard = async () => {
    if (!shareUrl) return
    
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      toast.success('URLをコピーしました')
      
      // 2秒後にコピー状態をリセット
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (error) {
      console.error('クリップボードコピーエラー:', error)
      toast.error('URLのコピーに失敗しました')
    }
  }

  // モーダルが閉じられたときに状態をリセット
  const handleClose = () => {
    setShareUrl(null)
    setCopied(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>記事の共有</DialogTitle>
          <DialogDescription>
            選択した{selectedArticleIds.length}件の記事を共有します。
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          {!shareUrl ? (
            <>
              <div className="space-y-2">
                <label htmlFor="share-title" className="text-sm font-medium">
                  コレクションタイトル
                </label>
                <Input
                  id="share-title"
                  value={shareTitle}
                  onChange={(e) => setshareTitle(e.target.value)}
                  placeholder="コレクションのタイトルを入力"
                  className="w-full"
                />
              </div>
              <Button 
                onClick={generateShareLink} 
                disabled={isGenerating || selectedArticleIds.length === 0}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    リンクを生成中...
                  </>
                ) : (
                  '共有リンクを生成する'
                )}
              </Button>
            </>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center">
                <Input 
                  readOnly
                  value={shareUrl}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="ml-2"
                  onClick={copyToClipboard}
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                このリンクを共有すると、選択した記事を閲覧できます。
                リンクは一定期間後に無効になります。
              </p>
            </div>
          )}

          <div>
            <h3 className="font-medium">共有について</h3>
            <ul className="text-sm text-muted-foreground mt-1 list-disc pl-4 space-y-1">
              <li>共有されるのは記事のタイトル、URL、要約のみです</li>
              <li>プライベートメモは共有されません</li>
              <li>共有リンクにアクセスした人は誰でも記事を閲覧できます</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 