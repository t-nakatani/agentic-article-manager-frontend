import { createSelector } from "@reduxjs/toolkit"
import type { RootState } from "@/lib/redux/store"
import type { TreeNode } from "@/types/theme"

// 基本セレクター
const selectThemesState = (state: RootState) => state.themes
const selectThemesStatus = (state: RootState) => state.themes.status
const selectThemesError = (state: RootState) => state.themes.error
const selectSelectedTheme = (state: RootState) => state.themes.selectedTheme

// メモ化されたセレクター: テーマツリー
export const selectThemeTree = createSelector(
  [selectThemesState],
  (themesState): TreeNode[] => themesState.themeTree || []
)

// ローディング状態のセレクター
export const selectIsThemesLoading = createSelector([selectThemesStatus], (status): boolean => status === "loading")

// Helper function to find a node by ID in the tree
const findNodeById = (nodes: TreeNode[], id: string): TreeNode | null => {
  if (id === "all") {
      // Assuming the root "all" node is always the first element if present
      return nodes.length > 0 && nodes[0].id === "all" ? nodes[0] : null;
  }
  for (const node of nodes) {
    if (node.id === id) {
      return node;
    }
    if (node.children) {
      const found = findNodeById(node.children, id);
      if (found) {
        return found;
      }
    }
  }
  return null;
};

// Helper function to find a node by label (case-insensitive) in the tree
const findNodeByLabel = (nodes: TreeNode[], label: string): TreeNode | null => {
  const normalizedLabel = label.toLowerCase();
   if (normalizedLabel === "all") {
     return nodes.length > 0 && nodes[0].id === "all" ? nodes[0] : null;
   }
  for (const node of nodes) {
    if (node.label.toLowerCase() === normalizedLabel) {
      return node;
    }
    if (node.children) {
      const found = findNodeByLabel(node.children, label);
      if (found) {
        return found;
      }
    }
  }
  return null;
};

// テーマIDからテーマ名を取得するセレクター
export const selectThemeNameById = createSelector(
  [selectThemeTree, (_, themeId: string | null) => themeId],
  (tree, themeId): string | null => {
    if (!themeId) return null;
    
    const node = findNodeById(tree, themeId);
    return node ? node.label : null;
  }
)

// テーマ名からテーマIDを取得するセレクター
export const selectThemeIdByName = createSelector(
  [selectThemeTree, (_, themeName: string | null) => themeName],
  (tree, themeName): string | null => {
    if (!themeName) return null;
    
    const node = findNodeByLabel(tree, themeName);
    return node ? node.id : null;
  }
)

