"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Article } from "@/lib/api/articles"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { countBy, sortBy } from "lodash"
import { BookOpen, ArrowUpRight, Tag } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { parseISO, format, eachDayOfInterval, addDays } from "date-fns"
import { ja } from "date-fns/locale"

interface WeeklyStatsCombinedProps {
  articles: Article[]
  weekStart: Date
  isLoading: boolean
}

interface DailyData {
  date: string
  displayDate: string
  count: number
}

export function WeeklyStatsCombined({ articles, weekStart, isLoading }: WeeklyStatsCombinedProps) {
  if (isLoading) {
    return <CombinedSkeleton />
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

  // 週の各日を取得
  const weekDays = eachDayOfInterval({
    start: weekStart,
    end: addDays(weekStart, 6)
  })
  
  // 日別の記事数を集計
  const dailyData: DailyData[] = weekDays.map(day => {
    const dayStr = format(day, 'yyyy-MM-dd')
    const displayDate = format(day, 'E', { locale: ja }) // 日本語の曜日
    
    // その日に作成された記事をカウント
    const count = articles.filter(article => {
      const createdDate = parseISO(article.created_at)
      return format(createdDate, 'yyyy-MM-dd') === dayStr
    }).length
    
    return { date: dayStr, displayDate, count }
  })

  const maxCount = Math.max(...dailyData.map(d => d.count), 1)

  return (
    <Card className="border border-indigo-200 dark:border-indigo-800 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-indigo-700 dark:text-indigo-300">
          週間サマリー
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* 習慣サマリー */}
          <div className="grid grid-cols-3 gap-4">
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
          )}
          
          {/* セパレーター */}
          <Separator className="my-4 bg-indigo-100 dark:bg-indigo-800" />
          
          {/* グラフタイトル */}
          <h3 className="text-sm font-medium text-indigo-600 dark:text-indigo-400">日別記事数</h3>
          
          {/* 日別グラフ - 幅を80%に調整 */}
          <div className="h-[200px] w-full flex justify-center">
            <div className="w-4/5">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis 
                    dataKey="displayDate" 
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis 
                    domain={[0, maxCount + 1]}
                    allowDecimals={false}
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => value === 0 ? '' : value.toString()}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      fontSize: '0.75rem',
                      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                    }}
                    formatter={(value) => [`${value}件`, '記事数']}
                    labelFormatter={(label) => `${label}曜日`}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="var(--indigo-500)"
                    radius={[4, 4, 0, 0]}
                    barSize={32}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
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
function CombinedSkeleton() {
  return (
    <Card className="border border-indigo-200 dark:border-indigo-800 shadow-sm">
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-[140px]" />
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 統計スケルトン */}
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-start space-x-2">
              <Skeleton className="h-4 w-4 mt-0.5" />
              <div>
                <Skeleton className="h-3 w-16 mb-1" />
                <Skeleton className="h-5 w-12" />
              </div>
            </div>
          ))}
        </div>
        
        {/* タグスケルトン */}
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-6 w-20" />
          ))}
        </div>
        
        {/* セパレータースケルトン */}
        <Skeleton className="h-px w-full" />
        
        {/* グラフタイトルスケルトン */}
        <Skeleton className="h-4 w-24" />
        
        {/* グラフスケルトン */}
        <Skeleton className="h-[200px] w-full" />
      </CardContent>
    </Card>
  )
} 