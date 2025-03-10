import { toast } from "sonner"
import { APIError } from "./base"

export async function handleAPIError(error: unknown) {
  console.error("API Error:", error)

  if (error instanceof APIError) {
    toast.error("エラーが発生しました", {
      description: error.message,
    })
  } else {
    toast.error("エラーが発生しました", {
      description: "予期せぬエラーが発生しました。",
    })
  }
}

