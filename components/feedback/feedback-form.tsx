"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { useReduxAuth } from "@/hooks/useReduxAuth" // AuthContextの代わりにuseReduxAuthを使用
import feedbackAPI from "@/lib/api/feedback"
import type { FeedbackRating, FeedbackCategory } from "@/types/feedback"

interface FeedbackFormProps {
  onClose: () => void
}

const RATING_OPTIONS = [
  { value: 30, emoji: "☹️", label: "悪い" },
  { value: 20, emoji: "😐", label: "普通" },
  { value: 10, emoji: "😊", label: "良い" },
] as const

const CATEGORY_OPTIONS = [
  { value: "general", label: "全般" },
  { value: "bug", label: "バグ報告" },
  { value: "feature", label: "機能リクエスト" },
  { value: "improvement", label: "改善提案" },
  { value: "other", label: "その他" },
] as const

export function FeedbackForm({ onClose }: FeedbackFormProps) {
  const { user } = useReduxAuth() // AuthContextの代わりにuseReduxAuthを使用
  const [rating, setRating] = useState<FeedbackRating | null>(null)
  const [category, setCategory] = useState<FeedbackCategory>("other")
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !rating) return

    setIsSubmitting(true)

    try {
      await feedbackAPI.submitFeedback({
        user_id: user.uid,
        rating,
        category,
        comment,
      })

      toast({
        title: "フィードバックを送信しました",
        description: "ご協力ありがとうございます。",
      })
      onClose()
    } catch (error) {
      toast({
        title: "エラーが発生しました",
        description: "もう一度お試しください。",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-0 shadow-none">
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 pt-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-3">使い心地はいかがでしたか？</p>
            <div className="flex gap-6 justify-center">
              {RATING_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setRating(option.value)}
                  className={`flex flex-col items-center gap-1 transition-all hover:scale-110 ${
                    rating === option.value ? "scale-110" : "opacity-70"
                  }`}
                >
                  <span className="text-3xl" role="img" aria-label={option.label}>
                    {option.emoji}
                  </span>
                  <span className="text-xs text-muted-foreground">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <Select value={category} onValueChange={(value) => setCategory(value as FeedbackCategory)}>
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="カテゴリーを選択" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORY_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Textarea
              placeholder="フィードバックがありましたら、ご記入ください"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="text-sm resize-none"
            />
          </div>
        </CardContent>
        <CardFooter className="pb-4">
          <Button type="submit" className="w-full text-sm h-9" disabled={isSubmitting || !rating}>
            {isSubmitting ? "送信中..." : "送信"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

