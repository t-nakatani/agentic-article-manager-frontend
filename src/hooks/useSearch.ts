"use client"

import { useState, useCallback, useMemo } from "react"
import type { Article } from "@/lib/api"
import { useDebounce } from "./useDebounce"

interface UseSearchOptions {
  initialQuery?: string
  debounceMs?: number
}

export function useSearch(articles: Article[], options: UseSearchOptions = {}) {
  const { initialQuery = "", debounceMs = 300 } = options
  const [query, setQuery] = useState(initialQuery)

  // クエリの変更をデバウンス
  const debouncedQuery = useDebounce(query, debounceMs)

  // 検索ロジック - 後でサーバーサイド検索に置き換え可能
  const searchArticles = useCallback((articles: Article[], searchQuery: string) => {
    if (!searchQuery.trim()) return articles

    const normalizedQuery = searchQuery.toLowerCase()

    return articles.filter((article) => {
      const titleMatch = article.title.toLowerCase().includes(normalizedQuery)
      const summaryMatch = article.one_line_summary.toLowerCase().includes(normalizedQuery)
      return titleMatch || summaryMatch
    })
  }, [])

  // メモ化された検索結果
  const searchResults = useMemo(() => {
    return searchArticles(articles, debouncedQuery)
  }, [articles, debouncedQuery, searchArticles])

  return {
    query,
    setQuery,
    searchResults,
    isSearching: query !== debouncedQuery, // 検索中かどうかを示すフラグ
  }
}

