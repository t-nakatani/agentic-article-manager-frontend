import type React from "react"
import { Toaster } from "sonner"
import { ReduxProvider } from "@/components/providers/redux-provider"
import { AuthStateListener } from "@/components/auth/AuthStateListener"
import { generateSeoMetadata } from "@/lib/metadata"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"

const title = "Soi - あなたが読んだ記事はAIが管理"
const description = "閲覧したwebページを1-clickで保存 / 自動整理しましょう"
const url = "https://soi-v0.vercel.app"
const imagePath = "https://soi-v0.vercel.app/og-image.png"

// ルートレイアウトのメタデータを生成
export const metadata = {
  ...generateSeoMetadata({
    title: title,
    description: description,
    url: url,
    image: imagePath
  }),
  icons: {
    icon: '/favicon.ico',
  },
  // Twitter/X用のカードメタデータを追加
  twitter: {
    card: 'summary_large_image',
    title: title,
    description: description,
    creator: '@your_twitter_handle', // あなたのTwitterハンドルに変更してください
    images: [imagePath],
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <ReduxProvider>
          <AuthStateListener>
            {children}
            <Toaster />
            <SpeedInsights />
            <Analytics />
          </AuthStateListener>
        </ReduxProvider>
      </body>
    </html>
  )
}
