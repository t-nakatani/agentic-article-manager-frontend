import { BaseAPIClient, API_BASE_URL } from "./base"

// ファイルの型定義
export interface File {
  id: number | string
  path?: string
  url?: string
  name?: string
  size?: number
}

// APIレスポンスの型定義
export interface FilesResponse {
  files: File[]
}

// ファイル取得リクエストの型定義
interface GetFilesRequest {
  user_id: string
}

class FilesAPI extends BaseAPIClient {
  // ユーザーIDに基づいてファイル一覧を取得するメソッド
  async getFiles(userId: string): Promise<File[]> {
    try {
      const response = await this.fetch<FilesResponse>(`/files?user_id=${encodeURIComponent(userId)}`)
      // レスポンスからfilesプロパティを取り出す
      return response.files.map(file => ({
        ...file,
        // pathがある場合はurlとして使用
        url: file.path || file.url
      }))
    } catch (error) {
      console.error("ファイル取得エラー:", error)
      throw error
    }
  }
}

// FilesAPIのインスタンスを作成
const filesAPI = new FilesAPI(API_BASE_URL)
export { filesAPI };
