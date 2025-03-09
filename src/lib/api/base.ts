export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: unknown,
  ) {
    super(message)
    this.name = "APIError"
  }
}

export abstract class BaseAPIClient {
  constructor(protected baseUrl: string) {}

  protected async fetch<T>(path: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${path}`
    const headers = {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true", // ngrokのブラウザ警告をスキップするヘッダーを追加
      ...options.headers,
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        mode: "cors",
        credentials: "include",
      })

      if (!response.ok) {
        throw new APIError(`API request failed: ${response.statusText}`, response.status)
      }

      const data = await response.json()
      return data as T
    } catch (error) {
      if (error instanceof APIError) {
        throw error
      }
      throw new APIError(`API request failed: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }
}

