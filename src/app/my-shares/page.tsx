"use client"

import { useEffect, useState } from "react"
import { Loader2, Share, ExternalLink } from "lucide-react"
import { toast } from "sonner"
import { useAppSelector } from "@/lib/redux/hooks"
import bulkArticleAPI from "@/lib/api/bulk-article"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"

interface ShareItem {
  share_id: string;
  share_title: string;
}

export default function MySharesPage() {
  const [shares, setShares] = useState<ShareItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  
  // Redux から認証情報を取得
  const user = useAppSelector(state => state.auth.user)
  const userId = user?.uid
  const isAuthenticated = !!userId
  
  useEffect(() => {
    const fetchUserShares = async () => {
      if (!userId) {
        setError("共有リストを表示するにはログインが必要です")
        setLoading(false)
        return
      }
      
      try {
        const shares = await bulkArticleAPI.getUserShares(userId)
        setShares(shares)
      } catch (err) {
        console.error("共有リストの取得に失敗しました", err)
        setError("共有リストの取得に失敗しました")
      } finally {
        setLoading(false)
      }
    }
    
    if (userId) {
      fetchUserShares()
    } else {
      const authCheckTimeout = setTimeout(() => {
        if (!userId) {
          setLoading(false)
          setError("共有リストを表示するにはログインが必要です")
        }
      }, 1000)
      
      return () => clearTimeout(authCheckTimeout)
    }
  }, [userId])
  
  // 共有URLをコピーする
  const copyShareUrl = (shareId: string) => {
    const url = `${window.location.origin}/shared/${shareId}`
    navigator.clipboard.writeText(url)
      .then(() => {
        setCopiedId(shareId)
        toast.success("共有URLをコピーしました")
        
        // 2秒後にコピー状態をリセット
        setTimeout(() => {
          setCopiedId(null)
        }, 2000)
      })
      .catch(() => {
        toast.error("URLのコピーに失敗しました")
      })
  }
  
  // 共有記事を開く
  const openSharedArticles = (shareId: string) => {
    window.open(`/shared/${shareId}`, "_blank")
  }
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Loader2 className="h-8 w-8 animate-spin mb-4" />
        <p className="text-lg font-medium">共有リストを読み込んでいます...</p>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">エラーが発生しました</h1>
        <p className="text-lg text-muted-foreground">{error}</p>
      </div>
    )
  }
  
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-2">あなたの共有リスト</h1>
        <p className="text-muted-foreground">
          あなたが作成した共有記事コレクションのリストです
        </p>
      </header>
      
      {shares.length === 0 ? (
        <div className="text-center py-12">
          <Share className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h2 className="text-xl font-medium mb-2">共有コレクションがありません</h2>
          <p className="text-muted-foreground">
            記事を選択して共有すると、ここに表示されます
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {shares.map(share => (
            <div
              key={share.share_id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border bg-card"
            >
              <div className="mb-4 sm:mb-0">
                <h3 className="font-medium">{share.share_title}</h3>
                <p className="text-sm text-muted-foreground truncate">
                  ID: {share.share_id}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyShareUrl(share.share_id)}
                >
                  {copiedId === share.share_id ? "コピー済み" : "URLをコピー"}
                  {copiedId === share.share_id ? (
                    <Copy className="ml-2 h-4 w-4" />
                  ) : (
                    <Copy className="ml-2 h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => openSharedArticles(share.share_id)}
                >
                  開く
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 