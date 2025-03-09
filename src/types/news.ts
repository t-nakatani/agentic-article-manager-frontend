export type NewsTag = "new" | "alpha" | "beta" | "release"

export interface NewsItem {
  id: string
  title: string
  date: string
  tags: NewsTag[]
  descriptions?: string[]
  link?: {
    text: string
    url: string
  }
}

