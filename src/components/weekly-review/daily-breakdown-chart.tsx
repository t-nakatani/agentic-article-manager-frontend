"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Article } from "@/lib/api/articles"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { parseISO, format, eachDayOfInterval, addDays } from "date-fns"
import { ja } from "date-fns/locale"

interface DailyBreakdownChartProps {
  weekStart: Date
  articles: Article[]
  isLoading: boolean
}

interface DailyData {
  date: string
  displayDate: string
  count: number
}

export function DailyBreakdownChart({ weekStart, articles, isLoading }: DailyBreakdownChartProps) {
  if (isLoading) {
    return <ChartSkeleton />
  }
  
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
      <CardHeader className="pb-0">
        <CardTitle className="text-xl font-semibold text-indigo-700 dark:text-indigo-300">
          日別記事数
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[200px] w-full">
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
                barSize={36}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

function ChartSkeleton() {
  return (
    <Card className="border border-indigo-200 dark:border-indigo-800 shadow-sm">
      <CardHeader className="pb-0">
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[200px] w-full bg-indigo-50 dark:bg-indigo-900/20 rounded-md flex items-center justify-center">
          <Skeleton className="h-[160px] w-[90%]" />
        </div>
      </CardContent>
    </Card>
  )
} 