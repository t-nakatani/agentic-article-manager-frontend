"use client"

import type { ReactNode } from "react"

interface ClientPageWrapperProps {
  children: ReactNode
}

export function ClientPageWrapper({ children }: ClientPageWrapperProps) {
  // This component forces the page to be a Client Component
  // You can also add common client-side logic here if needed
  return <>{children}</>
}

