"use client"

import { useState, useEffect, useMemo } from "react"
import { Layout } from "@/components/layout/Layout"
import { ThemeTree } from "@/components/themes/ThemeTree"
import { ArticleList } from "@/components/articles/list/article-list"
import type { SortField, SortDirection, Article } from "@/types/article"
import { demoArticles, demoThemes } from "@/app/demo/data"
import Link from "next/link"
import { TrendArticles } from "@/components/articles/trend/trend-articles"
import { SearchContainer } from "@/components/articles/search/search-container"
import FeatureFlags from "@/config/feature-flags"

export function DemoArticleReaderContent() {
  // 状態管理
  const [sortField, setSortField] = useState<SortField>("created_at")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTheme, setSelectedTheme] = useState("")
  const [showFavorites, setShowFavorites] = useState(false)
  const [showReadLater, setShowReadLater] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([])
  
  // ページネーション用の状態
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [totalItems, setTotalItems] = useState(0)

  // デモ用のトレンド記事
  const demoTrendArticles = useMemo(() => {
    return demoArticles.slice(0, 9).map(article => ({
      ...article,
      is_favorite: Math.random() > 0.5
    }))
  }, [])

  // 記事のフィルタリングと並び替え
  useEffect(() => {
    // 初期ロード時は少し遅延させてローディング状態を表示
    const timer = setTimeout(() => {
      // 検索とテーマでフィルタリング
      let filtered = [...demoArticles]
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        filtered = filtered.filter(
          article => 
            article.title.toLowerCase().includes(query) || 
            article.one_line_summary.toLowerCase().includes(query)
        )
      }
      
      if (selectedTheme) {
        filtered = filtered.filter(
          article => {
            // テーマIDが数値の場合（親テーマの場合）、文字列に変換して比較
            return article.themes.some(theme => 
              typeof theme === 'number' 
                ? String(theme) === selectedTheme 
                : theme === selectedTheme
            )
          }
        )
      }
      
      // お気に入りフィルタリング
      if (showFavorites) {
        filtered = filtered.filter(article => article.is_favorite)
      }
      
      // あとで読むフィルタリング
      if (showReadLater) {
        filtered = filtered.filter(article => article.read_later)
      }
      
      // 並び替え
      filtered.sort((a, b) => {
        const aValue = a[sortField]
        const bValue = b[sortField]
        
        if (aValue === null) return sortDirection === "asc" ? -1 : 1
        if (bValue === null) return sortDirection === "asc" ? 1 : -1
        
        if (sortDirection === "asc") {
          return aValue < bValue ? -1 : 1
        } else {
          return aValue > bValue ? -1 : 1
        }
      })
      
      setTotalItems(filtered.length)
      
      // ページネーション
      const startIndex = (currentPage - 1) * pageSize
      const paginatedArticles = filtered.slice(startIndex, startIndex + pageSize)
      
      setFilteredArticles(paginatedArticles)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [searchQuery, selectedTheme, sortField, sortDirection, showFavorites, showReadLater])

  // 記事削除のモック関数
  const handleDeleteArticle = async (articleId: string) => {
    // デモ用なので実際には削除せず、UIだけ更新
    setFilteredArticles(prev => prev.filter(article => article.article_id !== articleId))
    setTotalItems(prev => prev - 1)
    return Promise.resolve()
  }

  // 更新のモック関数
  const handleRefresh = async () => {
    setIsLoading(true)
    // 少し遅延させてローディング状態を表示
    await new Promise(resolve => setTimeout(resolve, 800))
    setIsLoading(false)
    return Promise.resolve()
  }

  return (
    <Layout>
      <div className="grid gap-6 lg:grid-cols-[1fr_300px] lg:gap-8">
        <main className="min-w-0">
          <div className="space-y-4 mb-6">
            <h1 className="text-2xl font-bold tracking-tight">デモ記事一覧</h1>
            <p className="text-muted-foreground">
              これはデモページです。あなたの記事を保存するには<Link href="/login" className="text-theme-600 dark:text-theme-400 hover:underline mx-1">ログイン</Link>して下さい。
            </p>
          </div>
          
          {/* 検索バーセクション */}
          <SearchContainer
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortField={sortField}
            sortDirection={sortDirection}
            onSortFieldChange={setSortField}
            onSortDirectionChange={setSortDirection}
            showFavorites={showFavorites}
            onShowFavoritesChange={setShowFavorites}
            showReadLater={showReadLater}
            onShowReadLaterChange={setShowReadLater}
            onRefresh={handleRefresh}
            isSticky={true}
          />
          
          {/* トレンド記事セクション */}
          {!FeatureFlags.TREND_ARTICLES_IN_DEVELOPMENT && (
            <div className="mb-6">
              <TrendArticles articles={demoTrendArticles} onDelete={handleDeleteArticle} />
            </div>
          )}
          
          {/* 通常の記事一覧 */}
          <ArticleList
            articles={filteredArticles}
            isLoading={isLoading}
            onDeleteArticle={handleDeleteArticle}
            currentPage={currentPage}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        </main>
        <aside className="hidden lg:block">
          <ThemeTree 
            onSelectTheme={setSelectedTheme} 
            selectedTheme={selectedTheme}
            themes={demoThemes}
          />
        </aside>
      </div>
    </Layout>
  )
} 