interface DevContentProps {
  activeItem: string
}

export function DevContent({ activeItem }: DevContentProps) {
  return (
    <div className="flex-1 p-6">
      <h1 className="text-2xl font-bold mb-4">
        {activeItem === "general" && "一般設定"}
        {activeItem === "database" && "データベース"}
        {activeItem === "api" && "API設定"}
        {activeItem === "console" && "コンソール"}
        {activeItem === "tools" && "ユーティリティ"}
      </h1>
      <div className="border rounded-lg p-4 bg-card">
        <p className="text-muted-foreground">このページは現在準備中です。選択されたセクション: {activeItem}</p>
      </div>
    </div>
  )
} 