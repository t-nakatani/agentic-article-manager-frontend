import Head from 'next/head'

type MetaTagsProps = {
  title: string
  description: string
  ogImage?: string
  ogUrl?: string
  ogType?: 'website' | 'article'
  twitterCard?: 'summary' | 'summary_large_image'
}

export function MetaTags({
  title,
  description,
  ogImage = 'https://soi-v0.vercel.app/og-image.png',
  ogUrl = 'https://soi-v0.vercel.app',
  ogType = 'website',
  twitterCard = 'summary_large_image'
}: MetaTagsProps) {
  const fullTitle = `${title} | Soi`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:site_name" content="Soi" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="ja_JP" />
      <meta property="og:type" content={ogType} />
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Head>
  )
} 