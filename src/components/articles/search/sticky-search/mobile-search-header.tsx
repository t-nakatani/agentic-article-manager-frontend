import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { ArticleSearch } from "../article-search"

interface MobileSearchHeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  isCollapsed: boolean
  toggleCollapse: () => void
}

export function MobileSearchHeader({
  searchQuery,
  onSearchChange,
  isCollapsed,
  toggleCollapse
}: MobileSearchHeaderProps) {
  return (
    <div className="flex items-center justify-between w-full md:hidden">
      <div className="flex-1">
        <ArticleSearch value={searchQuery} onChange={onSearchChange} />
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleCollapse}
        className="ml-3"
        aria-label={isCollapsed ? "展開" : "折りたたむ"}
      >
        {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
      </Button>
    </div>
  )
} 