"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarIconProps {
  isFavorited: boolean
  isAnimating: boolean
}

export function StarIcon({ isFavorited, isAnimating }: StarIconProps) {
  return (
    <Star
      className={cn(
        "h-4 w-4 transition-all duration-300",
        isFavorited ? "fill-yellow-400 text-yellow-400" : "fill-transparent text-muted-foreground",
        isAnimating && "scale-125"
      )}
    />
  )
} 