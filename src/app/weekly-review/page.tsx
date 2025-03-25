import { WeeklyReviewContainer } from "@/components/weekly-review/weekly-review-container"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "週間振り返り | 記事管理ツール",
  description: "過去の各週に読んだ記事をまとめて確認できます。",
}

export default function WeeklyReviewPage() {
  return <WeeklyReviewContainer />
} 