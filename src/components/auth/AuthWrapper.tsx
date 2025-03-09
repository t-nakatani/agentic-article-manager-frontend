"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import { useAppSelector } from "@/lib/redux/hooks"

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAppSelector((state) => state.auth)
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

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

