import type { Article } from "@/types/article";
import type { TreeNode } from "@/types/theme";

// デモ用の記事データ
export const demoArticles: Article[] = [
  {
    article_id: "demo-1",
    title: "Reactの基本的な使い方",
    one_line_summary:
      "Reactの基本的なコンポーネント、props、stateの使い方について解説しています。",
    themes: ["React", 1],
    url: "https://example.com/react-basics",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    last_viewed_at: new Date(
      Date.now() - 2 * 24 * 60 * 60 * 1000
    ).toISOString(),
  },
  {
    article_id: "demo-2",
    title: "Next.jsでのルーティング",
    one_line_summary:
      "Next.jsのApp RouterとPages Routerの違いと使い方について解説しています。",
    themes: ["Next.js", "React", "ルーティング"],
    url: "https://example.com/nextjs-routing",
    created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    last_viewed_at: null,
  },
  {
    article_id: "demo-3",
    title: "TypeScriptの型システム入門",
    one_line_summary: "TypeScriptの基本的な型定義と型推論について学べます。",
    themes: ["TypeScript", "JavaScript"],
    url: "https://example.com/typescript-types",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    last_viewed_at: new Date(
      Date.now() - 1 * 24 * 60 * 60 * 1000
    ).toISOString(),
  },
  {
    article_id: "demo-4",
    title: "CSSフレームワーク比較",
    one_line_summary:
      "TailwindCSS、Bootstrap、Material UIなど主要なCSSフレームワークの比較。",
    themes: ["CSS", "フロントエンド", "UI"],
    url: "https://example.com/css-frameworks",
    created_at: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    last_viewed_at: new Date(
      Date.now() - 5 * 24 * 60 * 60 * 1000
    ).toISOString(),
  },
  {
    article_id: "demo-5",
    title: "Reduxを使った状態管理",
    one_line_summary:
      "ReduxとRedux Toolkitを使ったReactアプリケーションの状態管理について。",
    themes: ["Redux", "React", "状態管理"],
    url: "https://example.com/redux-state-management",
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    last_viewed_at: null,
  },
];

// デモ用のテーマツリーデータ
export const demoThemes: TreeNode[] = [
    {
      id: "1",
      label: "フロントエンド",
      children: [
        {
          id: "React",
          label: "React",
          children: [
            {
              id: "ルーティング",
              label: "ルーティング",
              children: [],
            },
          ],
        },
        {
          id: "CSS",
          label: "CSS",
          children: [
            {
              id: "UI",
              label: "UI",
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: "JavaScript",
      label: "JavaScript",
      children: [
        {
          id: "TypeScript",
          label: "TypeScript",
          children: [],
        },
      ],
    },
    {
      id: "Next.js",
      label: "Next.js",
      children: [],
    },
    {
      id: "状態管理",
      label: "状態管理",
      children: [
        {
          id: "Redux",
          label: "Redux",
          children: [],
        },
      ],
    },
];
