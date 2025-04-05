"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import {
  fetchThemes,
  createTheme,
  updateTheme,
  deleteTheme,
  exportTheme,
  setSelectedTheme,
} from "@/lib/redux/features/themes/themesSlice"
import { selectThemeTree, selectIsThemesLoading } from "@/lib/redux/features/themes/selectors"

export function useReduxThemes() {
  const dispatch = useAppDispatch()
  const themeTree = useAppSelector(selectThemeTree)
  const isLoading = useAppSelector(selectIsThemesLoading)
  const error = useAppSelector((state) => state.themes.error)
  const selectedTheme = useAppSelector((state) => state.themes.selectedTheme)
  const user = useAppSelector((state) => state.auth.user)

  useEffect(() => {
    if (user && (!themeTree || themeTree.length === 0) && !isLoading) {
      dispatch(fetchThemes(user.uid))
    }
  }, [dispatch, user, themeTree, isLoading])

  const addTheme = async (parentId: string | null, name: string) => {
    if (!user) return

    await dispatch(
      createTheme({
        userId: user.uid,
        parentId,
        name,
      }),
    ).unwrap()
  }

  const updateThemeHandler = async (id: string, name: string) => {
    if (!user) return

    await dispatch(
      updateTheme({
        userId: user.uid,
        themeId: id,
        name,
      }),
    ).unwrap()
  }

  const deleteThemeHandler = async (id: string) => {
    if (!user || id === "all") return

    await dispatch(
      deleteTheme({
        userId: user.uid,
        themeId: id,
      }),
    ).unwrap()
  }

  const setSelectedThemeHandler = (theme: string) => {
    dispatch(setSelectedTheme(theme))
  }

  const exportThemeHandler = async (id: string) => {
    if (!user) return

    await dispatch(
      exportTheme({
        userId: user.uid,
        themeId: id,
      })
    ).unwrap()
  }

  return {
    themeTree,
    selectedTheme,
    isLoading,
    error,
    setSelectedTheme: setSelectedThemeHandler,
    addTheme,
    updateTheme: updateThemeHandler,
    deleteTheme: deleteThemeHandler,
    exportTheme: exportThemeHandler,
  }
}

