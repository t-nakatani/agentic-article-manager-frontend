import { Download } from "lucide-react"
import type { DevSidebarItem } from "../components/dev-sidebar"

// 開発者ツールのサイドバーメニュー項目
export const devSidebarItems: DevSidebarItem[] = [
  {
    id: "downloads",
    label: "ファイルダウンロード",
    icon: Download,
    tooltip: "ファイルダウンロード"
  }
] 