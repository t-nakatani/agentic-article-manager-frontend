"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import { Header } from "./Header"
import { FeedbackButton } from "@/components/feedback/feedback-button"
import { FeedbackSheet } from "@/components/feedback/feedback-sheet"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [feedbackOpen, setFeedbackOpen] = useState(false)

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-theme-50/50 to-white dark:from-theme-950/50 dark:to-theme-900/50">
      <Header />
      <div className="container relative mx-auto px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</div>
      <FeedbackButton onClick={() => setFeedbackOpen(true)} />
      <FeedbackSheet open={feedbackOpen} onOpenChange={setFeedbackOpen} />
    </div>
  )
}

