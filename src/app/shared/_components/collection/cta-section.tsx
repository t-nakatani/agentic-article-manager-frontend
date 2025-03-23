import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <div className="mt-10 text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100 shadow-sm transition-all duration-300 hover:shadow-md">
      <p className="text-blue-700 mb-3">同じような記事をあなたも整理・共有してみませんか？</p>
      <Button variant="default" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300">
        無料でアカウント作成
      </Button>
    </div>
  )
} 