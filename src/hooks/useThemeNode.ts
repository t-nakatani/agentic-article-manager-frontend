"use client"

import type React from "react"

import { useState, useRef } from "react"
import type { NodeAddPosition } from "@/types/theme-board"

export function useThemeNode(id: string, initialLabel: string, onChange: (label: string) => void) {
  const [isEditing, setIsEditing] = useState(false)
  const [label, setLabel] = useState(initialLabel)
  const [showTopHandle, setShowTopHandle] = useState(false)
  const [showBottomHandle, setShowBottomHandle] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDoubleClick = () => {
    if (id === "all") return
    setIsEditing(true)
  }

  const handleBlur = () => {
    setIsEditing(false)
    onChange(label)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleBlur()
    }
  }

  const handleShowHandle = (position: NodeAddPosition, show: boolean) => {
    if (position === "top") {
      setShowTopHandle(show)
    } else {
      setShowBottomHandle(show)
    }
  }

  return {
    isEditing,
    label,
    showTopHandle,
    showBottomHandle,
    inputRef,
    setLabel,
    handleDoubleClick,
    handleBlur,
    handleKeyDown,
    handleShowHandle,
  }
}

