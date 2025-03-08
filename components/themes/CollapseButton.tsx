import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CollapseButtonProps {
  isExpanded: boolean
  onToggle: () => void
  disabled?: boolean
}

export function CollapseButton({ isExpanded, onToggle, disabled = false }: CollapseButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "h-6 w-6 p-0.5 transition-transform",
        isExpanded && "rotate-180",
        disabled && "opacity-50 cursor-default hover:bg-transparent",
      )}
      onClick={onToggle}
      disabled={disabled}
    >
      <ChevronDown className="h-4 w-4" />
      <span className="sr-only">{isExpanded ? "Collapse" : "Expand"}</span>
    </Button>
  )
}

