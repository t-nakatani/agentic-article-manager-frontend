"use client"

import { useEffect, useState } from "react"
import { Share, ExternalLink, Copy, ClipboardCheck, Library } from "lucide-react"
import { toast } from "sonner"
import { useAppSelector } from "@/lib/redux/hooks"
import bulkArticleAPI from "@/lib/api/bulk-article"
import { Button } from "@/components/ui/button"
import { Layout } from "@/components/layout/Layout"
import { AuthWrapper } from "@/components/auth/AuthWrapper"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

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
          <Card className="border-indigo-200 dark:border-indigo-800 bg-white dark:bg-indigo-950/10 mb-6">
            <CardHeader>
              <Skeleton className="h-8 w-3/5 mb-2" />
              <Skeleton className="h-4 w-4/5" />
            </CardHeader>
          </Card>
          
          {/* スケルトンUI: 共有リスト */}
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-indigo-200/70 dark:border-indigo-800/40 bg-white dark:bg-indigo-950/10">
                <CardHeader className="pb-2">
                  <Skeleton className="h-5 w-4/5 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardFooter className="pt-2 justify-end">
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-9 w-28" />
                    <Skeleton className="h-9 w-20" />
                  </div>
                </CardFooter>
              </Card>
            ))}
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
            <Card className="border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/10 max-w-md">
              <CardHeader>
                <CardTitle className="text-center text-red-700 dark:text-red-300">エラーが発生しました</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">{error}</p>
              </CardContent>
            </Card>
          </div>
        </Layout>
      </AuthWrapper>
    )
  }
  
  return (
    <AuthWrapper>
      <Layout variant="compact" headerVariant="default">
        <div className="space-y-6 animate-fadeIn">
          <Card className="bg-white/90 dark:bg-indigo-950/5 border-indigo-100 dark:border-indigo-800/40">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Library className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                <CardTitle className="text-2xl font-bold tracking-tight text-indigo-800 dark:text-indigo-300">あなたの共有リスト</CardTitle>
              </div>
              <CardDescription className="text-indigo-700/70 dark:text-indigo-400/70">
                記事コレクションを共有して、他のユーザーと情報を交換できます
              </CardDescription>
            </CardHeader>
          </Card>
          
          {shares.length === 0 ? (
            <Card className="border-dashed border-2 border-indigo-200 dark:border-indigo-800/60 bg-indigo-50/50 dark:bg-indigo-950/10">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="bg-indigo-100 dark:bg-indigo-800/20 p-4 rounded-full mb-4">
                  <Share className="h-10 w-10 text-indigo-500 dark:text-indigo-400" />
                </div>
                <h2 className="text-xl font-medium mb-2 text-indigo-700 dark:text-indigo-300">共有コレクションがありません</h2>
                <p className="text-muted-foreground text-center max-w-md">
                  記事を選択して共有すると、ここに表示されます。複数の記事をまとめて共有できます。
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {shares.map(share => (
                <Card 
                  key={share.share_id} 
                  className="border-indigo-200 dark:border-indigo-800/60 bg-white dark:bg-indigo-950/10 hover:shadow-md transition-shadow duration-200"
                >
                  <CardHeader className="pb-2">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <CardTitle className="text-lg font-medium text-indigo-700 dark:text-indigo-300">{share.share_title}</CardTitle>
                        <div className="flex items-center mt-1 text-sm text-muted-foreground">
                          <Badge variant="outline" className="mr-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-700">
                            共有ID
                          </Badge>
                          <span className="font-mono">{share.share_id}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter className="pt-3 flex flex-wrap justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyShareUrl(share.share_id)}
                      className="border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                    >
                      {copiedId === share.share_id ? "コピー済み" : "URLをコピー"}
                      {copiedId === share.share_id ? (
                        <ClipboardCheck className="ml-2 h-4 w-4 text-green-600 dark:text-green-400" />
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
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Layout>
    </AuthWrapper>
  )
} 