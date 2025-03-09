// 再利用可能なテストデータ
export const fixtures = {
  articles: [
    {
      id: 1,
      title: '記事1',
      content: '記事1の内容',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
    },
    {
      id: 2,
      title: '記事2',
      content: '記事2の内容',
      createdAt: '2023-01-02T00:00:00Z',
      updatedAt: '2023-01-02T00:00:00Z',
    },
  ],
  users: [
    {
      id: 1,
      name: 'ユーザー1',
      email: 'user1@example.com',
    },
    {
      id: 2,
      name: 'ユーザー2',
      email: 'user2@example.com',
    },
  ],
}; 