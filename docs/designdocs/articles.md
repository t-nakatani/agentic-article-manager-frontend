# 記事管理システム設計ドキュメント

## 概要

記事管理システムは、ユーザーがウェブ上の記事を保存、整理、検索するための機能を提供します。Chrome拡張機能と連携し、ユーザーが閲覧した記事を自動的に要約・分類して保存します。

## コンポーネント構成

### 記事カード関連コンポーネント

記事カードは複数のサブコンポーネントから構成され、それぞれが特定の責務を持ちます。

#### ArticleCard
記事カード全体のコンテナコンポーネントです。
- 記事情報の表示を統括
- ファビコンの取得と管理
- カードクリック時の挙動（記事URLを新しいタブで開く）
- 子コンポーネントへのイベントハンドラの受け渡し

#### ArticleHeader
記事カードの上部セクションを担当します。
- タイトルの表示（1行に制限、オーバーフローは省略）
- ファビコンの表示
- お気に入りボタンの表示と操作
- メニューボタンの表示
- タグ表示ダイアログと削除確認ダイアログの管理
- 要約再生成機能の提供

#### ArticleContent
記事の要約内容を表示します。
- 1行要約の表示（最大1行、オーバーフローは省略）
- テーマカラーに合わせたスタイリング

#### ArticleFooter
記事のメタ情報を表示します。
- 登録日時の表示
- 最終閲覧日時の表示
- 閲覧回数の表示
- テーマタグの一部表示（省略形式）

#### ArticleMenu
記事に対する操作メニューを提供します。
- タグ表示機能
- 要約再生成機能
- 記事削除機能
- イベント伝播の制御（カードクリックとの分離）

#### FavoriteButton
お気に入り状態の切り替えボタンです。
- お気に入り状態の表示と切り替え
- トグル時のコールバック処理

### ダイアログコンポーネント

#### ArticleTagsDialog
記事に関連付けられたテーマタグを表示するダイアログです。
- 記事タイトルの表示
- テーマタグのリスト表示（バッジ形式）
- モーダル表示の管理

#### ArticleDeleteDialog
記事削除前の確認ダイアログです。
- 記事タイトルの表示
- 削除確認ボタンとキャンセルボタンの提供
- 削除実行時のコールバック処理

## 記事カードの表示情報

### ヘッダー部分
- サイトファビコン：記事元サイトのアイコン（取得失敗時は非表示）
- タイトル：記事のタイトル（最大1行、オーバーフローは省略）
- お気に入りボタン：星アイコンで表示、クリックで切り替え
- メニューボタン：操作メニューを表示するドロップダウントリガー

### コンテンツ部分
- 要約：記事の1行要約（最大1行、オーバーフローは省略）

### フッター部分
- メタ情報：登録日時、最終閲覧日時、閲覧回数
- テーマタグ：記事に関連付けられたテーマの一部（省略表示）

## 操作機能

### 基本操作
- カードクリック：記事の元URLを新しいタブで開く（ボタン以外の領域）
- お気に入り登録/解除：星アイコンをクリックして切り替え

### メニュー操作
- タグ表示：関連テーマを表示するダイアログを開く
- 要約再生成：AIによる要約を再度生成（ユーザー認証が必要）
- 削除：記事を削除（確認ダイアログあり）

## データフロー

1. ArticleList コンポーネントが記事データを受け取り、各記事に対して ArticleCard を生成
2. ArticleCard は記事データとコールバック関数を子コンポーネントに渡す
3. ユーザー操作（お気に入り切り替え、削除など）は子コンポーネントから親へイベントとして伝播
4. 親コンポーネントがReduxアクションをディスパッチしてグローバル状態を更新

## 状態管理

記事の状態管理はReduxを使用して行います。

### Redux Slices

#### articlesSlice
- 記事データの取得、保存、削除、更新を管理
- ローディング状態とエラー状態の管理
- お気に入り状態の切り替え処理

#### articleFiltersSlice
- ソート条件（フィールド、方向）
- 検索クエリ
- 選択中のテーマ
- ページネーション（現在のページ、ページサイズ）
- お気に入りフィルタ状態

## レスポンシブ対応

- 記事カードは親コンテナに応じて幅を調整
- ファビコンとタイトルは縮小時も視認性を確保
- メニュー操作はモバイル環境でも操作しやすいサイズを確保

## アクセシビリティ

- スクリーンリーダー対応：適切なaria属性とsrクラスの使用
- キーボード操作：フォーカス可能な要素の適切な順序
- コントラスト：テーマカラーはダークモードでも視認性を確保

## エラーハンドリング

- ファビコン取得失敗時：エラーログを出力し、ファビコン表示を非表示に
- 要約再生成失敗時：トースト通知でエラーを表示
- 削除失敗時：トースト通知でエラーを表示

## パフォーマンス最適化

- メモ化：不要な再レンダリングを防止
- 遅延読み込み：ファビコンは必要時に取得
- イベント委譲：カードクリックとボタンクリックの適切な分離

## 将来の拡張

- 記事の詳細ビュー実装
- ドラッグ&ドロップによる記事の並べ替え
- カスタムテーマ編集機能
- 記事の共有機能
- 閲覧履歴の視覚化
