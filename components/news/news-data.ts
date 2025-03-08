import type { NewsItem } from "@/types/news"

export const newsItems: NewsItem[] = [
  {
    id: "alpha-release",
    title: "アルファ版をリリースしました",
    date: "2024-02-27",
    tags: ["new", "alpha"],
    description: "テーマの階層管理機能やトピック要約機能を試すことができます。",
    link: {
      text: "アルファ版を試す",
      url: "/dev",
    },
  },
  {
    id: "extension-update",
    title: "Chrome拡張機能のアップデート",
    date: "2024-02-26",
    tags: ["new"],
    description: "記事の取り込み機能が改善されました。",
  },
]

