"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useReduxThemes } from "@/hooks/useReduxThemes"
import { TreeNodeSelector } from "./tree-node-selector"

interface ThemeMoveDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (targetThemeId: string) => void
  themeName: string
  nodeId: string // 移動するノードのID
}

export function ThemeMoveDialog({ open, onOpenChange, onConfirm, themeName, nodeId }: ThemeMoveDialogProps) {
  const [selectedTargetId, setSelectedTargetId] = useState<string | null>(null)
  const { themeTree } = useReduxThemes()

  // ダイアログが開かれるたびに選択をリセット
  useEffect(() => {
    if (open) {
      setSelectedTargetId(null)
    }
  }, [open])

  const handleConfirm = () => {
    if (selectedTargetId) {
      onConfirm(selectedTargetId)
    }
    onOpenChange(false)
  }

  // 移動元のノードとその子孫ノードのIDを取得する関数
  const getNodeAndDescendantIds = (nodeId: string): string[] => {
    const result: string[] = [nodeId]
    
    const findDescendants = (nodes: any[], parentId: string) => {
      nodes.forEach(node => {
        if (node.id === parentId && node.children) {
          node.children.forEach((child: any) => {
            result.push(child.id)
            findDescendants(nodes, child.id)
          })
        } else if (node.children) {
          findDescendants(node.children, parentId)
        }
      })
    }
    
    findDescendants(themeTree, nodeId)
    return result
  }

  // 移動できないノードのIDリスト（自分自身と子孫ノード）
  const disabledNodeIds = getNodeAndDescendantIds(nodeId)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>テーマを移動</DialogTitle>
          <DialogDescription>
            「{themeName}」を移動する親テーマを選択してください。
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 max-h-[300px] overflow-y-auto">
          <TreeNodeSelector
            nodes={themeTree}
            selectedNodeId={selectedTargetId}
            onSelectNode={setSelectedTargetId}
            disabledNodeIds={disabledNodeIds}
          />
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            キャンセル
          </Button>
          <Button onClick={handleConfirm} disabled={!selectedTargetId}>
            移動
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 