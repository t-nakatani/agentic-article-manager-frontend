# テスト運用ガイド

## 概要
このドキュメントでは、テスト環境の運用方法について説明します。テストの実行方法、新規テストの作成方法、CI/CDとの連携方法などを記載しています。

## テスト実行コマンド

### 単体テスト・統合テスト

` npm test `
すべての単体テストと統合テストを実行します。

` npm run test:watch `
ファイル変更を監視しながらテストを実行します。開発中に便利です。

` npm run test:coverage `
テストカバレッジレポートを生成します。

### E2Eテスト

` npm run cypress `
Cypressテストランナーを対話モードで起動します。

` npm run cypress:run `
Cypressテストをヘッドレスモードで実行します。CI環境で使用します。

## テストファイルの配置

テストファイルは以下の命名規則と配置ルールに従ってください：

1. **単体テスト・統合テスト**
   - ファイル名: `*.test.ts` または `*.test.tsx`
   - 配置場所: テスト対象のファイルと同じディレクトリの `__tests__` フォルダ内

   例：
   ```
   components/
     Button/
       Button.tsx
       __tests__/
         Button.test.tsx
   ```

2. **E2Eテスト**
   - ファイル名: `*.cy.ts`
   - 配置場所: `cypress/e2e/` ディレクトリ内

   例：
   ```
   cypress/
     e2e/
       article-flow.cy.ts
       theme-management.cy.ts
   ```

## テスト作成ガイドライン

### 単体テスト

1. **コンポーネントテスト**
   - レンダリング結果の検証
   - イベントハンドリングの検証
   - 条件付きレンダリングの検証

   例：
   ```typescript
   import { render, screen, fireEvent } from '@testing-library/react';
   import Button from '../Button';

   describe('Button', () => {
     it('ボタンがレンダリングされる', () => {
       render(<Button>テスト</Button>);
       expect(screen.getByRole('button', { name: /テスト/i })).toBeInTheDocument();
     });

     it('クリック時にonClickが呼ばれる', () => {
       const handleClick = jest.fn();
       render(<Button onClick={handleClick}>テスト</Button>);
       fireEvent.click(screen.getByRole('button', { name: /テスト/i }));
       expect(handleClick).toHaveBeenCalledTimes(1);
     });
   });
   ```

2. **ユーティリティ関数テスト**
   - 入出力の検証
   - エッジケースの検証
   - エラー処理の検証

   例：
   ```typescript
   import { formatDate } from '../dateUtils';

   describe('formatDate', () => {
     it('日付を正しくフォーマットする', () => {
       const date = new Date('2023-01-01T00:00:00Z');
       expect(formatDate(date)).toBe('2023年1月1日');
     });

     it('無効な日付の場合は空文字を返す', () => {
       expect(formatDate(null)).toBe('');
       expect(formatDate(undefined)).toBe('');
       expect(formatDate(new Date('invalid'))).toBe('');
     });
   });
   ```

### 統合テスト

1. **複数コンポーネントの連携テスト**
   - コンポーネント間の相互作用の検証
   - データフローの検証
   - 状態変更の検証

   例：
   ```typescript
   import { render, screen, fireEvent } from '@testing-library/react';
   import { ArticleList } from '../ArticleList';
   import { SearchBar } from '../SearchBar';
   import { ArticleListWithSearch } from '../ArticleListWithSearch';

   describe('ArticleListWithSearch', () => {
     it('検索クエリに基づいて記事をフィルタリングする', () => {
       render(<ArticleListWithSearch articles={mockArticles} />);
       
       // 初期状態では全記事が表示される
       expect(screen.getAllByRole('article')).toHaveLength(mockArticles.length);
       
       // 検索クエリを入力
       fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'テスト' } });
       
       // フィルタリングされた記事のみが表示される
       const filteredArticles = mockArticles.filter(a => a.title.includes('テスト'));
       expect(screen.getAllByRole('article')).toHaveLength(filteredArticles.length);
     });
   });
   ```

### E2Eテスト

1. **ユーザーフローテスト**
   - 実際のユーザー操作シナリオの検証
   - 複数ページにまたがる操作の検証
   - エラー状態からの回復の検証

   例：
   ```typescript
   describe('記事検索フロー', () => {
     it('記事を検索して詳細を表示する', () => {
       cy.visit('/');
       
       // 検索を実行
       cy.get('[data-testid="search-input"]').type('テスト記事');
       cy.get('[data-testid="search-button"]').click();
       
       // 検索結果から記事を選択
       cy.get('[data-testid="article-item"]').first().click();
       
       // 記事詳細ページに遷移したことを確認
       cy.url().should('include', '/articles/');
       cy.get('[data-testid="article-title"]').should('be.visible');
     });
   });
   ```

## テストデータの管理

1. **テストフィクスチャ**
   - `test-utils/fixtures.ts` に定義された固定テストデータを使用
   - 複数のテストで再利用可能

2. **ファクトリー関数**
   - `test-utils/test-data.ts` に定義されたデータ生成関数を使用
   - テストごとにカスタマイズ可能

3. **モックサービス**
   - MSWを使用してAPIリクエストをモック
   - `mocks/handlers.ts` にモックハンドラーを定義

## CI/CD連携

GitHub Actionsでは以下のワークフローが設定されています：

1. **プルリクエスト時**
   - 単体テストと統合テストの実行
   - E2Eテストの実行
   - テストカバレッジレポートの生成

2. **メインブランチへのマージ時**
   - すべてのテストの実行
   - テストカバレッジレポートの生成と保存
   - デプロイ前の検証

## トラブルシューティング

### よくある問題と解決策

1. **テストが不安定（フラキーテスト）**
   - 非同期処理の待機時間を調整
   - テスト間の依存関係を排除
   - グローバル状態のリセットを確認

2. **テストカバレッジが低い**
   - 未テストのコードパスを特定
   - エッジケースのテストを追加
   - 条件分岐のすべてのパスをテスト

3. **モックが機能しない**
   - モックの設定を確認
   - インポートパスが正しいか確認
   - モックのスコープを確認

## ベストプラクティス

1. **テストの独立性を保つ**
   - 各テストは他のテストに依存せず実行できるようにする
   - テスト前後で状態をクリーンアップする

2. **テストを読みやすく保つ**
   - 明確な命名規則を使用
   - Arrange-Act-Assert パターンを使用
   - 長いテストは小さな関数に分割

3. **テストの保守性を高める**
   - 実装の詳細ではなく動作をテスト
   - テストヘルパーを活用して重複を減らす
   - テストコードもリファクタリングの対象とする

## 定期的なメンテナンス

1. **週次タスク**
   - フラキーテストの特定と修正
   - テストカバレッジの確認

2. **月次タスク**
   - テスト実行時間の最適化
   - 不要になったテストの削除
   - テスト戦略の見直し

3. **四半期タスク**
   - テストツールのアップデート
   - テスト環境の改善
   - テスト自動化の拡充 