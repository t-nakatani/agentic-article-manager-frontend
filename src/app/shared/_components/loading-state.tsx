import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function LoadingState() {
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="space-y-8">
        {/* ヘッダースケルトン */}
        <div className="bg-gradient-to-r from-purple-50/80 to-blue-50/80 p-6 rounded-lg border border-blue-100 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="bg-blue-300/50 text-white p-2 rounded-full mr-3 animate-pulse h-9 w-9"></div>
            <div className="h-8 w-2/3 bg-blue-200/50 rounded-lg animate-pulse"></div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="h-6 w-1/3 bg-blue-100/60 rounded animate-pulse"></div>
          </div>
          
          <Separator className="my-4 bg-blue-100" />

          {/* 記事カードスケルトン */}
          <div className="transition-all duration-300">
            <div className="grid gap-6 md:grid-cols-2 mt-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="transition-all duration-300">
                  <Card className="overflow-hidden border-t-4 border-t-blue-300/70">
                    {/* カードヘッダースケルトン */}
                    <div className="p-4 bg-white">
                      <div className="h-5 w-4/5 bg-blue-100/80 rounded animate-pulse mb-2"></div>
                      <div className="h-4 w-1/4 bg-blue-50/80 rounded animate-pulse"></div>
                    </div>
                    
                    {/* カードボディスケルトン */}
                    <div className="px-4 pb-3">
                      <div className="h-4 w-full bg-gray-100/80 rounded animate-pulse mb-1"></div>
                      <div className="h-4 w-5/6 bg-gray-100/80 rounded animate-pulse mb-1"></div>
                      <div className="h-4 w-4/6 bg-gray-100/80 rounded animate-pulse"></div>
                    </div>
                    
                    {/* カードフッタースケルトン */}
                    <div className="px-4 pb-4 flex justify-between items-center">
                      <div className="h-8 w-24 bg-blue-50/80 rounded animate-pulse"></div>
                      <div className="h-8 w-20 bg-blue-50/80 rounded animate-pulse"></div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-4 bg-blue-100" />
          
          {/* 共有ボタンスケルトン */}
          <div className="mt-2">
            <div className="h-5 w-1/3 bg-blue-100/70 rounded animate-pulse mb-3"></div>
            <div className="flex space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-9 w-9 bg-blue-100/60 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 