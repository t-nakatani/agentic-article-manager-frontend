"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

export interface MenuItem {
  icon: React.ReactNode
  label: string
  onClick: (e: React.MouseEvent) => void
  className?: string
  isDanger?: boolean
}

export interface ArticleMenuProps {
  menuItems: MenuItem[]
}

export function ArticleMenu({ menuItems }: ArticleMenuProps) {
  // 通常のメニュー項目と危険な操作のメニュー項目を分離
  const normalMenuItems = menuItems.filter(item => !item.isDanger)
  const dangerMenuItems = menuItems.filter(item => item.isDanger)
  
  // 危険な操作のメニュー項目が存在するかどうか
  const hasDangerItems = dangerMenuItems.length > 0

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0 -mr-1" onClick={(e) => e.stopPropagation()}>
          <MoreHorizontal className="h-3.5 w-3.5" />
          <span className="sr-only">メニューを開く</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {normalMenuItems.map((item, index) => (
          <DropdownMenuItem
            key={`menu-item-${index}`}
            onClick={item.onClick}
            className={item.className}
          >
            {item.icon}
            {item.label}
          </DropdownMenuItem>
        ))}
        
        {hasDangerItems && (
          <>
            <DropdownMenuSeparator />
            {dangerMenuItems.map((item, index) => (
              <DropdownMenuItem
                key={`danger-item-${index}`}
                onClick={item.onClick}
                className={item.className || "text-red-600 dark:text-red-400"}
              >
                {item.icon}
                {item.label}
              </DropdownMenuItem>
            ))}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

