import { Code, Settings, Database, Terminal, Wrench } from "lucide-react"
import type { DevSidebarItem } from "../components/dev-sidebar"

// 開発者ツールのサイドバーメニュー項目
export const devSidebarItems: DevSidebarItem[] = [
  {
    id: "general",
    label: "一般設定",
    icon: Settings,
    tooltip: "一般設定"
  },
  {
    id: "database",
    label: "データベース",
    icon: Database,
    tooltip: "データベース"
  },
  {
    id: "api",
    label: "API設定",
    icon: Code,
    tooltip: "API設定"
  },
  {
    id: "console",
    label: "コンソール",
    icon: Terminal,
    tooltip: "コンソール"
  },
  {
    id: "tools",
    label: "ユーティリティ",
    icon: Wrench,
    tooltip: "ユーティリティ"
  }
] 