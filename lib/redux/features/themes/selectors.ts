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

