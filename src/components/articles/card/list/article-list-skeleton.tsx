import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ArticleListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(4)].map((_, i) => (
        <Card 
          key={i} 
          className="bg-white dark:bg-theme-900 rounded-xl overflow-hidden relative before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-theme-200/50 dark:before:bg-theme-700/30 border-0 shadow-none"
        >
          <CardContent className="p-2.5">
            <div className="space-y-0.5">
              <div className="flex items-start justify-between gap-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-6 w-6 rounded-md" />
              </div>
              <Skeleton className="h-3 w-1/2" />
              <div className="flex justify-end gap-3 pt-0.5">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

