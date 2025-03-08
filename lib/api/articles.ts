import { BaseAPIClient } from "./base"

export interface Article {
  article_id: string
  title: string
  one_line_summary: string
  themes: string[]
  url: string
  created_at: string
  last_viewed_at: string | null
}

interface RegenerateArticleRequest {
  user_id: string
  url: string
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
}

const API_BASE_URL = "https://knowledge-pholio.ngrok.dev"
const articlesAPI = new ArticlesAPI(API_BASE_URL)
export default articlesAPI

