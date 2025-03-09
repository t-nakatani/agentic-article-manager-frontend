import type React from "react"
import { Toaster } from "@/components/ui/toaster"
import { ReduxProvider } from "@/components/providers/redux-provider"
import { AuthStateListener } from "@/components/auth/AuthStateListener"
import "./globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Soi - 記事管理アプリ</title>
        <meta name="description" content="閲覧したwebページを保存して自動管理するアプリ" />
        <meta property="og:title" content="Soi - 記事管理アプリ" />
        <meta property="og:description" content="閲覧したwebページを保存して自動管理するアプリ" />
        <meta property="og:url" content="https://soi-v0.vercel.app" />
        <meta property="og:site_name" content="Soi" />
        <meta property="og:image" content="https://soi-v0.vercel.app/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Soi - 記事管理アプリ" />
        <meta name="twitter:description" content="閲覧したwebページを保存して自動管理するアプリ" />
        <meta name="twitter:image" content="https://soi-v0.vercel.app/og-image.png" />
      </head>
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



import './globals.css'

export const metadata = {
  title: {
    default: "Soi - 記事管理アプリ",
    template: "%s | Soi"
  },
  description: "ブラウザで読んだ記事を簡単に保存・管理できるアプリ",
  openGraph: {
    title: "Soi - 記事管理アプリ",
    description: "ブラウザで読んだ記事を簡単に保存・管理できるアプリ",
    url: "https://your-domain.com",
    siteName: "Soi",
    images: [
      {
        url: "https://your-domain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Soi - 記事管理アプリ"
      }
    ],
    locale: "ja_JP",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Soi - 記事管理アプリ",
    description: "ブラウザで読んだ記事を簡単に保存・管理できるアプリ",
    images: ["https://your-domain.com/og-image.jpg"]
  }
}
