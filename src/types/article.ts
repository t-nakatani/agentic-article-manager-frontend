export type SortField = "created_at" | "last_viewed_at"
export type SortDirection = "desc" | "asc"

export interface Article {
  article_id: string
  title: string
  one_line_summary: string
  themes: string[]
  url: string
  created_at: string
  last_viewed_at: string | null
}

