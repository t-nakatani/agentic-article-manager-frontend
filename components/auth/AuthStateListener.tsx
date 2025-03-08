"use client"

import type React from "react"

import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useAppDispatch } from "@/lib/redux/hooks"
import { setUser, setLoading, setError } from "@/lib/redux/features/auth/authSlice"

export function AuthStateListener({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setLoading(true))

    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (!user) {
          dispatch(setUser(null))
          dispatch(setLoading(false))
          return
        }
        
        const serializedUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        }
        dispatch(setUser(serializedUser))
        dispatch(setLoading(false))
      },
      (error) => {
        dispatch(setError(error.message))
        dispatch(setLoading(false))
      },
    )

    return () => unsubscribe()
  }, [dispatch])

  return <>{children}</>
}

