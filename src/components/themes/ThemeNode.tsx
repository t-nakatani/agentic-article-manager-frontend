"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Handle, Position } from "reactflow"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import type { ThemeNodeProps, ThemeHandleProps } from "@/types/theme-board"

function ThemeHandle({ type, position, onShowAddButton }: ThemeHandleProps) {
  return (
    <Handle
      type={type}
      position={position}
      className="w-3 h-3 bg-indigo-500 border-2 border-white dark:border-indigo-950"
      onMouseEnter={() => onShowAddButton(true)}
      onMouseLeave={() => onShowAddButton(false)}
    />
  )
}

export function ThemeNode({ id, data, selected }: ThemeNodeProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [label, setLabel] = useState(data.label)
  const [showTopAddButton, setShowTopAddButton] = useState(false)
  const [showBottomAddButton, setShowBottomAddButton] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDoubleClick = () => {
    if (id === "all") return
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    }, 0)
  }

  const handleBlur = () => {
    setIsEditing(false)
    if (label !== data.label) {
      data.onChange(label)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleBlur()
    }
  }

  return (
    <div
      className={cn(
        "px-4 py-2 rounded-md shadow-md border-2 min-w-[150px] text-center",
        selected ? "border-indigo-500" : "border-indigo-200 dark:border-indigo-800",
        id === "all" ? "bg-indigo-100 dark:bg-indigo-900" : "bg-white dark:bg-indigo-950",
        "hover:bg-indigo-50 dark:hover:bg-indigo-900/70",
        "transition-all duration-200",
      )}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <Input
          ref={inputRef}
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="text-center p-0 h-auto border-none shadow-none"
          autoFocus
        />
      ) : (
        <div className="font-medium text-indigo-800 dark:text-indigo-300">{data.label}</div>
      )}

      <ThemeHandle type="target" position={Position.Top} onShowAddButton={(show) => setShowTopAddButton(show)} />
      <ThemeHandle type="source" position={Position.Bottom} onShowAddButton={(show) => setShowBottomAddButton(show)} />

      {showTopAddButton && (
        <div
          className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={() => data.onAdd(id, "top")}
        >
          <div className="bg-indigo-500 text-white rounded-full w-5 h-5 flex items-center justify-center">+</div>
        </div>
      )}

      {showBottomAddButton && (
        <div
          className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={() => data.onAdd(id, "bottom")}
        >
          <div className="bg-indigo-500 text-white rounded-full w-5 h-5 flex items-center justify-center">+</div>
        </div>
      )}
    </div>
  )
}

