import { BookOpen } from "lucide-react"

export function AppLogo() {
  return (
    <div className="flex items-center gap-2">
      <BookOpen className="h-5 w-5" />
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-black dark:text-white">Soi</span>
        <span className="text-xs text-foreground">Agenticによるwebページ管理</span>
      </div>
    </div>
  )
}
