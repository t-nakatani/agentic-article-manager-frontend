import { SharedArticleType } from "../public-card/types"

// 既存のSharedArticleTypeを再利用
export type TimelineArticleType = SharedArticleType

export interface TimelineArticleCardProps {
  article: TimelineArticleType
} 