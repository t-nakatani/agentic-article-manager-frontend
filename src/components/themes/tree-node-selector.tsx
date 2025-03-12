"use client"

import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface TreeNodeSelectorProps {
  nodes: any[]
  selectedNodeId: string | null
  onSelectNode: (nodeId: string) => void
  disabledNodeIds?: string[]
  level?: number
}

export function TreeNodeSelector({
  nodes,
  selectedNodeId,
  onSelectNode,
  disabledNodeIds = [],
  level = 0,
}: TreeNodeSelectorProps) {
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    all: true, // ルートノードは常に展開
  })

  const toggleExpand = (nodeId: string) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }))
  }

  return (
    <div className="space-y-1">
      {nodes.map((node) => {
        const isExpanded = expandedNodes[node.id] || false
        const hasChildren = node.children && node.children.length > 0
        const isDisabled = disabledNodeIds.includes(node.id)
        const isSelected = selectedNodeId === node.id

        return (
          <div key={node.id} className="space-y-1">
            <div
              className={cn(
                "flex items-center py-1 px-2 rounded-md",
                isSelected && !isDisabled && "bg-theme-100 dark:bg-theme-800",
                isDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-muted/50 cursor-pointer",
                level > 0 && "ml-4"
              )}
            >
              {hasChildren && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 p-0 mr-1"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleExpand(node.id)
                  }}
                >
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      isExpanded ? "transform rotate-0" : "transform rotate-[-90deg]"
                    )}
                  />
                </Button>
              )}
              {!hasChildren && <div className="w-6" />}
              <div
                className="flex-1"
                onClick={() => {
                  if (!isDisabled) {
                    onSelectNode(node.id)
                  }
                }}
              >
                {node.label}
              </div>
            </div>
            {hasChildren && isExpanded && (
              <TreeNodeSelector
                nodes={node.children}
                selectedNodeId={selectedNodeId}
                onSelectNode={onSelectNode}
                disabledNodeIds={disabledNodeIds}
                level={level + 1}
              />
            )}
          </div>
        )
      })}
    </div>
  )
} 