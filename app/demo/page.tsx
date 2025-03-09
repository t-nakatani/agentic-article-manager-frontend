"use client"

import { Layout } from "@/components/layout/Layout"
import { ThemeTree } from "@/components/themes/ThemeTree"
import { ArticleList } from "@/components/articles/list/article-list"
import { DemoNotice } from "./components/DemoNotice"
import { useDemo } from "./hooks/useDemo"
import { demoThemes } from "./data"

export default function DemoPage() {
  const {
    selectedTheme,
    setSelectedTheme,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    searchQuery,
    setSearchQuery,
    searchResults,
    totalItems,
    currentPage,
    pageSize,
    onPageChange,
    onPageSizeChange,
    isSearching,
    stickySearch,
    isLoading,
    handleDeleteArticle,
    handleRefresh,
    showFavorites,
    setShowFavorites,
  } = useDemo()

  return (
    <Layout>
      <div className="space-y-6">
        <DemoNotice />

        <div className="grid gap-6 lg:grid-cols-[1fr_300px] lg:gap-8">
          <main className="min-w-0">
            <ArticleList
              articles={searchResults}
              isLoading={isLoading}
              selectedTheme={selectedTheme}
              sortField={sortField}
              sortDirection={sortDirection}
              onSortFieldChange={setSortField}
              onSortDirectionChange={setSortDirection}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              isSearching={isSearching}
              stickySearch={stickySearch}
              onDeleteArticle={handleDeleteArticle}
              onRefresh={handleRefresh}
              currentPage={currentPage}
              pageSize={pageSize}
              totalItems={totalItems}
              onPageChange={onPageChange}
              onPageSizeChange={onPageSizeChange}
              showFavorites={showFavorites}
              onShowFavoritesChange={setShowFavorites}
            />
          </main>
          <aside className="hidden lg:block">
            <ThemeTree
              onSelectTheme={setSelectedTheme}
              selectedTheme={selectedTheme}
              isDemoMode={true}
              demoThemes={demoThemes}
            />
          </aside>
        </div>
      </div>
    </Layout>
  )
}

