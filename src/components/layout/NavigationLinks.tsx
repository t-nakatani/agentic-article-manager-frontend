import Link from "next/link"
import { Download, HelpCircle, Beaker } from "lucide-react"

export function NavigationLinks() {
  return (
    <>
      <Link
        href="/"
        className="text-sm font-medium transition-colors hover:text-theme-600 dark:hover:text-theme-400"
      >
        <span className="hidden sm:inline">Home</span>
      </Link>
      <Link
        href="/extension"
        className="text-sm font-medium transition-colors hover:text-theme-600 dark:hover:text-theme-400 flex items-center gap-1"
      >
        <Download className="h-4 w-4" />
        <span className="hidden sm:inline">拡張機能</span>
      </Link>
      <Link
        href="/help"
        className="text-sm font-medium transition-colors hover:text-theme-600 dark:hover:text-theme-400 flex items-center gap-1"
      >
        <HelpCircle className="h-4 w-4" />
        <span className="hidden sm:inline">ヘルプ</span>
      </Link>
      <Link
        href="/dev"
        className="text-sm font-medium transition-colors hover:text-theme-600 dark:hover:text-theme-400 flex items-center gap-1"
      >
        <Beaker className="h-4 w-4" />
        <span className="hidden sm:inline">ベータ機能</span>
      </Link>
    </>
  )
} 