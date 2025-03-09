import { Layout } from "@/components/layout/Layout"
import { QACard } from "@/components/help/qa-card"
import { getQAData } from "@/lib/help"
import { generateSeoMetadata } from "@/lib/metadata"

export const metadata = generateSeoMetadata({
  title: "ヘルプセンター",
  description: "よくある質問や使い方について説明します",
  image: "https://soi-v0.vercel.app/help-og-image.png"
})

export default function HelpPage() {
  const qaData = getQAData()

  return (
    <Layout>
      <div className="container max-w-4xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">ヘルプセンター</h1>
          <p className="text-muted-foreground mt-2">
            よくある質問や使い方について説明します。お探しの情報が見つからない場合は、フィードバックからお問い合わせください。
          </p>
        </div>

        <div className="grid gap-6">
          {qaData.map((category) => (
            <QACard key={category.id} category={category.title} items={category.items} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

