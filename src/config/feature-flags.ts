/**
 * 機能フラグの設定
 * 
 * 開発中や実験的な機能の有効/無効を管理するためのフラグです。
 * 本番環境では基本的にfalseに設定してください。
 */

export const FeatureFlags = {
  // トレンド記事機能を表示するかどうか
  TREND_ARTICLES_ENABLED: false,
  
  // 新規登録を一時的に停止するフラグ
  REGISTRATION_PAUSED: false,
  
  
  // 将来的に追加される機能フラグをここに追加
  // 例: ADVANCED_SEARCH_ENABLED: false,
  // 例: NEW_THEME_TREE_ENABLED: false,
}

export default FeatureFlags
