import type { Article } from "@/lib/api"

// ダミーデータの生成用ヘルパー関数
function generateRandomDate(start: Date, end: Date): string {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString()
}

// 最近の日付範囲を設定
const now = new Date()
const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate())

// モックデータ
export const mockArticles: Article[] = [
  {
    title: "How is it going? : r/SaaS",
    one_line_summary:
      "A discussion among solo founders sharing their challenges, wins, and experiences in building their SaaS products.",
    themes: ["business", "technology", "culture"],
    url: "https://www.reddit.com/r/SaaS/comments/1ako9xl/for_solo_founders_how_is_it_going/",
    registeredAt: generateRandomDate(threeMonthsAgo, now),
    lastViewedAt: generateRandomDate(threeMonthsAgo, now),
  },
  {
    title: "【crxjs/vite-plugin】chrome-extensionとReactの速攻開発設定",
    one_line_summary: "Reactを使用したChrome拡張機能の迅速な開発を可能にする設定手順を紹介します。",
    themes: ["business", "technology"],
    url: "https://qiita.com/tonakai_it/items/b7637e7b9e52995c7cdf",
    registeredAt: generateRandomDate(threeMonthsAgo, now),
    lastViewedAt: null,
  },
  {
    title: "zkTLSプロトコルを使用したアプリケーション開発【zkPass編】",
    one_line_summary: "zkTLSプロトコルを用いたzkPassのアプリケーション開発に関する詳細な手順と設定方法を解説します。",
    themes: ["technology", "blockchain", "web3", "defi"],
    url: "https://www.pontech.dev/post/zktls-app-dev-zkpass",
    registeredAt: generateRandomDate(threeMonthsAgo, now),
    lastViewedAt: generateRandomDate(threeMonthsAgo, now),
  },
  {
    title: "『Notebook LM』がパワーアップ！新機能と新プランを徹底解説｜AI-Bridge Lab",
    one_line_summary: "Googleの「NotebookLM」に新機能とプランが追加され、情報整理や管理がさらに効率的に。",
    themes: ["business", "technology", "science"],
    url: "https://note.com/doerstokyo_kb/n/na903e13f33ed",
    registeredAt: generateRandomDate(threeMonthsAgo, now),
    lastViewedAt: generateRandomDate(threeMonthsAgo, now),
  },
  {
    title: "【技術】TEE（Trusted Execution Environment）とは？",
    one_line_summary:
      "Trusted Execution Environment (TEE) is a secure area within a main processor that ensures data confidentiality and integrity, allowing applications to run in isolation from the operating system and other applications.",
    themes: ["technology", "other"],
    url: "https://acompany.tech/privacytechlab/trusted-execution-environment/",
    registeredAt: generateRandomDate(threeMonthsAgo, now),
    lastViewedAt: null,
  },
  {
    title: "AI Agent x Cryptoの解釈",
    one_line_summary: "AIエージェントと暗号通貨の融合がもたらす利点と課題を探る記事。",
    themes: ["business", "technology", "crypto"],
    url: "https://paragraph.xyz/@zkether.eth/aiagentcrypto",
    registeredAt: generateRandomDate(threeMonthsAgo, now),
    lastViewedAt: generateRandomDate(threeMonthsAgo, now),
  },
  {
    title: "Supabaseのデータベースを使うときに役立つ情報",
    one_line_summary: "Supabaseのデータベース利用に関する詳細情報と実践的なテクニックを紹介した記事",
    themes: ["business", "technology", "web3", "defi", "ai"],
    url: "https://qiita.com/kabochapo/items/26b1bb753116a6904664",
    registeredAt: generateRandomDate(threeMonthsAgo, now),
    lastViewedAt: generateRandomDate(threeMonthsAgo, now),
  },
  {
    title: "ChatGPTの領収書・請求書発行方法【OpenAI】",
    one_line_summary: "Learn how to generate invoices and receipts for ChatGPT with a step-by-step guide.",
    themes: ["business", "technology"],
    url: "https://qiita.com/nokonokonoko/items/164cb8eb4c86cdb8261d",
    registeredAt: generateRandomDate(threeMonthsAgo, now),
    lastViewedAt: null,
  },
  {
    title: "bolt.new",
    one_line_summary:
      "Bolt.new is a platform for building, running, editing, and deploying full-stack web and mobile apps.",
    themes: ["technology"],
    url: "https://bolt.new/",
    registeredAt: generateRandomDate(threeMonthsAgo, now),
    lastViewedAt: generateRandomDate(threeMonthsAgo, now),
  },
  {
    title: "中級者へステップアップ!!キホンの3枚 複合系 4選[三人麻雀戦術][初心者向け]",
    one_line_summary:
      "The article explains the basic three-tile combinations in Mahjong and introduces four advanced forms to help beginners improve in three-player Mahjong.",
    themes: ["culture", "other"],
    url: "https://note.com/neko_takumin/n/n131271d9e1ce",
    registeredAt: generateRandomDate(threeMonthsAgo, now),
    lastViewedAt: generateRandomDate(threeMonthsAgo, now),
  },
  {
    title: "Attention Required! | Cloudflare",
    one_line_summary:
      "The website is blocked by a security service due to a triggered security solution, advising users to contact the site owner for resolution.",
    themes: ["technology", "other"],
    url: "https://glasp.co/",
    registeredAt: generateRandomDate(threeMonthsAgo, now),
    lastViewedAt: null,
  },
  {
    title: "Notion – The all-in-one workspace for your notes, tasks, wikis, and databases.",
    one_line_summary:
      "Explore the versatile Notion workspace, designed for managing notes, tasks, wikis, and databases efficiently.",
    themes: ["business", "technology"],
    url: "https://furtive-newt-212.notion.site/caab10edd2784c33b844dda6998fbf3e?v=dbe2cb64078f404d84ec2ef60e10544d",
    registeredAt: generateRandomDate(threeMonthsAgo, now),
    lastViewedAt: generateRandomDate(threeMonthsAgo, now),
  },
  {
    title: "Sonner - An Opinionated Toast Component for React",
    one_line_summary:
      "Sonner is a customized toast component designed for seamless integration with React applications, offering a straightforward installation and usage process.",
    themes: ["technology"],
    url: "https://ui.shadcn.com/docs/components/sonner",
    registeredAt: generateRandomDate(threeMonthsAgo, now),
    lastViewedAt: generateRandomDate(threeMonthsAgo, now),
  },
  {
    title: "Table",
    one_line_summary:
      "An overview of the responsive table component in shadcn/ui, including installation, usage, and advanced data table features.",
    themes: ["technology", "web3"],
    url: "https://ui.shadcn.com/docs/components/table",
    registeredAt: generateRandomDate(threeMonthsAgo, now),
    lastViewedAt: null,
  },
  {
    title: "Tooltip",
    one_line_summary: "An overview of the Tooltip component with installation and usage instructions.",
    themes: ["technology"],
    url: "https://ui.shadcn.com/docs/components/tooltip",
    registeredAt: generateRandomDate(threeMonthsAgo, now),
    lastViewedAt: generateRandomDate(threeMonthsAgo, now),
  },
  {
    title: "Skeleton - shadcn/ui Component",
    one_line_summary:
      "The Skeleton component in shadcn/ui serves as a placeholder while content is loading, enhancing user experience during data fetching.",
    themes: ["technology", "web3"],
    url: "https://ui.shadcn.com/docs/components/skeleton",
    registeredAt: generateRandomDate(threeMonthsAgo, now),
    lastViewedAt: generateRandomDate(threeMonthsAgo, now),
  },
  {
    title: "Separator",
    one_line_summary: "The Separator component visually or semantically separates content.",
    themes: ["business", "technology"],
    url: "https://ui.shadcn.com/docs/components/separator",
    registeredAt: generateRandomDate(threeMonthsAgo, now),
    lastViewedAt: null,
  },
  {
    title: "Menubar - shadcn/ui",
    one_line_summary:
      "A visually persistent menu component that provides quick access to a set of commands, common in desktop applications.",
    themes: ["technology"],
    url: "https://ui.shadcn.com/docs/components/menubar",
    registeredAt: generateRandomDate(threeMonthsAgo, now),
    lastViewedAt: generateRandomDate(threeMonthsAgo, now),
  },
  {
    title: "Combobox",
    one_line_summary:
      "An autocomplete input and command palette component with a list of suggestions, built by composing <Popover /> and <Command /> components.",
    themes: ["technology"],
    url: "https://ui.shadcn.com/docs/components/combobox",
    registeredAt: generateRandomDate(threeMonthsAgo, now),
    lastViewedAt: generateRandomDate(threeMonthsAgo, now),
  },
  {
    title: "Dashboard",
    one_line_summary:
      "This dashboard page allows users to sign in using their Vercel account or sign up for a new account.",
    themes: ["business", "technology"],
    url: "https://v0.dev/chat/tree-structure-themes-2p77FKj9fb8",
    registeredAt: generateRandomDate(threeMonthsAgo, now),
    lastViewedAt: null,
  },
  {
    title: "Chrome 拡張機能からのユーザーのログイン",
    one_line_summary: "このドキュメントは、Chrome 拡張機能にユーザーをログインさせるための方法を解説します。",
    themes: ["technology", "web3"],
    url: "https://cloud.google.com/identity-platform/docs/web/chrome-extension?hl=ja",
    registeredAt: generateRandomDate(threeMonthsAgo, now),
    lastViewedAt: generateRandomDate(threeMonthsAgo, now),
  },
]

