import type { NewsItem } from "@/types/news"

export const newsItems: NewsItem[] = [
  {
    id: "extension-update",
    title: "アルファ版Chrome拡張機能のアップデート",
    date: "2024-03-08",
    tags: ["new", "alpha"],
    descriptions: [
      "アイコンが追加されました",
      "右クリックから記事を保存できるようになりました"
    ],
  },
  {
    id: "alpha-release",
    title: "アルファ版をリリースしました",
    date: "2024-02-27",
    tags: ["new", "alpha"],
    descriptions: [
      "chrome拡張機能から記事を保存できるようになりました",
      "保存した記事がユーザ定義のテーマに自動分類されるようになりました"
    ],
    link: {
      text: "アルファ版を試す",
      url: "/dev",
    },
  },
]

