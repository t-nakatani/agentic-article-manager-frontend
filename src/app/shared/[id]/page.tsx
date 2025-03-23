"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import bulkArticleAPI from "@/lib/api/bulk-article"
import { Layout } from "@/components/layout/Layout"
import { PublicArticleCardList } from "@/components/articles/public-card/public-article-card-list"
import { LoadingState } from "@/app/shared/_components/loading-state"
import { ErrorState } from "@/app/shared/_components/error-state"
import { SharedCollectionHeader } from "@/app/shared/_components/collection/shared-collection-header"
import { CtaSection } from "@/app/shared/_components/collection/cta-section"

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

// 共有用の簡易Article型
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
        <LoadingState />
      </Layout>
    )
  }
  
  if (error || !sharedData) {
    return (
      <Layout>
        <ErrorState error={error} />
      </Layout>
    )
  }
  
  // 共有記事をArticle型に変換
  const articles: SharedArticleType[] = sharedData.shared_articles.map((article, index) => ({
    article_id: `shared-${index}`,
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
    themes: [],
    last_viewed_at: null
  }));
  
  return (
    <Layout>
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <SharedCollectionHeader 
          title={sharedData.share_title} 
          articleCount={sharedData.shared_articles.length}
          shareId={shareId}
        />
        
        <PublicArticleCardList articles={articles} />
        
        <CtaSection />
      </div>
    </Layout>
  )
} 