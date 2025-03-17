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

export class BaseAPIClient {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async fetch<T>(path: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`APIリクエストエラー: ${response.status}`);
    }

    return response.json();
  }
}

// APIのベースURL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://knowledge-pholio.ngrok.dev"

