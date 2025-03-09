import { useDrop } from "react-dnd"

export function useDropNode(id: string, onDrop: (sourceId: string) => void) {
  const [{ isOver }, drop] = useDrop({
    accept: "TREE_NODE",
    drop: (item: { id: string }) => {
      onDrop(item.id)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  })

  return { isOver, drop }
}

