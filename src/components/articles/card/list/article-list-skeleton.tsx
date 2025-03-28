import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ArticleListSkeleton() {
  return (
    <div className="space-y-4">
      <Card className="rounded-lg border border-indigo-200 dark:border-indigo-800 bg-card shadow-sm overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div key={i}>
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
            {i < 3 && (
              <div className="border-t border-indigo-100 dark:border-indigo-900"></div>
            )}
          </div>
        ))}
      </Card>
    </div>
  )
}

