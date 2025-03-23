interface ErrorStateProps {
  error: string | null
}

export function ErrorState({ error }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">エラーが発生しました</h1>
      <p className="text-lg text-muted-foreground">{error || "共有データの取得に失敗しました"}</p>
    </div>
  )
} 