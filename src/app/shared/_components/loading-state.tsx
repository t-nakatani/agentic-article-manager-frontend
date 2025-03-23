import { Loader2 } from "lucide-react"

export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Loader2 className="h-8 w-8 animate-spin mb-4" />
      <p className="text-lg font-medium">共有された記事を読み込んでいます...</p>
    </div>
  )
} 