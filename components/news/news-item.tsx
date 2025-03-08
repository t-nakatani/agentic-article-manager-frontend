import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import type { NewsItem } from "@/types/news"

const tagVariants = {
  new: "bg-green-500 text-white hover:bg-green-600",
  alpha: "bg-blue-500 text-white hover:bg-blue-600",
  beta: "bg-purple-500 text-white hover:bg-purple-600",
  release: "bg-orange-500 text-white hover:bg-orange-600",
}

interface NewsItemProps {
  item: NewsItem
}

export function NewsItemCard({ item }: NewsItemProps) {
  return (
    <Card>
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-medium">{item.title}</h3>
            <p className="text-xs text-muted-foreground">{item.date}</p>
          </div>
          <div className="flex gap-2">
            {item.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className={tagVariants[tag]}>
                {tag.toUpperCase()}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      {item.description && (
        <CardContent>
          <p className="text-sm text-muted-foreground">{item.description}</p>
        </CardContent>
      )}
      {item.link && (
        <CardFooter>
          <Button className="ml-auto bg-theme-500 hover:bg-theme-600 text-white group" asChild>
            <Link href={item.link.url}>
              {item.link.text}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

