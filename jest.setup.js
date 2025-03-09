// jest-dom拡張機能を追加
require('@testing-library/jest-dom');

// セレクターモジュールをモック
jest.mock('@/lib/redux/features/articles/selectors', () => ({
  selectArticles: jest.fn((state) => state.articles.items),
  // 他の必要なセレクターもモック
}));

// グローバルなモックやセットアップをここに記述 