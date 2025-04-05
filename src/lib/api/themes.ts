import { BaseAPIClient } from "./base"
// import type { Node, Edge } from "reactflow" // Removed

// 定数定義
export const ROOT_THEME_PARENT_ID = -1 // 「すべて」の直下を示す特別な親ID

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

// テーマエクスポートリクエストの型定義
interface ExportThemeRequest {
  user_id: string
}

// テーマエクスポートレスポンスの型定義
interface ExportThemeResponse {
  request_id: string
}

class ThemesAPI extends BaseAPIClient {
  // Return type needs to be updated to reflect the new data structure (e.g., TreeNode[])
  // async getThemes(userId: string): Promise<{ nodes: Node[]; edges: Edge[] } | null> {
  // For now, let's use the raw API response type directly
  async getThemes(userId: string): Promise<ThemeResponse | null> {
    const response = await this.fetch<ThemeResponse>(`/themes?user_id=${encodeURIComponent(userId)}`)
    console.log("Raw API Response:", response)

    // レスポンスが空の場合はnullを返す（初期化が必要なことを示す）
    if (!response || !response.root || response.root.length === 0) {
      return null
    }


    return response // Return the raw response
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

  // テーマエクスポート用のメソッドを追加
  async exportTheme(themeId: number, data: ExportThemeRequest): Promise<ExportThemeResponse> {
    return this.fetch(`/themes/${themeId}/export`, {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  // テーマパスを更新するメソッドを修正
  async updateThemePath(themeId: number, userId: string, parentThemeId: number | null): Promise<void> {
    // 親がない場合（「すべて」の直下）は特別な値を使用
    const actualParentId = parentThemeId === null ? ROOT_THEME_PARENT_ID : parentThemeId

    return this.fetch(`/themes/${themeId}/path`, {
      method: "PATCH",
      body: JSON.stringify({
        user_id: userId,
        parent_theme_id: actualParentId,
      }),
    })
  }
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined")
}

const themesAPI = new ThemesAPI(API_BASE_URL)
export { themesAPI };

