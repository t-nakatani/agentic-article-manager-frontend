import { BaseAPIClient, API_BASE_URL } from "./base"

export interface TrendArticle {
  trend_article_id: number;
  title: string;
  url: string;
  score: number;
}

export class TrendArticlesAPI extends BaseAPIClient {
  async getTrendArticles(): Promise<TrendArticle[]> {
    return this.fetch<TrendArticle[]>('/trend-articles')
  }
}

// APIインスタンスを作成して export
const trendArticlesAPI = new TrendArticlesAPI(API_BASE_URL)
export default trendArticlesAPI 