"use client"

import { motion, useDragControls } from "framer-motion"
import { X, Minus, Maximize2, Minimize2 } from "lucide-react"
import { useState, useRef, type ReactNode } from "react"

interface WindowProps {
  id: string
  title: string
  icon: ReactNode
  children: ReactNode
  onClose: () => void
  onMinimize: () => void
  initialPosition?: { x: number; y: number }
  initialSize?: { width: number; height: number }
}

export function Window({
  id,
  title,
  icon,
  children,
  onClose,
  onMinimize,
  initialPosition = { x: 100, y: 100 },
  initialSize = { width: 800, height: 600 },
}: WindowProps) {
  const [isMaximized, setIsMaximized] = useState(false)
  const [size, setSize] = useState(initialSize)
  const [position, setPosition] = useState(initialPosition)
  const dragControls = useDragControls()
  const constraintsRef = useRef(null)

  const handleMaximize = () => {
    if (!isMaximized) {
      setPosition({ x: 0, y: 0 })
      setSize({ width: window.innerWidth, height: window.innerHeight - 80 })
    } else {
      setPosition(initialPosition)
      setSize(initialSize)
    }
    setIsMaximized(!isMaximized)
  }

  return (
    <motion.div
      drag={!isMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        x: position.x,
        y: position.y,
        width: size.width,
        height: size.height,
      }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="absolute z-40 flex flex-col overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-3xl"
      style={{
        width: size.width,
        height: size.height,
      }}
    >
      {/* Window header */}
      <div
        onPointerDown={(e) => {
          if (!isMaximized) {
            dragControls.start(e)
          }
        }}
        className="flex h-12 cursor-move items-center justify-between border-b border-white/20 bg-white/5 px-4"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-6 w-6 items-center justify-center">{icon}</div>
          <span className="text-sm font-medium text-gray-800">{title}</span>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            whileTap={{ scale: 0.9 }}
            onClick={onMinimize}
            className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors"
          >
            <Minus className="h-4 w-4 text-gray-700" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            whileTap={{ scale: 0.9 }}
            onClick={handleMaximize}
            className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors"
          >
            {isMaximized ? (
              <Minimize2 className="h-4 w-4 text-gray-700" />
            ) : (
              <Maximize2 className="h-4 w-4 text-gray-700" />
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(239, 68, 68, 0.2)" }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors"
          >
            <X className="h-4 w-4 text-gray-700" />
          </motion.button>
        </div>
      </div>

      {/* Window content */}
      <div className="flex-1 overflow-auto bg-white/5">{children}</div>
    </motion.div>
  )
}
