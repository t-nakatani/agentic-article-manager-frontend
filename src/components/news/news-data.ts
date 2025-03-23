import type { NewsItem } from "@/types/news"

export const newsItems: NewsItem[] = [
  {
    id: "production-release",
    title: "一般公開しました",
    date: "2024-03-24",
    tags: ["new", "beta"],
    descriptions: [
      "アプリケーションを一般公開しました",
      "ユーザ登録後、拡張機能またはiOSショートカットから記事を保存できます",
      "カテゴリを作成することで、記事を自動分類できます"
    ]
  },
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
    // link: {
    //   text: "ショートカットをダウンロード",
    //   url: "/extension#ios-shortcut",
    // },
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
    // link: {
    //   text: "アルファ版を試す",
    //   url: "/extension",
    // },
  },
]

