import { toast } from "@/components/ui/use-toast"
import { APIError } from "./base"

export async function handleAPIError(error: unknown) {
  console.error("API Error:", error)

  if (error instanceof APIError) {
    toast({
      title: "エラーが発生しました",
      description: error.message,
      variant: "destructive",
    })
  } else {
    toast({
      title: "エラーが発生しました",
      description: "予期せぬエラーが発生しました。",
      variant: "destructive",
    })
  }
}

