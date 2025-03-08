"use client"

import { useState } from "react"
import { Layout } from "@/components/Layout"
import { ThemeTree } from "@/components/theme-tree"
import { ArticleList } from "@/components/ArticleList"
import { useArticles } from "@/hooks/useArticles"

export default function ArticleReader() {
  const [selectedTheme, setSelectedTheme] = useState("all")
  const { articles, isLoading } = useArticles()

  return (
    <Layout>
      <div className="grid lg:grid-cols-[1fr_300px] gap-8">
        <main className="space-y-6">
          <ArticleList articles={articles} isLoading={isLoading} selectedTheme={selectedTheme} />
        </main>
        <aside className="space-y-6 lg:order-last">
          <ThemeTree onSelectTheme={setSelectedTheme} selectedTheme={selectedTheme} />
        </aside>
      </div>
    </Layout>
  )
}

