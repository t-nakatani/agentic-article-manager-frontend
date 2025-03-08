"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UserIdDisplayProps {
  userId: string
}

export function UserIdDisplay({ userId }: UserIdDisplayProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(userId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <div className="px-2 py-1.5 space-y-1">
      <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">User ID (開発用)</div>
      <div className="flex items-center gap-2">
        <code className="flex-1 text-xs bg-muted px-2 py-1 rounded">{userId}</code>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={copyToClipboard}>
          {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
          <span className="sr-only">Copy user ID</span>
        </Button>
      </div>
    </div>
  )
}

