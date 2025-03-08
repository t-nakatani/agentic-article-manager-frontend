import type { TreeNode } from "@/types/theme"
import type { Article } from "@/lib/api/articles"

// デモ用のテーマデータ
export const demoThemes: TreeNode[] = [
  {
    id: "all",
    label: "すべて",
    children: [
      {
        id: "technology",
        label: "technology",
        children: [
          { id: "blockchain", label: "blockchain", children: [] },
          { id: "web3", label: "web3", children: [] },
          { id: "ai", label: "ai", children: [] },
        ],
      },
      {
        id: "business",
        label: "business",
        children: [],
      },
      {
        id: "culture",
        label: "culture",
        children: [],
      },
      {
        id: "other",
        label: "other",
        children: [],
      },
    ],
  },
]

// デモ用の記事データを生成
export function createDemoArticles(mockArticles: any[]): Article[] {
  return mockArticles.map((article, index) => ({
    article_id: `demo-${index}`,
    title: article.title,
    one_line_summary: article.one_line_summary,
    themes: article.themes,
    url: article.url,
    created_at: article.registeredAt,
    last_viewed_at: article.lastViewedAt,
  }))
}

