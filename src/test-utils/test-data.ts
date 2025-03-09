// 記事データを生成するファクトリー関数
export function createArticle(overrides = {}) {
  return {
    id: Math.floor(Math.random() * 10000),
    title: 'テスト記事タイトル',
    content: 'テスト記事の内容です。',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

// 記事リストを生成する関数
export function createArticleList(count = 3, overrides = {}) {
  return Array.from({ length: count }, (_, index) => 
    createArticle({ id: index + 1, ...overrides })
  );
}

// ユーザーデータを生成するファクトリー関数
export function createUser(overrides = {}) {
  return {
    id: Math.floor(Math.random() * 10000),
    name: 'テストユーザー',
    email: 'test@example.com',
    ...overrides,
  };
}

// 他のテストデータ生成関数を追加 