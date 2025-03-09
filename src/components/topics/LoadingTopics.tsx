import { Skeleton } from "@/components/ui/skeleton"

export function LoadingTopics() {
  return (
    <div className="py-8 px-4">
      <div className="container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[0, 1].map((section) => (
            <div key={section} className="space-y-4">
              <Skeleton className="h-6 w-24" />
              {[0, 1, 2].map((card) => (
                <div key={card} className="space-y-4">
                  <Skeleton className="h-[200px] w-full rounded-lg" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

