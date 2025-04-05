export interface TreeNode {
  id: string
  label: string
  children?: TreeNode[]
  isNewNode?: boolean
}

export type TreeAction =
  | { type: "ADD_NODE"; parentId: string | null; label: string }
  | { type: "DELETE_NODE"; id: string }
  | { type: "MOVE_NODE"; sourceId: string; targetId: string }
  | { type: "RENAME_NODE"; id: string; label: string }

// テーマデータの型定義
export interface ThemeData {
  [key: string]: ThemeData
}
