"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useReduxAuth } from "@/hooks/useReduxAuth"
import { usePathname } from "next/navigation"
import { AppLogo } from "@/components/ui/app-logo"
import { useAppSelector } from "@/lib/redux/hooks"
import { NavigationLinks } from "./NavigationLinks"
import { UserMenu } from "./UserMenu"
import { ReactNode } from "react"

interface HeaderProps {
  customContent?: ReactNode;
  customNavigation?: ReactNode;
  customActions?: ReactNode;
  variant?: "default" | "expanded" | "compact";
  className?: string;
}

export function Header({
  customContent,
  customNavigation,
  customActions,
  variant = "default",
  className = "",
}: HeaderProps) {
  const { user, isAuthenticated } = useReduxAuth()
  const isAnonymous = useAppSelector((state) => state.auth.isAnonymous)
  const pathname = usePathname()
  const isLoginPage = pathname === "/login"

  // バリアントに基づいてコンテナークラスを決定
  const containerClass = {
    default: "container",
    expanded: "container-fluid px-4 md:px-8",
    compact: "container max-w-5xl",
  }[variant];

  return (
    <header className={`sticky top-0 z-50 w-full border-b border-theme-100 dark:border-theme-800 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${className}`}>
      <div className={`${containerClass} flex h-16 items-center`}>
        {/* ロゴセクション - カスタムコンテンツで上書き可能 */}
        <div className="flex items-center">
          {customContent || (
            <Link href="/" className="flex items-center space-x-2">
              <AppLogo />
            </Link>
          )}
        </div>

        {/* ナビゲーションセクション - カスタムナビゲーションで上書き可能 */}
        <nav className="mx-6 flex-1 flex items-center justify-center space-x-4 md:space-x-6 lg:space-x-8">
          {customNavigation || <NavigationLinks />}
        </nav>

        {/* アクションセクション - カスタムアクションで上書き可能 */}
        <div className="flex items-center justify-end space-x-2">
          {customActions || (
            <>
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
            </>
          )}
        </div>
      </div>
    </header>
  )
}

