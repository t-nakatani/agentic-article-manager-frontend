export function DemoNotice() {
  return (
    <div className="bg-theme-50 dark:bg-theme-900 p-4 rounded-lg border border-theme-200 dark:border-theme-800">
      <h1 className="text-2xl font-bold mb-2">デモモード</h1>
      <p className="text-muted-foreground">
        これはデモページです。ログインなしで機能を試すことができます。実際のデータを管理するには
        <a href="/login" className="text-theme-600 dark:text-theme-400 hover:underline mx-1">
          ログイン
        </a>
        してください。
      </p>
    </div>
  )
}

