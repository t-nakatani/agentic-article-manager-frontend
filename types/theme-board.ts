import type { Node, Edge, Position } from "reactflow"

export interface ThemeNode extends Node {
  data: {
    label: string
    onChange: (newLabel: string) => void
    onAdd: (id: string, position: NodeAddPosition) => void
  }
}

export type NodeAddPosition = "top" | "bottom"

export interface HandleButtonProps {
  position: NodeAddPosition
  nodeId: string
  onAdd: (id: string, position: NodeAddPosition) => void
  show: boolean
}

export interface ThemeNodeData {
  label: string
  onChange: (newLabel: string) => void
  onAdd: (id: string, position: NodeAddPosition) => void
}

export interface ThemeNodeProps {
  id: string
  data: ThemeNodeData
  selected: boolean
}

export interface ThemeHandleProps {
  type: "source" | "target"
  position: Position
  onShowAddButton: (show: boolean) => void
}

export interface ThemeFlowProps {
  nodes: ThemeNode[]
  edges: Edge[]
  onNodesChange: (changes: any) => void
  onEdgesChange: (changes: any) => void
  onConnect: (connection: any) => void
  onSave: () => void
}

