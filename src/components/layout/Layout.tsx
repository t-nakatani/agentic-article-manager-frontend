"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import { Header } from "./Header"
import { FeedbackButton } from "@/components/feedback/feedback-button"
import { FeedbackSheet } from "@/components/feedback/feedback-sheet"

interface LayoutProps {
  children: ReactNode
  variant?: "default" | "wide" | "compact"
  headerVariant?: "default" | "expanded" | "compact"
}

export function Layout({ 
  children, 
  variant = "default",
  headerVariant = "default"
}: LayoutProps) {
  const [feedbackOpen, setFeedbackOpen] = useState(false)

  // レイアウトバリアントに基づいてコンテナークラスを決定
  const containerClass = {
    default: "container mx-auto px-4 py-6 sm:px-6 lg:px-8 lg:py-8",
    wide: "container-fluid mx-auto px-4 py-6 sm:px-6 lg:px-8 lg:py-8 max-w-7xl",
    compact: "container mx-auto px-4 py-6 sm:px-6 max-w-5xl",
  }[variant];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-indigo-50/50 to-white dark:from-indigo-950/50 dark:to-indigo-900/50">
      <Header variant={headerVariant} />
      <div className={containerClass}>{children}</div>
      <FeedbackButton onClick={() => setFeedbackOpen(true)} />
      <FeedbackSheet open={feedbackOpen} onOpenChange={setFeedbackOpen} />
    </div>
  )
}

