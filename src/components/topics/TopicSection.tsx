import type { ContentLevel } from "@/lib/types/article"
import { TopicCard } from "./TopicCard"

interface TopicSectionProps {
  title: string
  topics: ContentLevel[]
  baseDelay: number
  selectedTopic: ContentLevel | null
  onSelectTopic: (topic: ContentLevel) => void
}

export function TopicSection({ title, topics, baseDelay, selectedTopic, onSelectTopic }: TopicSectionProps) {
  return (
    <section>
      <h3 className="text-sm font-medium text-muted-foreground mb-4 tracking-wide uppercase">{title}</h3>
      <div className="space-y-4">
        {topics.map((topic, index) => (
          <TopicCard
            key={index}
            topic={topic}
            index={index}
            delay={baseDelay}
            isSelected={selectedTopic?.title === topic.title}
            onSelect={onSelectTopic}
          />
        ))}
      </div>
    </section>
  )
}

