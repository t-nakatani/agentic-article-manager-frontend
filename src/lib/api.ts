import type { Theme } from "./types"
import type { ThemeData } from "@/types/theme"
import { mockArticles } from "@/data/mock/articles"

export interface Article {
  title: string
  one_line_summary: string
  themes: Theme[]
  url: string
  registeredAt: string // ISO date string
  lastViewedAt: string | null // ISO date string or null
}

// モックAPI関数
export async function fetchArticles(): Promise<Article[]> {
  // 実際のAPIコールをシミュレートするための遅延
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockArticles
}

// テーマデータを取得するAPI関数
export async function fetchThemes(): Promise<ThemeData> {
  // 実際のAPIコールをシミュレートするための遅延
  await new Promise((resolve) => setTimeout(resolve, 500))

  // モックデータ
  return {
    technology: {
      blockchain: {
        Ethereum: {
          L2: {
            Arbitrum: {},
            Optimism: {},
          },
          PoS: {},
          zkEVM: {},
        },
        Bitcoin: {},
        Solana: {},
      },
      AI: {
        "Machine Learning": {},
        "Deep Learning": {},
        NLP: {},
        "Computer Vision": {},
      },
    },
    culture: {
      music: {
        Jazz: {},
        Rock: {},
        Pop: {},
      },
      movie: {
        Action: {},
        Comedy: {},
        Drama: {},
      },
    },
    business: {
      startup: {
        SaaS: {},
        B2B: {},
        B2C: {},
      },
      investment: {
        Stocks: {},
        "Real Estate": {},
        Crypto: {},
      },
    },
  }
}

