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
  onAddChild: (parentId: string | null, name: string) => void
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
  onDeleteTheme = () => {},
  isNewNode = false,
  isReadOnly = false,
}: TreeNodeProps) {
  const isRootNode = node.id === "all"
  const hasChildren = Boolean(node.children?.length)
  
  // 展開状態の初期値を決定
  const shouldExpandInitially = React.useMemo(() => (
    isRootNode || isRootLevel || isNewNode
  ), [isRootNode, isRootLevel, isNewNode])
  
  const [isExpanded, setIsExpanded] = React.useState(shouldExpandInitially)
  const isSelected = selectedNodeId === node.id

  // 子ノードに新規ノードが追加された場合は自動的に展開
  React.useEffect(() => {
    const hasNewChild = node.children?.some(child => child.isNewNode)
    if (hasNewChild) {
      setIsExpanded(true)
    }
  }, [node.children])

  // イベントハンドラー
  const handleToggleExpand = React.useCallback(() => {
    setIsExpanded(prev => !prev)
  }, [])
  
  const handleSelect = React.useCallback(() => {
    onSelect(isRootNode ? "all" : node.id)
  }, [onSelect, isRootNode, node.id])
  
  const handleAddChild = React.useCallback((name: string) => {
    onAddChild(node.id, name)
  }, [onAddChild, node.id])
  
  const handleRename = React.useCallback((newName: string) => {
    onUpdateTheme(node.id, newName)
  }, [onUpdateTheme, node.id])
  
  const handleDelete = React.useCallback(() => {
    onDeleteTheme(node.id)
  }, [onDeleteTheme, node.id])

  return (
    <div className="relative">
      <div
        className={cn(
          "relative flex items-center gap-2 py-2 rounded-lg transition-all",
          "hover:bg-theme-100/50 dark:hover:bg-theme-900/50",
          "group",
        )}
      >
        <CollapseButton 
          isExpanded={isExpanded} 
          onToggle={handleToggleExpand} 
          disabled={!hasChildren} 
        />

        <div
          className={cn(
            "flex-1 min-h-[2rem] flex items-center justify-between px-2 py-1.5 rounded-md",
            "shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_0_rgba(0,0,0,0.25)]",
            "transition-all duration-200",
            "hover:shadow-[0_2px_4px_0_rgba(0,0,0,0.1)] dark:hover:shadow-[0_2px_4px_0_rgba(0,0,0,0.3)]",
            isSelected && "bg-theme-100 dark:bg-theme-800",
            isRootNode && "bg-theme-100 dark:bg-theme-800",
            !isRootNode && "bg-white dark:bg-gray-950",
          )}
        >
          <div
            onClick={handleSelect}
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

