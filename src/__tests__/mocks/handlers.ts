import { http, HttpResponse } from 'msw';

// APIエンドポイントのモックハンドラーを定義
export const handlers = [
  http.get('/api/articles', () => {
    return HttpResponse.json({
      articles: [
        { article_id: '1', title: 'テスト記事1', content: 'テスト内容1' },
        { article_id: '2', title: 'テスト記事2', content: 'テスト内容2' },
      ]
    });
  }),
  
  // 他のAPIエンドポイントのモックを追加
]; 