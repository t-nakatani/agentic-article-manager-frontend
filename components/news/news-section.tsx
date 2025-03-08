import { newsItems } from "./news-data"
import { NewsItemCard } from "./news-item"

export function NewsSection() {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">お知らせ</h2>
        <p className="text-sm text-muted-foreground">最新のアップデート情報をお届けします</p>
      </div>
      <div className="grid gap-4">
        {newsItems.map((item) => (
          <NewsItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

