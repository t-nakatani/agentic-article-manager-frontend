"use client"

import { MessageSquarePlus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FeedbackButtonProps {
  onClick: () => void
}

export function FeedbackButton({ onClick }: FeedbackButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-4 right-4 shadow-lg hover:shadow-xl transition-shadow gap-2 bg-theme-500 hover:bg-theme-600 text-white"
      size="default"
      aria-label="フィードバックを送る"
    >
      <MessageSquarePlus className="h-5 w-5" />
      <span className="hidden sm:inline">フィードバック</span>
    </Button>
  )
}

