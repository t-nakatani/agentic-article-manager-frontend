"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, LogOut, PlayCircle, HelpCircle, Download, Beaker } from "lucide-react"
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
import { usePathname } from "next/navigation"
import { AppLogo } from "@/components/ui/app-logo"
import { useAppSelector } from "@/lib/redux/hooks"
import { NavigationLinks } from "./NavigationLinks"
import { UserMenu } from "./UserMenu"

export function Header() {
  const { user } = useReduxAuth()
  const isAnonymous = useAppSelector((state) => state.auth.isAnonymous)
  const pathname = usePathname()
  const isLoginPage = pathname === "/login"

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link
          href="/"
          className="flex items-center gap-2 transition-colors hover:text-theme-600 dark:hover:text-theme-400"
          aria-label="Home"
        >
          <AppLogo />
        </Link>
        <nav className="flex flex-1 items-center justify-end gap-4">
          <NavigationLinks />
          
          {user ? (
            isAnonymous ? (
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login" className="flex items-center gap-1">
                  <LogOut className="h-4 w-4" />
                  <span>ログイン</span>
                </Link>
              </Button>
            ) : (
              <UserMenu user={user} />
            )
          ) : (
            !isLoginPage && (
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">
                  <span className="hidden sm:inline">ログイン</span>
                  <span className="sm:hidden">ログイン</span>
                </Link>
              </Button>
            )
          )}
        </nav>
      </div>
    </header>
  )
}

