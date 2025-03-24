"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useReduxAuth } from "@/hooks/useReduxAuth"
import { usePathname } from "next/navigation"
import { AppLogo } from "@/components/ui/app-logo"
import { useAppSelector } from "@/lib/redux/hooks"
import { NavigationLinks } from "./NavigationLinks"
import { UserMenu } from "./UserMenu"

export function Header() {
  const { user, isAuthenticated } = useReduxAuth()
  const isAnonymous = useAppSelector((state) => state.auth.isAnonymous)
  const pathname = usePathname()
  const isLoginPage = pathname === "/login"

  return (
    <header className="sticky top-0 z-50 w-full border-b border-theme-100 dark:border-theme-800 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4 md:px-6">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <AppLogo />
          </Link>
        </div>
        <nav className="ml-auto sm:w-1/3 flex items-center justify-end gap-4">
          <NavigationLinks />
          
          {isAuthenticated ? (
            <UserMenu user={user!} />
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

