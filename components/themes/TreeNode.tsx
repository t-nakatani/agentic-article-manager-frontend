"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { CollapseButton } from "./CollapseButton"
import { ThemeNodeActions } from "./ThemeNodeActions"
import type { TreeNode } from "@/types/theme"

interface TreeNodeProps {
  node: TreeNode
  level?: number
  onSelect: (id: string) => void
  selectedNodeId: string | null
  isRootLevel?: boolean
  onAddChild: (parentId: string | null) => void
  onUpdateTheme: (id: string, name: string) => void
  onDeleteTheme?: (id: string) => void
  isNewNode?: boolean
  isReadOnly?: boolean
}

export function TreeNodeComponent({
  node,
  level = 0,
  onSelect,
  selectedNodeId,
  isRootLevel = false,
  onAddChild,
  onUpdateTheme,
  onDeleteTheme,
  isNewNode = false,
  isReadOnly = false,
}: TreeNodeProps) {
  const shouldExpandInitially = isRootLevel || node.id === "all" || isNewNode
  const [isExpanded, setIsExpanded] = React.useState(shouldExpandInitially)
  const hasChildren = node.children && node.children.length > 0
  const isRootNode = node.id === "all"

  React.useEffect(() => {
    if (node.children?.some((child) => child.isNewNode)) {
      setIsExpanded(true)
    }
  }, [node.children])

  const handleAddChild = () => {
    onAddChild(node.id)
  }

  const handleRename = (newName: string) => {
    onUpdateTheme(node.id, newName)
  }

  const handleDelete = () => {
    if (onDeleteTheme) {
      onDeleteTheme(node.id)
    }
  }

  return (
    <div className="relative">
      <div
        className={cn(
          "relative flex items-center gap-2 py-2 rounded-lg transition-all",
          "hover:bg-theme-100/50 dark:hover:bg-theme-900/50",
          "group",
        )}
      >
        <CollapseButton isExpanded={isExpanded} onToggle={() => setIsExpanded(!isExpanded)} disabled={!hasChildren} />

        <div
          className={cn(
            "flex-1 min-h-[2rem] flex items-center justify-between px-2 py-1.5 rounded-md",
            "shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_0_rgba(0,0,0,0.25)]",
            "transition-all duration-200",
            "hover:shadow-[0_2px_4px_0_rgba(0,0,0,0.1)] dark:hover:shadow-[0_2px_4px_0_rgba(0,0,0,0.3)]",
            selectedNodeId === node.id && "bg-theme-100 dark:bg-theme-800",
            isRootNode && "bg-theme-100 dark:bg-theme-800",
            !isRootNode && "bg-white dark:bg-gray-950",
          )}
        >
          <div
            onClick={() => onSelect(node.id === "all" ? "all" : node.label.toLowerCase())}
            className="flex-1 cursor-pointer"
          >
            <span className={cn("text-sm", isRootNode && "font-medium")}>{node.label}</span>
          </div>

          {!isReadOnly && (
            <ThemeNodeActions
              nodeId={node.id}
              nodeName={node.label}
              isRootNode={isRootNode}
              onAddChild={handleAddChild}
              onRename={handleRename}
              onDelete={handleDelete}
              className="opacity-0 group-hover:opacity-100 hover:opacity-100"
            />
          )}
        </div>
      </div>

      {hasChildren && (
        <div
          className={cn(
            "relative ml-2 pl-2 mt-1",
            "before:absolute before:left-0 before:top-0 before:bottom-4",
            "before:w-px before:bg-theme-200 dark:before:bg-theme-700",
            !isExpanded && "hidden",
          )}
        >
          {node.children.map((child) => (
            <TreeNodeComponent
              key={child.id}
              node={child}
              level={level + 1}
              onSelect={onSelect}
              selectedNodeId={selectedNodeId}
              onAddChild={onAddChild}
              onUpdateTheme={onUpdateTheme}
              onDeleteTheme={onDeleteTheme}
              isNewNode={child.isNewNode}
              isReadOnly={isReadOnly}
            />
          ))}
        </div>
      )}
    </div>
  )
}

