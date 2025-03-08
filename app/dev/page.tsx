import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, CheckCircle2 } from "lucide-react"
import { Steps } from "./components/steps"
import Link from "next/link"

// 環境変数からURLを取得、未設定の場合はデフォルト値を使用
const EXTENSION_URL = process.env.NEXT_PUBLIC_EXTENSION_URL || "https://example.com/extension-not-found.zip"

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

// セクションコンポーネント
const Section = ({ title, description, children, className = "" }) => (
  <section className={`space-y-6 ${className}`}>
    {(title || description) && (
      <div>
        {title && <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>}
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>
    )}
    {children}
  </section>
)

// 機能カードコンポーネント
const FeatureCard = ({ title, description, icon: Icon }) => (
  <Card>
    <CardContent className="pt-6">
      <Icon className="h-8 w-8 mb-3 text-theme-600" />
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
)

// ステップガイドコンポーネント - ステップを囲むコンテナ
const StepGuide = ({ children }) => (
  <div className="border border-border rounded-lg p-6 bg-card/50">
    {children}
  </div>
)

export default function DevTools() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-theme-50/50 to-white dark:from-theme-950/50 dark:to-theme-900/50">
      <div className="container max-w-4xl py-8 space-y-8">
        {/* ヒーローセクション */}
        <Section className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Chrome拡張機能 α版</h1>
          <p className="text-xl text-muted-foreground">ブラウザで読んだ記事を簡単に保存・管理できます</p>
          <div className="pt-4">
            {EXTENSION_URL === "https://example.com/extension-not-found.zip" ? (
              <div className="text-sm text-destructive">
                Extension URL is not configured. Please set NEXT_PUBLIC_EXTENSION_URL environment variable.
              </div>
            ) : (
              <Button asChild size="lg" className="gap-2">
                <a href={EXTENSION_URL} download="extension.zip">
                  <Download className="h-5 w-5" />
                  拡張機能をダウンロード
                </a>
              </Button>
            )}
          </div>
        </Section>

        {/* 機能紹介 */}
        <Section>
          <div className="grid gap-4 sm:grid-cols-3">
            {features.map((feature, i) => (
              <FeatureCard key={i} {...feature} />
            ))}
          </div>
        </Section>

        {/* インストール手順 */}
        <Section 
          title="インストール手順" 
          description={
            <div className="space-y-2">
              <p>Chrome拡張機能をインストールして、すぐに使い始めることができます。</p>
              <p>
                インストール後は
                <Link href="/help#extension" className="text-theme-600 dark:text-theme-400 hover:underline mx-1">
                  User IDの設定
                </Link>
                が必要です。
              </p>
            </div>
          }
        >
          <StepGuide>
            <Steps steps={installSteps} />
          </StepGuide>
        </Section>

        {/* 使い方 */}
        <Section 
          title="基本的な使い方" 
          description="シンプルな3ステップで記事を保存できます。"
        >
          <StepGuide>
            <Steps steps={usageSteps} />
          </StepGuide>
        </Section>
      </div>
    </div>
  )
}

