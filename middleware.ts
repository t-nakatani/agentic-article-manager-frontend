import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // トピック要約ページへのアクセスをすべてサンプルデータにリダイレクト
  if (request.nextUrl.pathname.match(/^\/articles\/.*\/topics$/)) {
    return NextResponse.rewrite(new URL("/articles/info-finance/topics", request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: "/articles/:path*/topics",
}

