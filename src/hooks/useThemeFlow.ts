"use client"

import { useCallback } from "react"
import { useNodesState, useEdgesState, addEdge, type Connection, type Edge, useReactFlow } from "reactflow"
import { toast } from "sonner"
import { useReduxThemes } from "@/hooks/useReduxThemes" // useThemeをuseReduxThemesに変更
import type { NodeAddPosition } from "@/types/theme-board"

export function useThemeFlow() {
  const reactFlowInstance = useReactFlow()
  const {
    nodes: initialNodes,
    edges: initialEdges,
    setNodes: setContextNodes,
    setEdges: setContextEdges,
    saveThemes,
  } = useReduxThemes() // useThemeをuseReduxThemesに変更

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: Connection | Edge) => {
      if (params.target === "all") return
      setEdges((eds) => addEdge({ ...params, animated: true }, eds))
    },
    [setEdges],
  )

  const addNodeBetween = useCallback(
    (sourceId: string, position: NodeAddPosition) => {
      const sourceNode = nodes.find((n) => n.id === sourceId)
      if (!sourceNode) return

      const newNodeId = crypto.randomUUID()
      const parentEdge = edges.find((e) => e.target === sourceId)
      const childEdges = edges.filter((e) => e.source === sourceId)

      // Calculate new node position
      const yOffset = position === "top" ? -100 : 100
      const newPosition = {
        x: sourceNode.position.x,
        y: sourceNode.position.y + yOffset,
      }

      // Add new node
      const newNode = {
        id: newNodeId,
        type: "theme",
        position: newPosition,
        data: {
          label: "New Theme",
          onChange: (newLabel: string) => {
            setNodes((nds) =>
              nds.map((node) => {
                if (node.id === newNodeId) {
                  return {
                    ...node,
                    data: {
                      ...node.data,
                      label: newLabel,
                    },
                  }
                }
                return node
              }),
            )
          },
          onAdd: addNodeBetween,
        },
      }

      // Update edges
      let newEdges = [...edges]
      if (position === "top" && parentEdge) {
        // Remove old parent connection
        newEdges = newEdges.filter((e) => e.id !== parentEdge.id)
        // Add new connections
        newEdges.push({
          id: `e-${parentEdge.source}-${newNodeId}`,
          source: parentEdge.source,
          target: newNodeId,
          animated: true,
        })
        newEdges.push({
          id: `e-${newNodeId}-${sourceId}`,
          source: newNodeId,
          target: sourceId,
          animated: true,
        })
      } else if (position === "bottom") {
        // Move child connections to new node
        childEdges.forEach((edge) => {
          newEdges = newEdges.filter((e) => e.id !== edge.id)
          newEdges.push({
            id: `e-${newNodeId}-${edge.target}`,
            source: newNodeId,
            target: edge.target,
            animated: true,
          })
        })
        // Add connection from source to new node
        newEdges.push({
          id: `e-${sourceId}-${newNodeId}`,
          source: sourceId,
          target: newNodeId,
          animated: true,
        })
      }

      setNodes((nds) => [...nds, newNode])
      setEdges(newEdges)

      // Automatically adjust node positions to prevent overlap
      setTimeout(() => {
        reactFlowInstance.fitView()
      }, 50)
    },
    [nodes, edges, setNodes, setEdges, reactFlowInstance],
  )

  const handleSave = async () => {
    try {
      setContextNodes(nodes)
      setContextEdges(edges)
      await saveThemes()
      toast.success("保存しました", {
        description: "テーマの変更を保存しました。",
      })
    } catch (error) {
      toast.error("エラーが発生しました", {
        description: "テーマの保存に失敗しました。",
      })
    }
  }

  // Update nodes with onAdd callback
  const nodesWithCallbacks = nodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      onAdd: addNodeBetween,
    },
  }))

  return {
    nodes: nodesWithCallbacks,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    handleSave,
  }
}

