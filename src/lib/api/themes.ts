import { BaseAPIClient } from "./base"
import type { Node, Edge } from "reactflow"

// 型定義を追加
interface InitializeThemesRequest {
  user_id: string
}

interface CreateThemeRequest {
  user_id: string
  parent_theme_id: number | null
  theme_name: string
}

interface CreateThemeResponse {
  theme_id: number
}

interface ThemeNode {
  id: number
  name: string
  children: ThemeNode[]
}

interface ThemeResponse {
  root: ThemeNode[]
}

class ThemesAPI extends BaseAPIClient {
  async getThemes(userId: string): Promise<{ nodes: Node[]; edges: Edge[] } | null> {
    const response = await this.fetch<ThemeResponse>(`/themes?user_id=${encodeURIComponent(userId)}`)
    console.log("Raw API Response:", response)

    // レスポンスが空の場合はnullを返す（初期化が必要なことを示す）
    if (!response.root || response.root.length === 0) {
      return null
    }

    // デフォルトのルートノード
    const defaultNode: Node = {
      id: "all",
      type: "theme",
      position: { x: 250, y: 50 },
      data: { label: "すべて" },
    }

    const nodes: Node[] = [defaultNode]
    const edges: Edge[] = []

    // 再帰的にノードとエッジを生成
    const processNode = (node: ThemeNode, level: number, xOffset: number): void => {
      // ノードを追加
      nodes.push({
        id: node.id.toString(),
        type: "theme",
        position: { x: xOffset, y: 50 + level * 100 },
        data: { label: node.name },
      })

      // level 1のノードは"all"に接続
      if (level === 1) {
        edges.push({
          id: `e-all-${node.id}`,
          source: "all",
          target: node.id.toString(),
          animated: true,
        })
      }

      // 子ノードを処理
      node.children.forEach((child, index) => {
        // 親子関係のエッジを追加
        edges.push({
          id: `e-${node.id}-${child.id}`,
          source: node.id.toString(),
          target: child.id.toString(),
          animated: true,
        })

        // 子ノードの水平位置を計算
        const childOffset = xOffset + (index - (node.children.length - 1) / 2) * 200
        processNode(child, level + 1, childOffset)
      })
    }

    // ルートノードを処理
    response.root.forEach((rootNode, index) => {
      const xOffset = 250 + (index - (response.root.length - 1) / 2) * 200
      processNode(rootNode, 1, xOffset)
    })

    return { nodes, edges }
  }

  // 初期化用のメソッドを追加
  async initializeThemes(data: InitializeThemesRequest): Promise<ThemeResponse> {
    return this.fetch("/themes/init", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  // テーマ作成用のメソッドを追加
  async createTheme(data: CreateThemeRequest): Promise<CreateThemeResponse> {
    return this.fetch("/themes", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  // theme idの型をnumberに修正
  async updateThemeName(themeId: number, data: { user_id: string; theme_name: string }): Promise<void> {
    return this.fetch(`/themes/${themeId}/name`, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
  }

  async deleteTheme(themeId: string, userId: string): Promise<void> {
    return this.fetch(`/themes/${encodeURIComponent(themeId)}?user_id=${encodeURIComponent(userId)}`, {
      method: "DELETE",
    })
  }
}

const API_BASE_URL = "https://knowledge-pholio.ngrok.dev"
if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined")
}

const themesAPI = new ThemesAPI(API_BASE_URL)
export default themesAPI

// モックデータ（実際の実装ではAPIから取得）
const mockThemeFlow = {
  nodes: [
    {
      id: "1",
      type: "theme",
      position: { x: 250, y: 5 },
      data: { label: "すべて" },
    },
    {
      id: "2",
      type: "theme",
      position: { x: 100, y: 100 },
      data: { label: "技術" },
    },
    {
      id: "3",
      type: "theme",
      position: { x: 400, y: 100 },
      data: { label: "ビジネス" },
    },
    {
      id: "4",
      type: "theme",
      position: { x: 100, y: 200 },
      data: { label: "プログラミング" },
    },
  ],
  edges: [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e1-3", source: "1", target: "3" },
    { id: "e2-4", source: "2", target: "4" },
  ],
};

// ローカルストレージのキー
const THEME_FLOW_STORAGE_KEY = "theme_flow_data";

// テーマフローデータを取得する関数
export async function fetchThemeFlow() {
  // ローカルストレージからデータを取得
  const storedData = localStorage.getItem(THEME_FLOW_STORAGE_KEY);
  
  if (storedData) {
    return JSON.parse(storedData);
  }
  
  // 初回はモックデータを返す
  return mockThemeFlow;
}

// テーマフローデータを保存する関数
export async function saveThemeFlow({ nodes, edges }: { nodes: Node[]; edges: Edge[] }) {
  // ローカルストレージにデータを保存
  localStorage.setItem(THEME_FLOW_STORAGE_KEY, JSON.stringify({ nodes, edges }));
  return { success: true };
}

