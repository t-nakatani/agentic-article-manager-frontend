"use client"
import { Layout } from "@/components/layout/Layout"
import { ThemeTree } from "@/components/themes/ThemeTree"
import { ArticleList } from "@/components/articles/list/article-list"
import { AuthWrapper } from "@/components/auth/AuthWrapper"
import type { SortField, SortDirection } from "@/types/article"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import {
  setSortField,
  setSortDirection,
  setSearchQuery,
  setSelectedTheme,
  setShowFavorites,
} from "@/lib/redux/features/articleFilters/articleFiltersSlice"
import { useReduxArticles } from "@/hooks/useReduxArticles"
import { useReduxTrendArticles } from "@/hooks/useReduxTrendArticles"
import { TrendArticlesContainer } from "@/components/articles/trend/trend-articles-container"

export function ArticleReaderContent() {
  // Reduxの状態とアクション
  const dispatch = useAppDispatch()
  const { sortField, sortDirection, searchQuery, selectedTheme, showFavorites } = useAppSelector((state) => state.articleFilters)

  // useReduxArticlesフックを使用
  const {
    articles,
    totalItems,
    currentPage,
    pageSize,
    isLoading,
    deleteArticle,
    refreshArticles,
    onPageChange,
    onPageSizeChange,
  } = useReduxArticles()

  // トレンド記事の更新用
  const { refreshTrendArticles } = useReduxTrendArticles()

  // ソートフィールド変更時にReduxの状態を更新
  const handleSortFieldChange = (field: SortField) => {
    dispatch(setSortField(field))
  }

  // ソート方向変更時にReduxの状態を更新
  const handleSortDirectionChange = (direction: SortDirection) => {
    dispatch(setSortDirection(direction))
  }

  // 検索クエリ変更時にReduxの状態を更新
  const handleSearchChange = (query: string) => {
    dispatch(setSearchQuery(query))
  }

  // テーマ選択時にReduxの状態を更新
  const handleThemeSelect = (theme: string) => {
    dispatch(setSelectedTheme(theme))
  }

  // お気に入りフィルタ変更時にReduxの状態を更新
  const handleShowFavoritesChange = (showFavorites: boolean) => {
    dispatch(setShowFavorites(showFavorites))
  }

  // 両方の記事を更新する関数
  const handleRefreshAll = async () => {
    await refreshArticles()
    await refreshTrendArticles()
  }

  return (
    <AuthWrapper>
      <Layout>
        <div className="grid gap-6 lg:grid-cols-[1fr_300px] lg:gap-8">
          <main className="min-w-0">
            {/* トレンド記事セクション */}
            <TrendArticlesContainer onDeleteArticle={deleteArticle} />
            
            {/* 通常の記事一覧 */}
            <ArticleList
              articles={articles}
              isLoading={isLoading}
              selectedTheme={selectedTheme}
              sortField={sortField}
              sortDirection={sortDirection}
              onSortFieldChange={handleSortFieldChange}
              onSortDirectionChange={handleSortDirectionChange}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              stickySearch={true}
              onDeleteArticle={deleteArticle}
              onRefresh={handleRefreshAll}
              // ページネーション関連のpropsを追加
              currentPage={currentPage}
              pageSize={pageSize}
              totalItems={totalItems}
              onPageChange={onPageChange}
              onPageSizeChange={onPageSizeChange}
              showFavorites={showFavorites}
              onShowFavoritesChange={handleShowFavoritesChange}
            />
          </main>
          <aside className="hidden lg:block">
            <ThemeTree onSelectTheme={handleThemeSelect} selectedTheme={selectedTheme} />
          </aside>
        </div>
      </Layout>
    </AuthWrapper>
  )
}

