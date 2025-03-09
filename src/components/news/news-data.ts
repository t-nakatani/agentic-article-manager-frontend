import type { NewsItem } from "@/types/news"

export const newsItems: NewsItem[] = [
  {
    id: "ios-shortcut&extension-update",
    title: "iOSショートカットの公開&拡張機能Update",
    date: "2024-03-08",
    tags: ["new", "alpha"],
    descriptions: [
      "iPhoneの共有機能から記事を保存できるショートカットを公開しました",
      "拡張機能にアイコンが追加されました",
      "右クリックから拡張機能で記事を保存できるようになりました"
    ],
    link: {
      text: "ショートカットをダウンロード",
      url: "/extension#ios-shortcut",
    },
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
      url: "/extension",
    },
  },
]

