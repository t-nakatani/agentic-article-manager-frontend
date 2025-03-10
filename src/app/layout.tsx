import type React from "react"
import { Toaster } from "sonner"
import { ReduxProvider } from "@/components/providers/redux-provider"
import { AuthStateListener } from "@/components/auth/AuthStateListener"
import { generateSeoMetadata } from "@/lib/metadata"
import "./globals.css"

// ルートレイアウトのメタデータを生成
export const metadata = generateSeoMetadata({
  title: "Soi - 記事管理アプリ",
  description: "閲覧したwebページを保存して自動管理するアプリ",
  url: "https://soi-v0.vercel.app",
  image: "https://soi-v0.vercel.app/og-image.png"
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <ReduxProvider>
          <AuthStateListener>
            {children}
            <Toaster />
          </AuthStateListener>
        </ReduxProvider>
      </body>
    </html>
  )
}
