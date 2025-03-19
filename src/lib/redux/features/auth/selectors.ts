import { createSelector } from "@reduxjs/toolkit"
import type { RootState } from "@/lib/redux/store"

// 基本セレクター
const selectUser = (state: RootState) => state.auth.user
const selectAuthLoading = (state: RootState) => state.auth.loading
const selectAuthError = (state: RootState) => state.auth.error
const selectIsAnonymous = (state: RootState) => state.auth.isAnonymous

// メモ化されたセレクター: ユーザーがログインしているかどうか
// 匿名ユーザーはログイン済みとみなさない
export const selectIsAuthenticated = createSelector(
  [selectUser, selectIsAnonymous], 
  (user, isAnonymous): boolean => user !== null && !isAnonymous
)

// 実際に認証されているユーザーかどうか（匿名ユーザーは除外）
export const selectIsRealAuthenticated = createSelector(
  [selectUser, selectIsAnonymous], 
  (user, isAnonymous): boolean => user !== null && !isAnonymous
)

// メモ化されたセレクター: ユーザー情報
export const selectUserInfo = createSelector([selectUser], (user) => {
  if (!user) return null

  return {
    id: user.uid,
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  }
})

