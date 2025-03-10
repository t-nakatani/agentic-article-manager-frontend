import { toast } from "sonner"

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
const API_BASE_URL = "https://c6d3-2400-2410-8ee4-3900-15cd-b852-6c7-d526.ngrok-free.app"

// if (!API_BASE_URL) {
//   throw new Error("API_BASE_URL is not set")
// }

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

class APIClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async fetch<T>(path: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${path}`
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        mode: "cors",
        credentials: "include",
      })

      if (!response.ok) {
        throw new APIError(`API request failed: ${response.statusText}`, response.status)
      }

      const data = await response.json()
      return data as T
    } catch (error) {
      if (error instanceof APIError) {
        throw error
      }
      throw new APIError(`API request failed: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  // Articles
  async getArticles(userId: string) {
    return this.fetch<Article[]>(`/articles?user_id=${encodeURIComponent(userId)}`, {
      method: "GET",
    })
  }

  // Themes
  async getThemes(): Promise<ThemeData> {
    // モックデータを返す
    return {
      technology: {
        blockchain: {
          Ethereum: {
            L2: {
              Arbitrum: {},
              Optimism: {},
            },
            PoS: {},
            zkEVM: {},
          },
          Bitcoin: {},
          Solana: {},
        },
        AI: {
          "Machine Learning": {},
          "Deep Learning": {},
          NLP: {},
          "Computer Vision": {},
        },
      },
      culture: {
        music: {
          Jazz: {},
          Rock: {},
          Pop: {},
        },
        movie: {
          Action: {},
          Comedy: {},
          Drama: {},
        },
      },
      business: {
        startup: {
          SaaS: {},
          B2B: {},
          B2C: {},
        },
        investment: {
          Stocks: {},
          "Real Estate": {},
          Crypto: {},
        },
      },
    }
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

