import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface ArticleSearchProps {
  value: string
  onChange: (value: string) => void
}

export function ArticleSearch({ value, onChange }: ArticleSearchProps) {
  return (
    <div className="relative max-w-md w-full">
      <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="記事を検索..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 h-9"
      />
    </div>
  )
}

