import { Loader2 } from "lucide-react"
import { useReduxFiles } from "@/hooks/useReduxFiles"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export function DownloadsContent() {
  const { files, isLoading, error, refreshFiles } = useReduxFiles()

  // ローディング中の表示
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">ファイルを読み込み中...</span>
      </div>
    )
  }

  // エラー表示
  if (error) {
    return (
      <div className="py-4 text-destructive space-y-4">
        <p>{error}</p>
        <Button variant="outline" size="sm" onClick={refreshFiles} className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          再読み込み
        </Button>
      </div>
    )
  }

  // ファイルがない場合
  if (files.length === 0) {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground mb-4">現在利用可能なファイルはありません。</p>
        <Button variant="outline" size="sm" onClick={refreshFiles} className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          再読み込み
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">開発に必要なファイルをダウンロードできます。</p>
        <Button variant="outline" size="sm" onClick={refreshFiles} className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          更新
        </Button>
      </div>
      <div className="grid gap-4">
        {files.map((file) => {
          const fileName = file.name || getFileNameFromPath(file.path || file.url || "")
          const fileUrl = file.url || file.path || ""
          
          return (
            <div key={file.id} className="flex items-center justify-between p-3 border rounded-md hover:bg-accent/50">
              <div>
                <h3 className="font-medium">{fileName}</h3>
                {file.size && <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>}
              </div>
              <Button 
                onClick={() => handleFileDownload(fileUrl, fileName)}
                size="sm"
                className="flex items-center gap-1"
              >
                ダウンロード
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ファイルサイズのフォーマット関数
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B"
  else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
  else if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  else return (bytes / (1024 * 1024 * 1024)).toFixed(1) + " GB"
}

// URLからファイル名を抽出する関数
function getFileNameFromPath(path: string): string {
  try {
    const url = new URL(path)
    const segments = url.pathname.split('/')
    const fileName = segments[segments.length - 1]
    return fileName || "ファイル"
  } catch (e) {
    // URLでない場合はパスの最後の部分を取得
    const segments = path.split('/')
    return segments[segments.length - 1] || "ファイル"
  }
}

// ファイルをダウンロードする関数
function handleFileDownload(url: string, fileName: string) {
  fetch(url)
    .then(response => response.blob())
    .then(blob => {
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(downloadUrl)
    })
    .catch(error => {
      console.error('ファイルのダウンロードに失敗しました:', error)
      // エラーハンドリングの追加（必要に応じて）
    })
}
