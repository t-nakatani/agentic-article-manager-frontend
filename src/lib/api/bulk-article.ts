import { BaseAPIClient } from "./base"

class BulkArticleAPI extends BaseAPIClient {
  async exportArticlesAsMd(userId: string, articleIds: string[]) {
    return this.fetch('/bulk-articles/export', {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, article_ids: articleIds }),
    })
  }
}

const API_BASE_URL = "https://knowledge-pholio.ngrok.dev"
const bulkArticleAPI = new BulkArticleAPI(API_BASE_URL)

export default bulkArticleAPI
