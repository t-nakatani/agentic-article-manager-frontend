"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import {
  fetchThemes,
  createTheme,
  updateTheme,
  deleteTheme,
  saveThemes,
  setNodes,
  setEdges,
  setSelectedTheme,
} from "@/lib/redux/features/themes/themesSlice"
import { selectThemeTree, selectIsThemesLoading } from "@/lib/redux/features/themes/selectors"
import type { Node, Edge } from "reactflow"

export function useReduxThemes() {
  const dispatch = useAppDispatch()
  const nodes = useAppSelector((state) => state.themes.nodes)
  const edges = useAppSelector((state) => state.themes.edges)
  const themeTree = useAppSelector(selectThemeTree)
  const isLoading = useAppSelector(selectIsThemesLoading)
  const error = useAppSelector((state) => state.themes.error)
  const selectedTheme = useAppSelector((state) => state.themes.selectedTheme)
  const user = useAppSelector((state) => state.auth.user)

  useEffect(() => {
    if (user && nodes.length === 0 && !isLoading) {
      dispatch(fetchThemes(user.uid))
    }
  }, [dispatch, user, nodes.length, isLoading])

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

  const saveThemesHandler = async () => {
    if (!user) return

    await dispatch(
      saveThemes({
        userId: user.uid,
        nodes,
        edges,
      }),
    ).unwrap()
  }

  const setNodesHandler = (newNodes: Node[]) => {
    dispatch(setNodes(newNodes))
  }

  const setEdgesHandler = (newEdges: Edge[]) => {
    dispatch(setEdges(newEdges))
  }

  const setSelectedThemeHandler = (theme: string) => {
    dispatch(setSelectedTheme(theme))
  }

  return {
    nodes,
    edges,
    themeTree,
    selectedTheme,
    isLoading,
    error,
    setNodes: setNodesHandler,
    setEdges: setEdgesHandler,
    setSelectedTheme: setSelectedThemeHandler,
    addTheme,
    updateTheme: updateThemeHandler,
    deleteTheme: deleteThemeHandler,
    saveThemes: saveThemesHandler,
  }
}

