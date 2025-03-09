import qaData from "@/data/qa.json"
import type { QAData } from "@/types/help"

export function getQAData(): QAData {
  return qaData.categories
}

