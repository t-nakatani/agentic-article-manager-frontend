"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Layout } from "@/components/layout/Layout"
import { Chrome } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { NewsSection } from "@/components/news/news-section"
import { useReduxAuth } from "@/hooks/useReduxAuth"

export function LoginPageContent() {
  const { user, loading, signInWithGoogle, registrationPaused, isAuthenticated } = useReduxAuth()

  if (loading) {
    return (
      <Layout>
        <div className="mx-auto max-w-md">
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-[200px] mb-2" />
              <Skeleton className="h-4 w-[300px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        </div>
      </Layout>
    )
  }

  if (isAuthenticated) {
    return (
      <Layout>
        <div className="mx-auto max-w-md">
          <Card>
            <CardHeader>
              <CardTitle>すでにログインしています</CardTitle>
              <CardDescription>ホームページに戻って記事を読み進めましょう。</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="container max-w-2xl space-y-8">
        {/* ログインセクション */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">ログイン / 新規登録</h2>
            <p className="text-sm text-muted-foreground">アカウントにログインして記事を管理しましょう</p>
          </div>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {registrationPaused && (
                  <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                    <p className="text-sm text-amber-800 dark:text-amber-300">
                      現在、新規登録を一時的に停止中です。既存のアカウントのみログイン可能です。
                    </p>
                  </div>
                )}
                <Button onClick={signInWithGoogle} className="w-full" size="lg">
                  <Chrome className="mr-2 h-5 w-5" />
                  Googleでログイン
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ニュースセクション */}
        <NewsSection />
      </div>
    </Layout>
  )
}

