import { BaseAPIClient } from "./base"

export interface FeedbackData {
  user_id: string
  rating: number
  category: string
  comment: string
}

class FeedbackAPI extends BaseAPIClient {
  async submitFeedback(data: FeedbackData): Promise<void> {
    return this.fetch("/user-feedback", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }
}

const API_BASE_URL = "https://knowledge-pholio.ngrok.dev"
const feedbackAPI = new FeedbackAPI(API_BASE_URL)
// export default feedbackAPI
export { feedbackAPI };

