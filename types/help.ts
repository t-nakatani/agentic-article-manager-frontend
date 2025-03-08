export interface QAItem {
  id: string
  question: string
  answer: string[] // 文字列の配列に変更
}

export interface QACategory {
  id: string
  title: string
  items: QAItem[]
}

export type QAData = QACategory[]

