import { createSelector } from "@reduxjs/toolkit"
import type { RootState } from "@/lib/redux/store"
import type { TreeNode } from "@/types/theme"
import { convertFlowNodesToTreeNodes } from "@/lib/theme-utils"

// 基本セレクター
const selectThemeNodes = (state: RootState) => state.themes.nodes
const selectThemeEdges = (state: RootState) => state.themes.edges
const selectThemesStatus = (state: RootState) => state.themes.status
const selectThemesError = (state: RootState) => state.themes.error
const selectSelectedTheme = (state: RootState) => state.themes.selectedTheme

// メモ化されたセレクター: ツリー構造に変換されたテーマ
export const selectThemeTree = createSelector([selectThemeNodes, selectThemeEdges], (nodes, edges): TreeNode[] => {
  return convertFlowNodesToTreeNodes(nodes, edges)
})

// ローディング状態のセレクター
export const selectIsThemesLoading = createSelector([selectThemesStatus], (status): boolean => status === "loading")

// テーマIDからテーマ名を取得するセレクター
export const selectThemeNameById = createSelector(
  [selectThemeNodes, (_, themeId: string) => themeId],
  (nodes, themeId): string | null => {
    if (themeId === "all") return "all"
    
    const node = nodes.find(node => node.id === themeId)
    return node ? node.data.label : null
  }
)

// テーマ名からテーマIDを取得するセレクター
export const selectThemeIdByName = createSelector(
  [selectThemeNodes, (_, themeName: string) => themeName],
  (nodes, themeName): string | null => {
    if (themeName === "all") return "all"
    
    // 大文字小文字を区別せずに比較
    const normalizedName = themeName.toLowerCase()
    const node = nodes.find(node => node.data.label.toLowerCase() === normalizedName)
    return node ? node.id : null
  }
)

