"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Loader2 } from "lucide-react"
import { PublicArticleCard } from "@/components/articles/public-card/public-article-card"
import bulkArticleAPI from "@/lib/api/bulk-article"
import { Layout } from "@/components/layout/Layout"
import { Article } from "@/types/article"
import { PublicArticleCardList } from "@/components/articles/public-card/public-article-card-list"

// 共有された記事の型定義
interface SharedArticle {
  title: string;
  url: string;
  one_line_summary: string;
}

// 共有データの型定義
interface SharedData {
  share_id: string;
  share_title: string;
  shared_articles: SharedArticle[];
}

export default function SharedArticlesPage() {
  const params = useParams()
  const shareId = params.id as string
  
  const [sharedData, setSharedData] = useState<SharedData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const fetchSharedArticles = async () => {
      try {
        // APIから共有データを取得
        const data = await bulkArticleAPI.getSharedArticles(shareId)
        setSharedData(data)
      } catch (err) {
        console.error("共有記事の取得に失敗しました", err)
        setError("共有記事の取得に失敗しました。リンクが無効か期限切れの可能性があります。")
      } finally {
        setLoading(false)
      }
    }
    
    if (shareId) {
      fetchSharedArticles()
    }
  }, [shareId])
  
  if (loading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <Loader2 className="h-8 w-8 animate-spin mb-4" />
          <p className="text-lg font-medium">共有された記事を読み込んでいます...</p>
        </div>
      </Layout>
    )
  }
  
  if (error || !sharedData) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <h1 className="text-2xl font-bold mb-4">エラーが発生しました</h1>
          <p className="text-lg text-muted-foreground">{error || "共有データの取得に失敗しました"}</p>
        </div>
      </Layout>
    )
  }
  
  // 共有記事をArticle型に変換
  const articles: Article[] = sharedData.shared_articles.map((article, index) => ({
    id: `shared-${index}`,
    title: article.title,
    url: article.url,
    one_line_summary: article.one_line_summary,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_favorite: false,
    is_read_later: false,
    is_processed: true,
    user_id: "",
  }));
  
  return (
    <Layout>
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-2">{sharedData.share_title}</h1>
          <p className="text-muted-foreground">
            このページは{sharedData.shared_articles.length}件の共有された記事を表示しています
          </p>
        </header>
        
        <PublicArticleCardList articles={articles} />
      </div>
    </Layout>
  )
} 