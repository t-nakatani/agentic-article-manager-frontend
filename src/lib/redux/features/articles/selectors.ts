import { createSelector } from "@reduxjs/toolkit"
import type { RootState } from "@/lib/redux/store"
import type { Article } from "@/lib/api/articles"
import { selectThemeNameById } from "@/lib/redux/features/themes/selectors"
import type { TreeNode } from "@/types/theme"

// 基本セレクター
export const selectArticles = (state: RootState) => state.articles.items
const selectArticlesStatus = (state: RootState) => state.articles.status
const selectArticlesError = (state: RootState) => state.articles.error

// フィルター関連のセレクター
const selectSelectedTheme = (state: RootState) => state.articleFilters.selectedTheme
const selectSortField = (state: RootState) => state.articleFilters.sortField
const selectSortDirection = (state: RootState) => state.articleFilters.sortDirection
const selectSearchQuery = (state: RootState) => state.articleFilters.searchQuery
const selectCurrentPage = (state: RootState) => state.articleFilters.currentPage
const selectPageSize = (state: RootState) => state.articleFilters.pageSize

// メモ化されたセレクター: テーマでフィルタリングされた記事
export const selectFilteredArticlesByTheme = createSelector(
  [selectArticles, selectSelectedTheme, (state) => state],
  (articles, selectedTheme, state): Article[] => {
    if (selectedTheme === "all") {
      return articles
    }
    
    // テーマIDからテーマ名を取得
    const themeName = selectThemeNameById(state, selectedTheme)
    
    if (!themeName || themeName === "all") {
      return articles
    }
    
    // 選択されたテーマとその子テーマのIDを取得
    const themeAndChildrenIds = getThemeAndChildrenIds(state, selectedTheme)
    const themeAndChildrenNames = themeAndChildrenIds.map(id => 
      selectThemeNameById(state, id)
    ).filter(Boolean) as string[]
    
    // 記事のテーマが選択されたテーマまたはその子テーマと一致するかチェック
    return articles.filter((article) =>
      article.themes.some((theme) => 
        themeAndChildrenNames.some(name => 
          name.toLowerCase() === theme.toLowerCase()
        )
      )
    )
  },
)

// 指定されたテーマIDとその子孫テーマのIDをすべて取得する関数
const getThemeAndChildrenIds = (state: RootState, themeId: string): string[] => {
  const result: string[] = []
  const themeTree = state.themes.themeTree

  // TreeNode を再帰的に探索する関数
  const findNodeAndChildren = (nodes: TreeNode[], targetId: string): boolean => {
    for (const node of nodes) {
      if (node.id === targetId) {
        // ターゲットノードを見つけたら、そのノードとすべての子孫ノードのIDを収集
        collectAllIds(node, result)
        return true // 見つかったことを示す
      }
      // 子ノードを再帰的に探索
      if (node.children && findNodeAndChildren(node.children, targetId)) {
        return true // 子孫で見つかった場合も true を返す
      }
    }
    return false // 見つからなかった
  }

  // 指定されたノードとそのすべての子孫ノードのIDを収集するヘルパー関数
  const collectAllIds = (node: TreeNode, idCollector: string[]) => {
    idCollector.push(node.id)
    if (node.children) {
      node.children.forEach((child: TreeNode) => collectAllIds(child, idCollector))
    }
  }

  // themeId が 'all' の場合は、すべてのテーマIDを収集（'all' を除く）
  if (themeId === "all") {
    const allIds: string[] = []
    const collectAllThemeIds = (nodes: TreeNode[]) => {
        nodes.forEach(node => {
            if (node.id !== "all") { // 'all' 自体は含めない
                allIds.push(node.id);
                if (node.children) {
                    collectAllThemeIds(node.children);
                }
            } else if (node.children) { // 'all' ノードの子から探索を開始
                collectAllThemeIds(node.children);
            }
        });
    };
    collectAllThemeIds(themeTree);
    return allIds;
  }


  // ツリー全体から指定された themeId のノードを探し、そのIDと子孫のIDを収集
  findNodeAndChildren(themeTree, themeId)
  
  // デバッグ用に結果をログ出力
  // console.log(`getThemeAndChildrenIds for ${themeId}:`, result);

  // 見つかったIDのリストを返す（見つからない場合は空配列）
  return result
}

// お気に入りでフィルタリングされた記事
export const selectFilteredArticlesByFavorite = createSelector(
  [selectFilteredArticlesByTheme, (state) => state.articleFilters.showFavorites],
  (articles, showFavorites): Article[] => {
    if (!showFavorites) {
      return articles
    }
    
    return articles.filter((article) => article.is_favorite === true)
  }
)

// あとでreadLaterでフィルタリングされた記事を取得
export const selectFilteredArticlesByReadLater = createSelector(
  [selectFilteredArticlesByFavorite, (state) => state.articleFilters.showReadLater],
  (articles, showReadLater): Article[] => {
    if (!showReadLater) {
      return articles
    }
    
    return articles.filter((article) => article.read_later === true)
  }
)

// ソート前のフィルタリングチェーンを更新
export const selectSortedArticles = createSelector(
  [selectFilteredArticlesByReadLater, selectSortField, selectSortDirection],
  (articles, field, direction): Article[] => {
    return [...articles].sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];

      // Handle null values for lastViewedAt
      if (field === "last_viewed_at") {
        if (aValue === null && bValue === null) return 0;
        if (aValue === null) return 1;
        if (bValue === null) return -1;
      }

      // nullチェックを追加
      if (aValue === null && bValue === null) return 0;
      if (aValue === null) return 1;
      if (bValue === null) return -1;

      const comparison = direction === "asc" ? 1 : -1;
      // 安全な比較のために型チェックを追加
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue) * comparison;
      }
      
      // 数値または日付の比較
      return (aValue < bValue ? -1 : aValue > bValue ? 1 : 0) * comparison;
    });
  },
);

// メモ化されたセレクター: 検索クエリでフィルタリングされた記事
export const selectSearchedArticles = createSelector(
  [selectSortedArticles, selectSearchQuery],
  (articles, query): Article[] => {
    if (!query.trim()) return articles

    const normalizedQuery = query.toLowerCase()
    return articles.filter((article) => {
      const titleMatch = article.title.toLowerCase().includes(normalizedQuery)
      const summaryMatch = article.one_line_summary.toLowerCase().includes(normalizedQuery)
      return titleMatch || summaryMatch
    })
  },
)

// メモ化されたセレクター: ページネーションされた記事
export const selectPaginatedArticles = createSelector(
  [selectSearchedArticles, selectCurrentPage, selectPageSize],
  (articles, currentPage, pageSize): Article[] => {
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = Math.min(startIndex + pageSize, articles.length)
    return articles.slice(startIndex, endIndex)
  },
)

// メモ化されたセレクター: 総アイテム数
export const selectTotalItems = createSelector([selectSearchedArticles], (articles): number => articles.length)

// ローディング状態のセレクター
export const selectIsArticlesLoading = createSelector([selectArticlesStatus], (status): boolean => status === "loading")

// 特定の記事のメモ関連の状態を取得するセレクター
export const selectArticleMemoState = createSelector(
  [selectArticles, (_state: RootState, articleId: string) => articleId],
  (articles, articleId) => {
    const article = articles.find(item => item.article_id === articleId)
    return {
      memo: article?.memo || "",
      memoEdit: article?.memoEdit || article?.memo || "",
      memoVisible: article?.memoVisible || false,
      memoSaving: article?.memoSaving || false
    }
  }
)

