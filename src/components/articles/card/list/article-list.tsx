"use client"

import { ArticleCard } from "@/components/articles/card/article-card"
import { ArticleListSkeleton } from "./article-list-skeleton"
import { ArticleListFooter } from "./article-list-footer"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { Article } from "@/lib/api/articles"
import Link from "next/link"

interface ArticleListProps {
  articles: Article[]
  isLoading: boolean
  totalItems?: number
  onDeleteArticle: (articleId: string) => Promise<void>
  // ページネーション関連のprops
  currentPage?: number
  pageSize?: number
  onPageChange?: (page: number) => void
  onPageSizeChange?: (size: number) => void
}

export function ArticleList({
  articles,
  isLoading,
  onDeleteArticle,
  // ページネーション関連のpropsにデフォルト値を設定
  currentPage = 1,
  pageSize = 20,
  totalItems = 0,
  onPageChange = () => {},
  onPageSizeChange = () => {},
}: ArticleListProps) {
  // 記事がない場合のメッセージ
  const noArticlesMessage = (
    <>
      記事がありません。
      <Link href="/dev" className="text-theme-600 dark:text-theme-400 hover:underline mx-1">
        Chrome拡張機能
      </Link>
      をインストールして記事を追加してください。
    </>
  );
  
  // 検索結果がない場合のメッセージ
  const noSearchResultsMessage = <>検索条件に一致する記事がありません。検索条件を変更してください。</>;

  if (isLoading) {
    return <ArticleListSkeleton />
  }

  if (articles.length === 0) {
    return (
      <Alert>
        <AlertDescription>
          {totalItems === 0 ? noArticlesMessage : noSearchResultsMessage}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-3">
      {/* シート形式の記事一覧 */}
      <div className="rounded-lg border border-indigo-200 dark:border-indigo-800 bg-card shadow-sm animate-fadeIn overflow-hidden">
        {articles.map((article, index) => (
          <div key={article.article_id}>
            <ArticleCard article={article} onDelete={onDeleteArticle} />
            {/* 最後の項目以外にセパレータを表示 */}
            {index < articles.length - 1 && (
              <div className="border-t border-indigo-100 dark:border-indigo-900"></div>
            )}
          </div>
        ))}
      </div>
      
      <ArticleListFooter
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  )
}
