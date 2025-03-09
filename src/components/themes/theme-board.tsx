"use client"
import ReactFlow from "reactflow"
import "reactflow/dist/style.css"
import { useThemeFlow } from "@/hooks/useThemeFlow"
import { ThemeNode } from "./ThemeNode"
import { HandleButton } from "./HandleButton"

const nodeTypes = {
  theme: ThemeNode,
}

export function ThemeBoard() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, handleSave } = useThemeFlow()

  return (
    <div className="w-full h-[600px]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-right"
      >
        {nodes.map((node) => (
          <HandleButton key={node.id} nodeId={node.id} />
        ))}
      </ReactFlow>
      <button onClick={handleSave} className="mt-4 bg-primary text-white px-4 py-2 rounded">
        Save
      </button>
    </div>
  )
}

