"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import { useReduxAuth } from "@/hooks/useReduxAuth"

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()
  const { user, loading, setAnonymousUser, isAnonymous } = useReduxAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      // ユーザーがログインしていない場合は匿名ユーザーを設定
      setAnonymousUser()
    }
  }, [user, loading, setAnonymousUser])

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-[125px] w-full rounded-lg" />
        <Skeleton className="h-[125px] w-full rounded-lg" />
        <Skeleton className="h-[125px] w-full rounded-lg" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}

