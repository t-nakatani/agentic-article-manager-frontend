"use client"

import { useEffect, useState } from "react"
import { Share, ExternalLink } from "lucide-react"
import { toast } from "sonner"
import { useAppSelector } from "@/lib/redux/hooks"
import bulkArticleAPI from "@/lib/api/bulk-article"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { Layout } from "@/components/layout/Layout"
import { AuthWrapper } from "@/components/auth/AuthWrapper"

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
      <AuthWrapper>
        <Layout variant="compact" headerVariant="default">
          <div className="space-y-6">
            {/* スケルトンUI: ヘッダー */}
            <div>
              <div className="h-8 w-2/5 bg-indigo-200/50 dark:bg-indigo-800/30 rounded-lg animate-pulse mb-2"></div>
              <div className="h-4 w-3/5 bg-indigo-100/70 dark:bg-indigo-800/20 rounded animate-pulse"></div>
            </div>
            
            {/* スケルトンUI: 共有リスト */}
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-indigo-200/70 dark:border-indigo-800/50 bg-white dark:bg-indigo-950/20"
                >
                  <div className="mb-4 sm:mb-0 w-full sm:w-1/2">
                    <div className="h-5 w-4/5 bg-indigo-200/60 dark:bg-indigo-800/30 rounded animate-pulse mb-2"></div>
                    <div className="h-4 w-1/2 bg-indigo-100/50 dark:bg-indigo-800/20 rounded animate-pulse"></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-24 bg-indigo-100/70 dark:bg-indigo-800/30 rounded animate-pulse"></div>
                    <div className="h-8 w-16 bg-indigo-300/60 dark:bg-indigo-700/50 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Layout>
      </AuthWrapper>
    )
  }
  
  if (error) {
    return (
      <AuthWrapper>
        <Layout variant="compact" headerVariant="default">
          <div className="flex flex-col items-center justify-center py-16">
            <div className="bg-red-50/50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center max-w-md">
              <h1 className="text-2xl font-bold text-red-700 dark:text-red-300 mb-4">エラーが発生しました</h1>
              <p className="text-lg text-muted-foreground">{error}</p>
            </div>
          </div>
        </Layout>
      </AuthWrapper>
    )
  }
  
  return (
    <AuthWrapper>
      <Layout variant="compact" headerVariant="default">
        <div className="space-y-6 animate-fadeIn">
          <h1 className="text-2xl font-bold tracking-tight text-indigo-800 dark:text-indigo-300">あなたの共有リスト</h1>
          <p className="text-muted-foreground">あなたが作成した共有記事コレクションのリストです</p>
          
          {shares.length === 0 ? (
            <div className="text-center py-12 border rounded-lg border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-950/20">
              <Share className="h-12 w-12 text-indigo-400 dark:text-indigo-500 mx-auto mb-4 opacity-70" />
              <h2 className="text-xl font-medium mb-2 text-indigo-700 dark:text-indigo-300">共有コレクションがありません</h2>
              <p className="text-muted-foreground">
                記事を選択して共有すると、ここに表示されます
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {shares.map(share => (
                <div
                  key={share.share_id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-indigo-200 dark:border-indigo-800 bg-white dark:bg-indigo-950/20"
                >
                  <div className="mb-4 sm:mb-0">
                    <h3 className="font-medium text-indigo-700 dark:text-indigo-300">{share.share_title}</h3>
                    <p className="text-sm text-muted-foreground truncate">
                      ID: {share.share_id}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyShareUrl(share.share_id)}
                      className="border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                    >
                      {copiedId === share.share_id ? "コピー済み" : "URLをコピー"}
                      {copiedId === share.share_id ? (
                        <Copy className="ml-2 h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                      ) : (
                        <Copy className="ml-2 h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                      )}
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600"
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
      </Layout>
    </AuthWrapper>
  )
} 