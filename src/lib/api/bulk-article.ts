import { BaseAPIClient } from "./base"

class BulkArticleAPI extends BaseAPIClient {
  async exportArticlesAsMd(userId: string, articleIds: string[]) {
    return this.fetch('/bulk-articles/export', {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, article_ids: articleIds }),
    })
  }

  async shareArticles(userId: string, articleIds: string[], shareTitle: string = "共有コレクション") {
    return this.fetch<{ status: string; share_id: string }>('/articles/shared', {
      method: 'POST',
      body: JSON.stringify({ 
        user_id: userId, 
        share_title: shareTitle,
        article_ids: articleIds 
      }),
    })
  }
  
  // ユーザーの共有一覧を取得
  async getUserShares(userId: string) {
    return this.fetch<Array<{ share_id: string; share_title: string }>>(
      `/articles/shared/?user_id=${encodeURIComponent(userId)}`,
      { method: 'GET' }
    )
  }
  
  // 特定の共有記事セットを取得
  async getSharedArticles(shareId: string) {
    return this.fetch<{
      share_id: string;
      share_title: string;
      shared_articles: Array<{
        title: string;
        url: string;
        one_line_summary: string;
      }>;
    }>(`/articles/shared/${shareId}`, { method: 'GET' })
  }
}

const API_BASE_URL = "https://knowledge-pholio.ngrok.dev"
const bulkArticleAPI = new BulkArticleAPI(API_BASE_URL)

export { bulkArticleAPI };
