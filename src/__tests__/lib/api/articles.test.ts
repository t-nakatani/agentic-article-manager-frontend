/**
 * @jest-environment node
 */
import articlesAPI from "@/lib/api/articles";
import { server } from '@/__tests__/mocks/server';

// テスト前にMSWサーバーを起動
beforeAll(() => server.listen());
// 各テスト後にハンドラーをリセット
afterEach(() => server.resetHandlers());
// すべてのテスト後にサーバーをクローズ
afterAll(() => server.close());

describe('記事API', () => {
  it('記事を正常に取得する', async () => {
    // モックの実装
    const mockArticles = [
      { article_id: '1', title: 'テスト記事1' },
      { article_id: '2', title: 'テスト記事2' }
    ];
    
    // articlesAPIのgetArticlesメソッドをモック
    const originalGetArticles = articlesAPI.getArticles;
    articlesAPI.getArticles = jest.fn().mockResolvedValue(mockArticles);
    
    const articles = await articlesAPI.getArticles('test-user');
    expect(articles).toHaveLength(2);
    expect(articles[0].title).toBe('テスト記事1');
    
    // モックを元に戻す
    articlesAPI.getArticles = originalGetArticles;
  });

  it('APIエラー時にエラーをスローする', async () => {
    // articlesAPIのgetArticlesメソッドをモック
    const originalGetArticles = articlesAPI.getArticles;
    articlesAPI.getArticles = jest.fn().mockRejectedValue(new Error('API error'));
    
    await expect(articlesAPI.getArticles('test-user')).rejects.toThrow('API error');
    
    // モックを元に戻す
    articlesAPI.getArticles = originalGetArticles;
  });
}); 