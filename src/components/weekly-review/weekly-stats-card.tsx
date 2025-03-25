"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Article } from "@/lib/api/articles"
import { Skeleton } from "@/components/ui/skeleton"
import { countBy, sortBy } from "lodash"
import { BookOpen, ArrowUpRight, Clock, Tag } from "lucide-react"

interface WeeklyStatsCardProps {
  articles: Article[]
  isLoading: boolean
}

export function WeeklyStatsCard({ articles, isLoading }: WeeklyStatsCardProps) {
  if (isLoading) {
    return <StatsCardSkeleton />
  }

  // 記事数
  const articleCount = articles.length
  
  // 最も多く出現したテーマを集計
  const allThemes = articles.flatMap(article => article.themes)
  const themeCounts = countBy(allThemes)
  const topThemes = sortBy(
    Object.entries(themeCounts), 
    ([_, count]) => -count
  ).slice(0, 3)
  
  // 最も読んだテーマ
  const topTheme = topThemes.length > 0 ? topThemes[0][0] : "なし"

  return (
    <Card className="border border-indigo-200 dark:border-indigo-800 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-indigo-700 dark:text-indigo-300">
          週間サマリー
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* 読んだ記事数 */}
          <StatItem
            icon={<BookOpen className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />}
            label="読んだ記事数"
            value={`${articleCount}件`}
          />
          
          {/* 1日平均 */}
          <StatItem
            icon={<ArrowUpRight className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />}
            label="1日平均"
            value={`${(articleCount / 7).toFixed(1)}件`}
          />
          
          {/* 最も読んだテーマ */}
          <StatItem
            icon={<Tag className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />}
            label="最も読んだテーマ"
            value={topTheme}
          />
        </div>
        
        {/* トップテーマリスト */}
        {topThemes.length > 0 && (
          <div className="mt-4 pt-3 border-t border-indigo-100 dark:border-indigo-800">
            <h4 className="text-sm font-medium mb-2 text-indigo-600 dark:text-indigo-400">人気テーマ</h4>
            <div className="flex flex-wrap gap-2">
              {topThemes.map(([theme, count]) => (
                <div 
                  key={theme}
                  className="flex items-center bg-indigo-100 dark:bg-indigo-800 px-2 py-1 rounded-md text-xs"
                >
                  <span className="text-indigo-700 dark:text-indigo-300">{theme}</span>
                  <span className="ml-1.5 bg-indigo-200 dark:bg-indigo-700 px-1.5 rounded-full text-indigo-600 dark:text-indigo-400">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// 統計アイテムコンポーネント
function StatItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start space-x-2">
      <div className="mt-0.5">{icon}</div>
      <div>
        <p className="text-xs text-indigo-500 dark:text-indigo-400">{label}</p>
        <p className="text-xl font-semibold text-indigo-800 dark:text-indigo-200">{value}</p>
      </div>
    </div>
  )
}

// スケルトンローディング状態
function StatsCardSkeleton() {
  return (
    <Card className="border border-indigo-200 dark:border-indigo-800 shadow-sm">
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-[140px]" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-start space-x-2">
              <Skeleton className="h-4 w-4 mt-0.5" />
              <div>
                <Skeleton className="h-3 w-16 mb-1" />
                <Skeleton className="h-5 w-12" />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-indigo-100 dark:border-indigo-800">
          <Skeleton className="h-4 w-24 mb-2" />
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-6 w-20" />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 