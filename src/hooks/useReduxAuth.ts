"use client"

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { signInWithGoogle, logout } from "@/lib/redux/features/auth/authSlice"
import { selectIsAuthenticated, selectUserInfo } from "@/lib/redux/features/auth/selectors"
import { useRouter } from "next/navigation"

export function useReduxAuth() {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)
  const userInfo = useAppSelector(selectUserInfo)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const loading = useAppSelector((state) => state.auth.loading)
  const error = useAppSelector((state) => state.auth.error)
  const router = useRouter()

  const handleSignInWithGoogle = async () => {
    await dispatch(signInWithGoogle()).unwrap()
    router.push("/")
  }

  const handleLogout = async () => {
    await dispatch(logout()).unwrap()
    router.push("/login")
  }

  return {
    user,
    userInfo,
    isAuthenticated,
    loading,
    error,
    signInWithGoogle: handleSignInWithGoogle,
    logout: handleLogout,
  }
}

