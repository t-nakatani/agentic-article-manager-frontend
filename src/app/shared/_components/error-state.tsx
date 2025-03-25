import { Layout } from "@/components/layout/Layout"
import { AlertTriangle } from "lucide-react"

interface ErrorStateProps {
  error: string | null
}

export function ErrorState({ error }: ErrorStateProps) {
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="flex flex-col items-center justify-center py-16">
        <div className="bg-red-50/50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center max-w-md">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-red-700 dark:text-red-300 mb-4">エラーが発生しました</h1>
          <p className="text-lg text-muted-foreground">
            {error || "共有記事の取得に失敗しました。リンクが無効か期限切れの可能性があります。"}
          </p>
        </div>
      </div>
    </div>
  )
} 