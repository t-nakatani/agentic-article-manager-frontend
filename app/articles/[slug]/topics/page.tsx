import type { Article } from "@/lib/types/article"
import { TopicVisualization } from "@/components/topics/TopicVisualization"

interface PageProps {
  params: {
    slug: string
  }
}

// 記事メタデータのサンプル
const article: Article = {
  slug: "info-finance",
  title: "インフォファイナンス：予測市場を超えて",
  date: "2024-02-24",
  readingTime: "8分",
  article_id: "info-finance",
  created_at: "2024-02-24T12:00:00Z",
  last_viewed_at: "2024-02-24T15:00:00Z",
  background_knowledge: [],
  insight: [],
}

export default function Page({ params }: PageProps) {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <header className="border-b bg-gradient-to-b from-background to-background/80 backdrop-blur-sm sticky top-0 z-20 pb-4 pt-6">
          <div className="container max-w-7xl">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">{article.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <time dateTime={article.date}>{article.date}</time>
              <span>·</span>
              <span>{article.readingTime}で読める</span>
            </div>
          </div>
        </header>

        <div className="border-b bg-gradient-to-b from-muted/50">
          <TopicVisualization articleId={params.slug} />
        </div>
      </main>
    </div>
  )
}

