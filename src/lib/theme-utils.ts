import type { Node, Edge } from "reactflow"
import type { TreeNode } from "@/types/theme"

export function convertFlowNodesToTreeNodes(nodes: Node[], edges: Edge[]): TreeNode[] {
  // Create a map of parent-child relationships from edges
  const childrenMap = new Map<string, string[]>()
  edges.forEach((edge) => {
    const parent = edge.source
    const child = edge.target
    if (!childrenMap.has(parent)) {
      childrenMap.set(parent, [])
    }
    childrenMap.get(parent)?.push(child)
  })

  // Convert nodes to TreeNode format
  const nodeMap = new Map(nodes.map((node) => [node.id, { id: node.id, label: node.data.label }]))
  const rootNodes: TreeNode[] = []

  // Find root nodes (nodes with no incoming edges)
  const hasIncomingEdge = new Set(edges.map((edge) => edge.target))
  nodes.forEach((node) => {
    if (!hasIncomingEdge.has(node.id)) {
      const treeNode = createTreeNode(node.id, nodeMap, childrenMap)
      if (treeNode) {
        rootNodes.push(treeNode)
      }
    }
  })

  return rootNodes
}

function createTreeNode(
  nodeId: string,
  nodeMap: Map<string, { id: string; label: string }>,
  childrenMap: Map<string, string[]>,
): TreeNode | null {
  const node = nodeMap.get(nodeId)
  if (!node) return null

  const children = childrenMap.get(nodeId) || []
  return {
    id: node.id,
    label: node.label,
    children: children
      .map((childId) => createTreeNode(childId, nodeMap, childrenMap))
      .filter((child): child is TreeNode => child !== null),
  }
}

// その他の既存のユーティリティ関数はそのまま...

