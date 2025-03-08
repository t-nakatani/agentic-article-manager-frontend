"use client"

import { motion } from "framer-motion"
import { X } from "lucide-react"
import type { ContentLevel } from "@/lib/types/article"

interface OriginalTextFooterProps {
  topic: ContentLevel
  onClose: () => void
}

export function OriginalTextFooter({ topic, onClose }: OriginalTextFooterProps) {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      className="fixed bottom-0 inset-x-0 bg-background/80 backdrop-blur-md border-t shadow-lg"
    >
      <div className="container max-w-7xl py-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <h4 className="text-sm font-medium text-muted-foreground">原文</h4>
            <p className="text-sm text-foreground/90 leading-relaxed">{topic.related_original_text}</p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <span className="sr-only">Close original text</span>
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.footer>
  )
}

