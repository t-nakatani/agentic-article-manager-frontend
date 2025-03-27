# Reduxの主要概念解説

Reduxは状態管理ライブラリで、Reactアプリケーションの状態を予測可能な方法で管理するために使用されます。このコードベースを例に、Reduxの主要概念を解説します。

## 1. ストア（Store）

ストアはアプリケーション全体の状態を保持する単一のオブジェクトです。

```typescript:src/lib/redux/store.ts
// ... 既存コード ...
const rootReducer = {
  articleFilters: articleFiltersReducer,
  articles: articlesReducer,
  themes: themesReducer,
  auth: authReducer,
  files: filesReducer,
  trendArticles: trendArticlesReducer,
}

export const store = configureStore({
  reducer: rootReducer
})
// ... 既存コード ...
```

ここでは`configureStore`を使って単一のストアを作成し、複数のリデューサーを結合しています。

## 2. アクション（Actions）

アクションは「何が起きたか」を表すオブジェクトです。

```typescript:src/lib/redux/features/articleFilters/articleFiltersSlice.ts
// ... 既存コード ...
export const articleFiltersSlice = createSlice({
  name: "articleFilters",
  initialState,
  reducers: {
    setSortField: (state, action: PayloadAction<SortField>) => {
      state.sortField = action.payload
      state.currentPage = 1 // ソート変更時にページをリセット
    },
    // ... 既存コード ...
  }
})
// ... 既存コード ...
```

`setSortField`などはアクションクリエーターで、Reduxのアクションを生成します。

## 3. リデューサー（Reducers）

リデューサーは現在の状態とアクションを受け取り、新しい状態を返す純粋関数です。

```typescript:src/lib/redux/features/files/filesSlice.ts
// ... 既存コード ...
const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiles.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      // ... 既存コード ...
  }
})
// ... 既存コード ...
```

Redux Toolkitでは`createSlice`を使ってリデューサーを宣言し、Immerライブラリにより状態を直接変更しているように見えるコードを書けます。

## 4. スライス（Slices）

Redux Toolkitの概念で、特定の機能に関連する状態、リデューサー、アクションを一つのファイルにまとめたものです。

```typescript:src/lib/redux/features/articles/articlesSlice.ts
// ... 既存コード ...
export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setArticleMemo: (state, action: PayloadAction<{ articleId: string; memo: string }>) => {
      // メモの状態をローカルで更新（保存前の一時的な状態）
      const { articleId, memo } = action.payload
      const article = state.items.find(item => item.article_id === articleId)
      if (article) {
        article.memoEdit = memo // memoEditはUI上での編集中の値
      }
    },
    // ... 既存コード ...
  },
  // ... 既存コード ...
})
// ... 既存コード ...
```

## 5. 非同期アクション（Async Actions）

Redux Toolkitの`createAsyncThunk`を使用して非同期操作を行います。

```typescript:src/lib/redux/features/files/filesSlice.ts
// ... 既存コード ...
// extraReducersでは非同期アクションの各状態（pending, fulfilled, rejected）に対応するリデューサーを定義
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiles.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.items = action.payload
        state.isLoading = false
      })
      .addCase(fetchFiles.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  }
// ... 既存コード ...
```

## 6. セレクター（Selectors）

セレクターは状態から必要なデータを取得する関数です。

```typescript:src/lib/redux/features/articles/selectors.ts
// ... 既存コード ...
export const selectArticles = (state: RootState) => state.articles.items
// ... 既存コード ...
```

## 7. ディスパッチ（Dispatch）

ディスパッチはアクションをストアに送信するための関数です。

```typescript:src/components/article-reader-content.tsx
// ... 既存コード ...
const handleSortFieldChange = (field: SortField) => {
  dispatch(setSortField(field))
}
// ... 既存コード ...
```

## 8. フック（Hooks）

React Reduxは`useSelector`と`useDispatch`というフックを提供し、Reactコンポーネントからストアにアクセスできます。

```typescript:src/components/article-reader-content.tsx
// ... 既存コード ...
const dispatch = useAppDispatch()
const { sortField, sortDirection, searchQuery, selectedTheme, showFavorites, showReadLater } = useAppSelector((state) => state.articleFilters)
// ... 既存コード ...
```

## まとめ

Reduxの流れは以下のようになります：

1. UIで何かイベントが発生
2. イベントハンドラーがアクションをディスパッチ
3. リデューサーが現在の状態とアクションから新しい状態を生成
4. ストアが状態を更新
5. UIがストアの変更を検知して再レンダリング

このプロジェクトでは、Redux Toolkitを使用して効率的に状態管理を行っています。スライスパターンでコードを整理し、非同期アクションを簡潔に記述できるようになっています。
