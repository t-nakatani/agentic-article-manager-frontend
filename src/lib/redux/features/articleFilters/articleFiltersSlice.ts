import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { SortField, SortDirection } from "@/types/article"

interface ArticleFiltersState {
  sortField: SortField
  sortDirection: SortDirection
  searchQuery: string
  selectedTheme: string
  currentPage: number
  pageSize: number
  showFavorites: boolean
}

const initialState: ArticleFiltersState = {
  sortField: "created_at",
  sortDirection: "desc",
  searchQuery: "",
  selectedTheme: "all",
  currentPage: 1,
  pageSize: 20,
  showFavorites: false
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
  },
})

export const { setSortField, setSortDirection, setSearchQuery, setSelectedTheme, setCurrentPage, setPageSize, setShowFavorites } =
  articleFiltersSlice.actions
export default articleFiltersSlice.reducer

