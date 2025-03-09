"use client"

import { Layout } from "@/components/layout/Layout"
import { ThemeBoard } from "@/components/themes/theme-board"
import { AuthWrapper } from "@/components/auth/AuthWrapper"

export function ThemesPageContent() {
  return (
    <AuthWrapper>
      <Layout>
        <div className="space-y-4">
          <h1 className="text-2xl font-bold tracking-tight">Theme Editor</h1>
          <p className="text-muted-foreground">
            Organize your themes visually by dragging nodes and creating connections between them.
          </p>
        </div>
        <ThemeBoard />
      </Layout>
    </AuthWrapper>
  )
}

