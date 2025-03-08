"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, LogOut, PlayCircle, HelpCircle, Download } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserIdDisplay } from "@/components/dev/user-id-display"
import { useReduxAuth } from "@/hooks/useReduxAuth"

export function Header() {
  const { user, logout } = useReduxAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link
          href="/"
          className="flex items-center gap-2 transition-colors hover:text-theme-600 dark:hover:text-theme-400"
          aria-label="Home"
        >
          <BookOpen className="h-5 w-5" />
          <span className="hidden font-bold sm:inline-block">Soi</span>
        </Link>
        <nav className="flex flex-1 items-center justify-end gap-4">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-theme-600 dark:hover:text-theme-400"
          >
            Home
          </Link>
          <Link
            href="/extension"
            className="text-sm font-medium transition-colors hover:text-theme-600 dark:hover:text-theme-400 flex items-center gap-1"
          >
            <Download className="h-4 w-4" />
            拡張機能
          </Link>
          <Link
            href="/help"
            className="text-sm font-medium transition-colors hover:text-theme-600 dark:hover:text-theme-400 flex items-center gap-1"
          >
            <HelpCircle className="h-4 w-4" />
            ヘルプ
          </Link>
          {/* デモリンクはログインしていない場合のみ表示 */}
          {!user && (
            <Link
              href="/demo"
              className="text-sm font-medium transition-colors hover:text-theme-600 dark:hover:text-theme-400 flex items-center gap-1"
            >
              <PlayCircle className="h-4 w-4" />
              デモ
            </Link>
          )}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL || undefined} alt={user.displayName || "User avatar"} />
                    <AvatarFallback>{user.displayName?.[0] || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.displayName}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <UserIdDisplay userId={user.uid} />
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>ログアウト</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">ログイン</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  )
}

