export interface ContentLevel {
  title: string
  summary: string[]
  related_original_text: string
}

export interface Article {
  slug: string
  title: string
  date: string
  readingTime: string
  background_knowledge: ContentLevel[]
  insight: ContentLevel[]
  created_at: string
  last_viewed_at: string | null
  article_id: string
}

export interface TopicsData {
  background_knowledge: ContentLevel[]
  insight: ContentLevel[]
}

