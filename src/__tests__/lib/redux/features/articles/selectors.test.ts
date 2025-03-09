import { selectArticles } from '@/lib/redux/features/articles/selectors';
import { RootState } from '@/lib/redux/store';
import type { Article } from '@/lib/api/articles';

describe('記事セレクター', () => {
  it('記事リストを正しく選択する', () => {
    // 実際のArticle型に合わせたモックデータ
    const mockArticles: Article[] = [
      {
        article_id: '1',
        title: '記事1',
        one_line_summary: 'テスト記事1の概要',
        themes: ['テーマ1'],
        url: 'https://example.com/1',
        created_at: '2023-01-01T00:00:00Z',
        last_viewed_at: null,
        is_favorite: false
      },
      {
        article_id: '2',
        title: '記事2',
        one_line_summary: 'テスト記事2の概要',
        themes: ['テーマ2'],
        url: 'https://example.com/2',
        created_at: '2023-01-02T00:00:00Z',
        last_viewed_at: '2023-01-03T00:00:00Z',
        is_favorite: true
      }
    ];

    // モックのRootStateを作成
    const mockState = {
      articles: {
        items: mockArticles,
        status: 'idle',
        error: null
      },
      // 他の必要なステートプロパティ
      articleFilters: { 
        selectedTheme: 'all',
        sortField: 'title',
        sortDirection: 'asc',
        searchQuery: '',
        currentPage: 1,
        pageSize: 10,
        showFavorites: false
      },
      themes: {
        nodes: [],
        edges: []
      },
      auth: {
        user: null,
        status: 'idle',
        error: null
      }
    } as unknown as RootState;
    
    const result = selectArticles(mockState);
    expect(result).toEqual(mockArticles);
  });
}); 