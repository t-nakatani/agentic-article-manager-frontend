import { BaseAPIClient } from "./base"

export interface Article {
  article_id: string
  title: string
  one_line_summary: string
  themes: string[]
  url: string
  is_favorite: boolean
  read_later: boolean
  created_at: string
  last_viewed_at: string | null
  memo?: string
}

interface RegenerateArticleRequest {
  user_id: string
  url: string
}

export class TrendArticlesAPI extends BaseAPIClient {
  async getTrendArticles(userId: string): Promise<{ articles: Article[] }> {
    return this.fetch<{ articles: Article[] }>(`/trend-articles?user_id=${encodeURIComponent(userId)}`)
  }
}

class ArticlesAPI extends BaseAPIClient {
  async getArticles(userId: string): Promise<Article[]> {
    return this.fetch<Article[]>(`/articles?user_id=${encodeURIComponent(userId)}`)
  }

  async deleteArticle(articleId: string): Promise<void> {
    return this.fetch(`/articles/${encodeURIComponent(articleId)}`, {
      method: "DELETE",
    })
  }

  // 記事再生成用のメソッドを追加
  async regenerateArticle(articleId: string, data: RegenerateArticleRequest): Promise<void> {
    return this.fetch(`/articles/${articleId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async toggleFavorite(articleId: string, data: { user_id: string; is_favorite: boolean }): Promise<void> {
    return this.fetch(`/articles/${articleId}/favorite`, {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async toggleReadLater(articleId: string, data: { user_id: string; read_later: boolean }): Promise<void> {
    return this.fetch(`/articles/${articleId}/read-later`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  // メモを保存するAPIメソッド
  async saveMemo(articleId: string, data: { user_id: string; memo: string }) {
    const response = await fetch(`${API_BASE_URL}/articles/${articleId}/memo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Error saving memo: ${response.statusText}`)
    }

    return await response.json()
  }

  // 記事の閲覧を記録する
  async recordArticleView(articleId: string, userId: string) {
    return this.fetch(`/articles/${articleId}/view`, {
      method: 'POST',
      body: JSON.stringify({ user_id: userId }),
    })
  }
}

const API_BASE_URL = "https://knowledge-pholio.ngrok.dev"
const articlesAPI = new ArticlesAPI(API_BASE_URL)
const trendArticlesAPI = new TrendArticlesAPI(API_BASE_URL)

export { trendArticlesAPI }
export default articlesAPI

