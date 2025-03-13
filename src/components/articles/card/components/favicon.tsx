"use client"

import { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { cacheFavicon } from "@/lib/redux/features/articles/articlesSlice"

interface FaviconProps {
  url: string
  size?: number
  className?: string
}

export function Favicon({ url, size = 16, className = "" }: FaviconProps) {
  const dispatch = useAppDispatch()
  const [faviconUrl, setFaviconUrl] = useState<string | null>(null)
  
  // Reduxストアからファビコンキャッシュを取得
  const faviconCache = useAppSelector((state) => state.articles.faviconCache)
  
  useEffect(() => {
    // URLからドメイン部分を抽出
    try {
      const parsedUrl = new URL(url)
      const domain = parsedUrl.hostname
      
      // キャッシュにファビコンがあるか確認
      if (domain in faviconCache) {
        setFaviconUrl(faviconCache[domain])
        return
      }
      
      // キャッシュにない場合は取得してキャッシュに保存
      const newFaviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`
      setFaviconUrl(newFaviconUrl)
      
      // Reduxストアにキャッシュ
      dispatch(cacheFavicon({ domain, faviconUrl: newFaviconUrl }))
    } catch (error) {
      console.error("ファビコンの取得に失敗しました", error)
      setFaviconUrl(null)
    }
  }, [url, dispatch, faviconCache])

  if (!faviconUrl) return null

  return (
    <div className={`flex-shrink-0 w-${size/4} h-${size/4} ${className}`}>
      <img 
        src={faviconUrl} 
        alt="" 
        className="w-full h-full object-contain"
        width={size}
        height={size}
        onError={(e) => {
          // エラー時に画像を非表示にする
          (e.target as HTMLImageElement).style.display = 'none'
        }}
      />
    </div>
  )
} 