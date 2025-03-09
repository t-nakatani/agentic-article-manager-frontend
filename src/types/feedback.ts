export type FeedbackRating = 10 | 20 | 30 // GOOD = 10, NORMAL = 20, BAD = 30
export type FeedbackCategory = "general" | "bug" | "feature" | "improvement" | "other"

export interface FeedbackData {
  user_id: string
  rating: FeedbackRating
  category: FeedbackCategory
  comment: string
}

