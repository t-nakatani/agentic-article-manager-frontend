"use client"

import * as React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CollapseButtonProps {
  isExpanded: boolean
  onToggle: () => void
  disabled?: boolean
  className?: string
}

export function CollapseButton({ isExpanded, onToggle, disabled = false, className }: CollapseButtonProps) {
  // 別のコンポーネントのクリックイベントとの競合を防ぐ
  const handleClick = (e: React.MouseEvent) => {
    if (!disabled) {
      e.stopPropagation()
      onToggle()
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "flex h-5 w-5 items-center justify-center rounded-sm",
        "transition-colors",
        disabled ? "opacity-0" : "opacity-100",
        "text-indigo-800 dark:text-indigo-300",
        "hover:bg-indigo-100 dark:hover:bg-indigo-800/30",
        className
      )}
    >
      <ChevronRight
        className={cn("h-3 w-3 transition-transform", isExpanded && "rotate-90")}
      />
    </button>
  )
}

