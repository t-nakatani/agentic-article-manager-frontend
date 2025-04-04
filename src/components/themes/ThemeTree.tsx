"use client"

import * as React from "react"
import { TreeNodeComponent } from "./TreeNode"
import { useReduxThemes } from "@/hooks/useReduxThemes"

interface ThemeTreeProps {
  onSelectTheme: (id: string) => void
  selectedTheme: string | null
}

export function ThemeTree({ onSelectTheme, selectedTheme }: ThemeTreeProps) {
  const {
    themeTree,
    isLoading,
    addTheme,
    updateTheme: updateThemeHandler,
    deleteTheme: deleteThemeHandler,
    exportTheme: exportThemeHandler,
  } = useReduxThemes()

  const handleAddChild = async (parentId: string | null, name: string) => {
    try {
      await addTheme(parentId, name)
    } catch (error) {
      console.error("Failed to add theme:", error)
    }
  }

  const handleUpdateTheme = async (id: string, name: string) => {
    try {
      await updateThemeHandler(id, name)
    } catch (error) {
      console.error("Failed to update theme:", error)
    }
  }

  const handleDeleteTheme = async (id: string) => {
    try {
      await deleteThemeHandler(id)
    } catch (error) {
      console.error("Failed to delete theme:", error)
    }
  }

  const handleExportTheme = async (id: string) => {
    try {
      await exportThemeHandler(id)
    } catch (error) {
      console.error("Failed to export theme:", error)
    }
  }

  if (isLoading) {
    return <div className="text-muted-foreground">テーマを読み込み中...</div>
  }

  return (
    <div className="sticky top-[57px] rounded-lg border bg-white dark:bg-gray-950 animate-fadeIn">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-lg font-bold tracking-tight text-indigo-800 dark:text-indigo-300">テーマ</h2>
      </div>
      <div className="p-4 space-y-2">
        {themeTree.map((node) => (
          <TreeNodeComponent
            key={node.id}
            node={node}
            onSelect={onSelectTheme}
            selectedNodeId={selectedTheme}
            isRootLevel={true}
            onAddChild={handleAddChild}
            onUpdateTheme={handleUpdateTheme}
            onDeleteTheme={handleDeleteTheme}
            onExportTheme={handleExportTheme}
          />
        ))}
      </div>
    </div>
  )
}

