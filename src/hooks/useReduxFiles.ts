"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { fetchFiles } from "@/lib/redux/features/files/filesSlice"

export function useReduxFiles() {
  const dispatch = useAppDispatch()
  const files = useAppSelector((state) => state.files.items)
  const isLoading = useAppSelector((state) => state.files.isLoading)
  const error = useAppSelector((state) => state.files.error)
  const user = useAppSelector((state) => state.auth.user)

  useEffect(() => {
    if (user?.uid && files.length === 0 && !isLoading) {
      dispatch(fetchFiles(user.uid))
    }
  }, [dispatch, user, files.length, isLoading])

  const refreshFiles = async () => {
    if (user?.uid) {
      try {
        await dispatch(fetchFiles(user.uid)).unwrap()
      } catch (error) {
        console.error("ファイル更新エラー:", error)
      }
    }
  }

  return {
    files,
    isLoading,
    error,
    refreshFiles
  }
} 