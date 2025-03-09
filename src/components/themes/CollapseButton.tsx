import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface CollapseButtonProps {
  isExpanded: boolean
  onToggle: () => void
  disabled?: boolean
}

export function CollapseButton({ isExpanded, onToggle, disabled = false }: CollapseButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-6 w-6 items-center justify-center rounded-md",
        disabled ? "opacity-20 cursor-default" : "hover:bg-muted/80 cursor-pointer opacity-70",
        "transition-transform duration-200",
        isExpanded && "transform rotate-0",
        !isExpanded && "transform rotate-[-90deg]"
      )}
      onClick={(e) => {
        e.stopPropagation()
        if (!disabled) onToggle()
      }}
      aria-label={isExpanded ? "折りたたむ" : "展開する"}
    >
      <ChevronDown className="h-4 w-4" />
    </button>
  )
}

