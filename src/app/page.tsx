// Replace the content with a proper client component setup
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ClientPageWrapper } from "@/components/providers/client-page-wrapper"
import { ArticleReaderContent } from "@/components/article-reader-content"

export default function ArticleReaderPage() {
  return (
    <ClientPageWrapper>
      <SpeedInsights/>
      <ArticleReaderContent />
    </ClientPageWrapper>
  )
}

