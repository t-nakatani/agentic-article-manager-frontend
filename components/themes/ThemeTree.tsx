"use client"

import * as React from "react"
import { TreeNodeComponent } from "./TreeNode"
import { useReduxThemes } from "@/hooks/useReduxThemes"
import type { TreeNode } from "@/types/theme"

interface ThemeTreeProps {
  onSelectTheme: (id: string) => void
  selectedTheme: string | null
  isDemoMode?: boolean
  demoThemes?: TreeNode[]
}

export function ThemeTree({ onSelectTheme, selectedTheme, isDemoMode = false, demoThemes }: ThemeTreeProps) {
  const {
    themeTree,
    isLoading,
    addTheme,
    updateTheme: updateThemeHandler,
    deleteTheme: deleteThemeHandler,
  } = useReduxThemes()

  // デモモードの場合はデモ用のテーマを使用
  const treeNodes = React.useMemo(() => {
    if (isDemoMode && demoThemes) {
      return demoThemes
    }
    return themeTree
  }, [themeTree, isDemoMode, demoThemes])

  const handleAddChild = async (parentId: string | null) => {
    if (isDemoMode) {
      console.log("Demo mode: Cannot add themes")
      return
    }

    try {
      await addTheme(parentId, "新しいテーマ")
    } catch (error) {
      console.error("Failed to add theme:", error)
    }
  }

  const handleUpdateTheme = async (id: string, name: string) => {
    if (isDemoMode) {
      console.log("Demo mode: Cannot update themes")
      return
    }

    try {
      await updateThemeHandler(id, name)
    } catch (error) {
      console.error("Failed to update theme:", error)
    }
  }

  const handleDeleteTheme = async (id: string) => {
    if (isDemoMode) {
      console.log("Demo mode: Cannot delete themes")
      return
    }

    try {
      await deleteThemeHandler(id)
    } catch (error) {
      console.error("Failed to delete theme:", error)
    }
  }

  if (isLoading && !isDemoMode) {
    return <div>Loading themes...</div>
  }

  return (
    <div className="sticky top-[57px] rounded-lg border bg-white dark:bg-gray-950">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-lg font-semibold">Themes</h2>
      </div>
      <div className="p-4">
        {treeNodes.map((node) => (
          <TreeNodeComponent
            key={node.id}
            node={node}
            onSelect={onSelectTheme}
            selectedNodeId={selectedTheme}
            isRootLevel={true}
            onAddChild={handleAddChild}
            onUpdateTheme={handleUpdateTheme}
            onDeleteTheme={handleDeleteTheme}
            isReadOnly={isDemoMode}
          />
        ))}
      </div>
    </div>
  )
}

