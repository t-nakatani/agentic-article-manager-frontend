import { Button } from "@/components/ui/button"
import { Download, CheckCircle2, Apple, Chrome } from "lucide-react"
import { Header } from "@/components/layout/Header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Section } from "./components/section"
import { FeatureCard } from "./components/feature-card"
import { ChromeTab } from "./components/chrome-tab"
import { IOSTab } from "./components/ios-tab"
import { generateSeoMetadata } from '@/lib/metadata'
import Image from "next/image"

// 環境変数からURLを取得、未設定の場合はデフォルト値を使用
const EXTENSION_URL = process.env.NEXT_PUBLIC_EXTENSION_URL || "https://example.com/extension-not-found.zip"
const IOS_SHORTCUT_URL = "https://vhxqoytfgyfunjxzoqvi.supabase.co/storage/v1/object/public/extension//soi-save.shortcut"

// インストール手順のデータ
const installSteps = [
  {
    title: "拡張機能をダウンロード",
    description: "上部のボタンから最新版の拡張機能をダウンロードします。",
  },
  {
    title: "Chromeに追加",
    description: "chrome://extensions を開き、「パッケージ化されていない拡張機能を読み込む」を選択します。",
  },
  {
    title: "フォルダを選択",
    description: "ダウンロードした拡張機能のフォルダを選択します。",
  },
]

// iOSショートカットのインストール手順
const iosShortcutSteps = [
  {
    title: "ショートカットをダウンロード",
    description: "上部のボタンからiOSショートカットをダウンロードします。",
  },
  {
    title: "「ショートカット」アプリで開く",
    description: "ダウンロードしたファイルを「ショートカット」アプリで開きます。",
  },
  {
    title: "「ショートカットを追加」をタップ",
    description: "確認画面で「ショートカットを追加」をタップして完了します。",
  },
]

// iOSショートカットの使い方
const iosUsageSteps = [
  {
    title: "記事を開く",
    description: "Safariで任意の記事ページを開きます。",
  },
  {
    title: "共有メニューを開く",
    description: "画面下部の共有ボタンをタップします。",
  },
  {
    title: "「Save to Soi」を選択",
    description: "共有メニューから「Save to Soi」を選択して記事を保存できます。",
  },
]

const usageSteps = [
  {
    title: "記事を開く",
    description: "ブラウザで任意の記事ページを開きます。",
  },
  {
    title: "拡張機能を起動",
    description: "ツールバーの拡張機能アイコンをクリックします。",
  },
  {
    title: "記事を保存",
    description: "「保存」ボタンをクリックすると、自動的に記事が解析され保存されます。",
  },
]

// 機能紹介データ
const features = [
  {
    title: "簡単保存",
    description: "ワンクリックで記事を保存できます。URLと概要が自動で取得されます。",
    icon: CheckCircle2,
  },
  {
    title: "自動タグ付け",
    description: "AIが記事の内容を解析し、適切なテーマタグを自動で付与します。",
    icon: CheckCircle2,
  },
  {
    title: "要約生成",
    description: "記事の要点を自動で抽出し、簡潔な要約を生成します。",
    icon: CheckCircle2,
  },
]

export const metadata = generateSeoMetadata({
  title: '拡張機能 α版',
  description: 'ブラウザで読んだ記事を簡単に保存・管理できる拡張機能',
  image: 'https://soi-v0.vercel.app/extension-og-image.png'
})

export default function ExtensionPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-theme-50/50 to-white dark:from-theme-950/50 dark:to-theme-900/50">
        <div className="container max-w-4xl py-8 space-y-8">
          {/* ヒーローセクション */}
          <Section className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">拡張機能 α版</h1>
            <p className="text-xl text-muted-foreground">ブラウザで読んだ記事を簡単に保存・管理できます</p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              {EXTENSION_URL === "https://example.com/extension-not-found.zip" ? (
                <div className="text-sm text-destructive">
                  Extension URL is not configured. Please set NEXT_PUBLIC_EXTENSION_URL environment variable.
                </div>
              ) : (
                <Button asChild size="lg" className="gap-2">
                  <a href={EXTENSION_URL} download="extension.zip" target="_blank" rel="noopener noreferrer">
                    <Download className="h-5 w-5" />
                    拡張機能をダウンロード
                  </a>
                </Button>
              )}
              <Button asChild size="lg" className="gap-2 bg-black hover:bg-gray-800 text-white">
                <a href={IOS_SHORTCUT_URL} download="soi-save-shortcut.shortcut">
                  <Apple className="h-5 w-5" />
                  iOSショートカットをダウンロード
                </a>
              </Button>
            </div>
          </Section>

          {/* スクリーンショット画像 */}
          <Section title="アプリケーションのプレビュー" description="各プラットフォーム向けの拡張機能のスクリーンショットです。">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="relative aspect-[2/1] overflow-hidden rounded-lg border shadow-sm">
                  <Image 
                    src="/chrome-extension.png" 
                    alt="Chrome拡張機能のスクリーンショット" 
                    fill
                    className="object-cover"
                    sizes="(max-width: 600px) 100vw, 50vw"
                  />
                </div>
                <p className="text-sm text-center text-muted-foreground">Chrome拡張機能</p>
              </div>
              <div className="space-y-2">
                <div className="relative aspect-[2/1] overflow-hidden rounded-lg border shadow-sm">
                  <Image 
                    src="/ios-shortcut.png" 
                    alt="iOSショートカットのスクリーンショット" 
                    fill
                    className="object-cover"
                    sizes="(max-width: 600px) 100vw, 50vw"
                  />
                </div>
                <p className="text-sm text-center text-muted-foreground">iOSショートカット</p>
              </div>
            </div>
          </Section>

          {/* 機能紹介 */}
          {/* <Section>
            <div className="grid gap-4 sm:grid-cols-3">
              {features.map((feature, i) => (
                <FeatureCard key={i} {...feature} />
              ))}
            </div>
          </Section> */}

          {/* タブ切り替え */}
          <Section title="インストールと使い方" description="お使いの環境に合わせて手順をご確認ください。">
            <Tabs defaultValue="chrome" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="chrome" className="flex items-center gap-2">
                  <Chrome className="h-4 w-4" />
                  <span>Chrome拡張機能</span>
                </TabsTrigger>
                <TabsTrigger value="ios" className="flex items-center gap-2">
                  <Apple className="h-4 w-4" />
                  <span>iOSショートカット</span>
                </TabsTrigger>
              </TabsList>
              
              {/* Chrome拡張機能のコンテンツ */}
              <TabsContent value="chrome">
                <ChromeTab installSteps={installSteps} usageSteps={usageSteps} />
              </TabsContent>
              
              {/* iOSショートカットのコンテンツ */}
              <TabsContent value="ios">
                <IOSTab installSteps={iosShortcutSteps} usageSteps={iosUsageSteps} />
              </TabsContent>
            </Tabs>
          </Section>
        </div>
      </div>
    </>
  )
} 