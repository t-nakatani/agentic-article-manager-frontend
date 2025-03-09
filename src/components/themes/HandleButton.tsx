"use client"

import type { HandleButtonProps } from "@/types/theme-board"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function HandleButton({ position, nodeId, onAdd, show }: HandleButtonProps) {
  if (!show) return null

  return (
    <div className={`absolute ${position === "top" ? "top-[-10px]" : "bottom-[-10px]"} left-1/2 -translate-x-1/2`}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onAdd(nodeId, position)}
        className={cn("h-6 w-6 p-0.5 transition-transform", "opacity-50 hover:opacity-100")}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
}

