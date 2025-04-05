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