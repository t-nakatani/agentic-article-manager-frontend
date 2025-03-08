"use client"

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import type { ContentLevel, TopicsData } from "@/lib/types/article"
import { TopicSection } from "./TopicSection"
import { OriginalTextFooter } from "./OriginalTextFooter"
import { LoadingTopics } from "./LoadingTopics"
import topicsAPI from "@/lib/api/topics"
import { handleAPIError } from "@/lib/api/error"

interface TopicVisualizationProps {
  articleId: string
}

export function TopicVisualization({ articleId }: TopicVisualizationProps) {
  const [selectedTopic, setSelectedTopic] = useState<ContentLevel | null>(null)
  const [topics, setTopics] = useState<TopicsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await topicsAPI.getTopics(articleId)
        setTopics(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        await handleAPIError(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTopics()
  }, [articleId])

  const handleSelectTopic = (topic: ContentLevel) => {
    setSelectedTopic(selectedTopic?.title === topic.title ? null : topic)
  }

  if (isLoading) {
    return <LoadingTopics />
  }

  if (error) {
    return (
      <div className="py-8 px-4">
        <div className="container max-w-7xl mx-auto text-center">
          <p className="text-destructive">トピックの読み込みに失敗しました。</p>
          <p className="text-muted-foreground text-sm mt-2">{error}</p>
        </div>
      </div>
    )
  }

  if (!topics) {
    return null
  }

  return (
    <>
      <div className="py-8 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <TopicSection
              title="背景知識"
              topics={topics.background_knowledge}
              baseDelay={0.1}
              selectedTopic={selectedTopic}
              onSelectTopic={handleSelectTopic}
            />
            <TopicSection
              title="洞察"
              topics={topics.insight}
              baseDelay={0.1}
              selectedTopic={selectedTopic}
              onSelectTopic={handleSelectTopic}
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedTopic && <OriginalTextFooter topic={selectedTopic} onClose={() => setSelectedTopic(null)} />}
      </AnimatePresence>
    </>
  )
}

