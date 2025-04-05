import { toast } from "sonner"
import { BaseAPIClient, API_BASE_URL } from "./api/base"
import { filesAPI } from "./api/files"
import type { File } from "./api/files"

class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: unknown,
  ) {
    super(message)
    this.name = "APIError"
  }
}

// APIクライアントクラス
class APIClient {
  files: typeof filesAPI;
  baseClient: BaseAPIClient;

  constructor(baseUrl: string) {
    this.files = filesAPI;
    this.baseClient = new BaseAPIClient(baseUrl);
  }

  // 他のAPIメソッドはbaseClientを使用
  async fetch<T>(path: string, options: RequestInit = {}): Promise<T> {
    return this.baseClient.fetch<T>(path, options);
  }

  // Articles
  async getArticles(userId: string) {
    return this.fetch<Article[]>(`/articles?user_id=${encodeURIComponent(userId)}`, {
      method: "GET",
    })
  }

  // テーマの更新
  async updateThemes(data: ThemeData): Promise<void> {
    return this.fetch("/themes", {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  // APIClient クラス内に deleteArticle メソッドを追加
  async deleteArticle(articleId: string): Promise<void> {
    return this.fetch(`/articles/${encodeURIComponent(articleId)}`, {
      method: "DELETE",
    })
  }

  // Feedback
  async submitFeedback(data: FeedbackData): Promise<void> {
    return this.fetch("/user-feedback", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  // テーマパス更新メソッドを追加
  async updateThemePath(
    themeId: number,
    userId: string,
    parentThemeId: number | null
  ): Promise<void> {
    return this.fetch(`/themes/${themeId}/path`, {
      method: "PATCH",
      body: JSON.stringify({
        user_id: userId,
        parent_theme_id: parentThemeId,
      }),
    })
  }
}

// APIClientのインスタンスを作成してエクスポート
export const apiClient = new APIClient(API_BASE_URL)

// Error handling utility
export async function handleAPIError(error: unknown) {
  console.error("API Error:", error)

  if (error instanceof APIError) {
    toast.error("エラーが発生しました", {
      description: error.message,
    })
  } else {
    toast.error("エラーが発生しました", {
      description: "予期せぬエラーが発生しました。",
    })
  }
}

// Types
export interface Article {
  title: string
  one_line_summary: string
  themes: string[]
  url: string
  created_at: string
  last_viewed_at: string | null
}

export interface ThemeData {
  [key: string]: ThemeData
}

export interface FeedbackData {
  rating: number
  comment: string
}

// 型をエクスポート
export type { File }
export { BaseAPIClient }

