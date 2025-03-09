import { generateSeoMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  // 記事データを取得
  const article = await getArticleBySlug(params.slug)
  
  return generateSeoMetadata({
    title: article.title,
    description: article.summary || '記事の詳細',
    image: article.image || 'https://soi-v0.vercel.app/default-article-image.png',
    type: 'article',
    publishedTime: article.created_at
  })
}