import type { TreeNode, TreeAction } from "@/types/theme"

export function treeReducer(state: TreeNode[], action: TreeAction): TreeNode[] {
  switch (action.type) {
    case "ADD_NODE": {
      const newNode: TreeNode = { id: crypto.randomUUID(), label: action.label }
      if (!action.parentId) {
        return [...state, newNode]
      }
      return state.map((node) => updateNodeChildren(node, action.parentId, (children) => [...children, newNode]))
    }
    case "DELETE_NODE": {
      return deleteNode(state, action.id)
    }
    case "MOVE_NODE": {
      if (action.sourceId === action.targetId) return state
      const sourceNode = findNode(state, action.sourceId)
      if (!sourceNode) return state
      const newState = deleteNode(state, action.sourceId)
      return newState.map((node) => updateNodeChildren(node, action.targetId, (children) => [...children, sourceNode]))
    }
    case "RENAME_NODE": {
      return state.map((node) => updateNode(node, action.id, { label: action.label }))
    }
    default:
      return state
  }
}

export function updateNodeChildren(
  node: TreeNode,
  targetId: string,
  updateFn: (children: TreeNode[]) => TreeNode[],
): TreeNode {
  if (node.id === targetId) {
    return {
      ...node,
      children: updateFn(node.children || []),
    }
  }
  if (node.children) {
    return {
      ...node,
      children: node.children.map((child) => updateNodeChildren(child, targetId, updateFn)),
    }
  }
  return node
}

export function updateNode(node: TreeNode, targetId: string, updates: Partial<TreeNode>): TreeNode {
  if (node.id === targetId) {
    return { ...node, ...updates }
  }
  if (node.children) {
    return {
      ...node,
      children: node.children.map((child) => updateNode(child, targetId, updates)),
    }
  }
  return node
}

export function deleteNode(nodes: TreeNode[], targetId: string): TreeNode[] {
  return nodes
    .filter((node) => node.id !== targetId)
    .map((node) => {
      if (node.children) {
        return {
          ...node,
          children: deleteNode(node.children, targetId),
        }
      }
      return node
    })
}

export function findNode(nodes: TreeNode[], targetId: string): TreeNode | null {
  for (const node of nodes) {
    if (node.id === targetId) return node
    if (node.children) {
      const found = findNode(node.children, targetId)
      if (found) return found
    }
  }
  return null
}

