export async function generateMetadata({ params }: { params: { slug: string } }) {
  // 記事データを取得
  const article = await getArticleBySlug(params.slug)
  
  return {
    title: article.title,
    description: article.summary || "記事の詳細",
    openGraph: {
      title: article.title,
      description: article.summary || "記事の詳細",
      images: [
        {
          url: article.image || "https://your-domain.com/default-article-image.jpg",
          width: 1200,
          height: 630,
          alt: article.title
        }
      ],
      type: "article",
      publishedTime: article.created_at
    }
  }
}