import { DownloadsContent } from "./downloads-content"

interface DevContentProps {
  activeItem: string
}

export function DevContent({ activeItem }: DevContentProps) {
  return (
    <div className="flex-1 p-6">
      <h1 className="text-2xl font-bold mb-4">
        {activeItem === "downloads" && "ファイルダウンロード"}
      </h1>
      <div className="border rounded-lg p-4 bg-card">
        {activeItem === "downloads" ? (
          <DownloadsContent />
        ) : (
          <p className="text-muted-foreground">このページは現在準備中です。選択されたセクション: {activeItem}</p>
        )}
      </div>
    </div>
  )
} 