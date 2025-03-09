import { Metadata } from 'next'

type GenerateMetadataParams = {
  title: string
  description: string
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
  url?: string
}

export function generateSeoMetadata({
  title,
  description,
  image = 'https://soi-v0.vercel.app/og-image.png',
  type = 'website',
  publishedTime,
  url = 'https://soi-v0.vercel.app'
}: GenerateMetadataParams): Metadata {
  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Soi',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      locale: 'ja_JP',
      type
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image]
    }
  }

  // 記事タイプの場合は公開日時を追加
  if (type === 'article' && publishedTime) {
    metadata.openGraph = {
      ...metadata.openGraph,
      publishedTime
    }
  }

  return metadata
} 