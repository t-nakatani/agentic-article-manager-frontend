import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import type { Article } from "@/lib/api-client"

interface ArticleTagsDialogProps {
  article: Article
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ArticleTagsDialog({ article, open, onOpenChange }: ArticleTagsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>タグ一覧</DialogTitle>
          <DialogDescription className="line-clamp-2">{article.title}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-wrap gap-2 pt-4">
          {article.themes.map((theme) => (
            <Badge
              key={theme}
              variant="secondary"
              className="rounded-full bg-theme-200 text-theme-800 dark:bg-theme-700 dark:text-theme-100"
            >
              {theme}
            </Badge>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

