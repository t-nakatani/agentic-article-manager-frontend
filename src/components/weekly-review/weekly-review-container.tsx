"use client"

import { useState, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import { fetchArticles } from "@/lib/redux/features/articles/articlesSlice"
import { WeekSelector } from "@/components/weekly-review/week-selector"
import { WeeklyStatsCombined } from "@/components/weekly-review/weekly-stats-combined"
import { WeeklyArticlesList } from "@/components/weekly-review/weekly-articles-list"
import { format, startOfWeek, endOfWeek, isWithinInterval, parseISO, subWeeks } from "date-fns"
import { ja } from "date-fns/locale"
import { Layout } from "@/components/layout/Layout"
import { AuthWrapper } from "@/components/auth/AuthWrapper"

export function WeeklyReviewContainer() {
  const dispatch = useAppDispatch()
  
  // Reduxからデータを取得
  const allArticles = useAppSelector((state) => state.articles.items)
  const userId = useAppSelector((state) => state.auth.user?.uid)
  const loading = useAppSelector((state) => state.articles.status === "loading")
  
  // 選択された週の開始日と終了日
  const [selectedWeekStart, setSelectedWeekStart] = useState(() => {
    const now = new Date()
    return startOfWeek(now, { weekStartsOn: 1 }) // 月曜日始まり
  })
  
  // 週の終了日を計算
  const selectedWeekEnd = endOfWeek(selectedWeekStart, { weekStartsOn: 1 })
  
  // 選択された週の記事をフィルタリング
  const weeklyArticles = allArticles.filter((article) => {
    const createdDate = parseISO(article.created_at)
    return isWithinInterval(createdDate, {
      start: selectedWeekStart,
      end: selectedWeekEnd
    })
  })
  
  // 前の週に移動
  const goToPreviousWeek = () => {
    setSelectedWeekStart(prevDate => subWeeks(prevDate, 1))
  }
  
  // 次の週に移動
  const goToNextWeek = () => {
    setSelectedWeekStart(prevDate => {
      const nextWeek = new Date(prevDate)
      nextWeek.setDate(nextWeek.getDate() + 7)
      return startOfWeek(nextWeek, { weekStartsOn: 1 })
    })
  }
  
  // 特定の日付の週に移動
  const goToWeek = (date: Date) => {
    setSelectedWeekStart(startOfWeek(date, { weekStartsOn: 1 }))
  }
  
  // ユーザーIDが利用可能になったら記事データを取得
  useEffect(() => {
    if (userId) {
      dispatch(fetchArticles(userId))
    }
  }, [dispatch, userId])
  
  // 選択中の週の表示用文字列
  const weekRangeText = `${format(selectedWeekStart, 'yyyy年MM月dd日', { locale: ja })} 〜 ${format(selectedWeekEnd, 'yyyy年MM月dd日', { locale: ja })}`
  
  // 記事削除用のダミー関数（実際の実装では適切な処理を行う）
  const handleDeleteArticle = async (articleId: string) => {
    // 記事削除の実装
  }

  return (
    <AuthWrapper>
      <Layout variant="compact" headerVariant="default">
        <div className="space-y-6 animate-fadeIn">
          <h1 className="text-2xl font-bold tracking-tight text-indigo-800 dark:text-indigo-300">週間振り返り</h1>
          <p className="text-muted-foreground">過去の各週に読んだ記事を振り返ることができます。</p>
          
          {/* 週選択コンポーネント */}
          <WeekSelector
            weekStart={selectedWeekStart}
            weekEnd={selectedWeekEnd}
            onPreviousWeek={goToPreviousWeek}
            onNextWeek={goToNextWeek}
            onSelectWeek={goToWeek}
            weekRangeText={weekRangeText}
          />
          
          {/* 週間統計と日別記事数（統合コンポーネント） */}
          <WeeklyStatsCombined 
            articles={weeklyArticles}
            weekStart={selectedWeekStart}
            isLoading={loading}
          />
          
          {/* 週間記事リスト */}
          <WeeklyArticlesList
            articles={weeklyArticles}
            isLoading={loading}
            onDeleteArticle={handleDeleteArticle}
            weekRangeText={weekRangeText}
          />
        </div>
      </Layout>
    </AuthWrapper>
  )
} 