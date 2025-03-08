"use client"

import { motion } from "framer-motion"
import type { ContentLevel } from "@/lib/types/article"

interface TopicCardProps {
  topic: ContentLevel
  index: number
  delay: number
  isSelected: boolean
  onSelect: (topic: ContentLevel) => void
}

export function TopicCard({ topic, index, delay, isSelected, onSelect }: TopicCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: delay * index }}>
      <button onClick={() => onSelect(topic)} className="w-full text-left">
        <div className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur opacity-50 group-hover:opacity-75 transition" />
          <div
            className={`relative bg-background/80 backdrop-blur-sm border rounded-lg p-4 transition-colors ${
              isSelected ? "border-primary" : "hover:border-primary/50"
            }`}
          >
            <h4 className="font-medium text-foreground/90 mb-3">{topic.title}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {topic.summary.map((point, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-primary/60 select-none">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </button>
    </motion.div>
  )
}

