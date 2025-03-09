import { createSelector } from "@reduxjs/toolkit"
import type { RootState } from "@/lib/redux/store"

// 基本セレクター
const selectUser = (state: RootState) => state.auth.user
const selectAuthLoading = (state: RootState) => state.auth.loading
const selectAuthError = (state: RootState) => state.auth.error

// メモ化されたセレクター: ユーザーがログインしているかどうか
export const selectIsAuthenticated = createSelector([selectUser], (user): boolean => user !== null)

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

