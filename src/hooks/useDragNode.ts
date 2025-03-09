import { useDrag } from "react-dnd"

export function useDragNode(id: string) {
  const [{ isDragging }, drag] = useDrag({
    type: "TREE_NODE",
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  return { isDragging, drag }
}

