import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { SortField, SortDirection } from "@/types/article"
import { createAction } from "@reduxjs/toolkit"

interface ArticleFiltersState {
  sortField: SortField
  sortDirection: SortDirection
  searchQuery: string
  selectedTheme: string
  currentPage: number
  pageSize: number
  showFavorites: boolean
  showReadLater: boolean
  isSelectionMode: boolean
  selectedArticleIds: string[]
}

const initialState: ArticleFiltersState = {
  sortField: "created_at",
  sortDirection: "desc",
  searchQuery: "",
  selectedTheme: "all",
  currentPage: 1,
  pageSize: 20,
  showFavorites: false,
  showReadLater: false,
  isSelectionMode: false,
  selectedArticleIds: []
}

export const articleFiltersSlice = createSlice({
  name: "articleFilters",
  initialState,
  reducers: {
    setSortField: (state, action: PayloadAction<SortField>) => {
      state.sortField = action.payload
      state.currentPage = 1 // ソート変更時にページをリセット
    },
    setSortDirection: (state, action: PayloadAction<SortDirection>) => {
      state.sortDirection = action.payload
      state.currentPage = 1 // ソート変更時にページをリセット
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
      state.currentPage = 1 // 検索変更時にページをリセット
    },
    setSelectedTheme: (state, action: PayloadAction<string>) => {
      state.selectedTheme = action.payload
      state.currentPage = 1 // テーマ変更時にページをリセット
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload
      state.currentPage = 1 // ページサイズ変更時にページをリセット
    },
    setShowFavorites: (state, action: PayloadAction<boolean>) => {
      state.showFavorites = action.payload
      state.currentPage = 1 // フィルタ変更時にページをリセット
    },
    setShowReadLater: (state, action: PayloadAction<boolean>) => {
      state.showReadLater = action.payload
    },
    setSelectionMode: (state, action: PayloadAction<boolean>) => {
      state.isSelectionMode = action.payload
      // 選択モードを終了する場合は選択された記事をクリア
      if (!action.payload) {
        state.selectedArticleIds = []
      }
    },
    toggleArticleSelection: (state, action: PayloadAction<string>) => {
      const articleId = action.payload
      const index = state.selectedArticleIds.indexOf(articleId)
      
      if (index === -1) {
        // 選択されていない場合は追加
        state.selectedArticleIds.push(articleId)
      } else {
        // 既に選択されている場合は削除
        state.selectedArticleIds.splice(index, 1)
      }
    },
    clearSelectedArticles: (state) => {
      state.selectedArticleIds = []
    }
  },
})

export const { 
  setSortField, 
  setSortDirection, 
  setSearchQuery, 
  setSelectedTheme, 
  setCurrentPage, 
  setPageSize, 
  setShowFavorites,
  setShowReadLater,
  setSelectionMode,
  toggleArticleSelection,
  clearSelectedArticles
} = articleFiltersSlice.actions

export default articleFiltersSlice.reducer

