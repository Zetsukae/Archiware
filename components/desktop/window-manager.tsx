"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { AnimatePresence } from "framer-motion"
import { Window } from "./window"

interface WindowData {
  id: string
  title: string
  icon: ReactNode
  content: ReactNode
  isMinimized: boolean
}

interface WindowManagerContextType {
  windows: WindowData[]
  openWindow: (window: Omit<WindowData, "isMinimized">) => void
  closeWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  restoreWindow: (id: string) => void
}

const WindowManagerContext = createContext<WindowManagerContextType | undefined>(undefined)

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowData[]>([])

  const openWindow = (window: Omit<WindowData, "isMinimized">) => {
    setWindows((prev) => {
      const exists = prev.find((w) => w.id === window.id)
      if (exists) {
        return prev.map((w) => (w.id === window.id ? { ...w, isMinimized: false } : w))
      }
      return [...prev, { ...window, isMinimized: false }]
    })
  }

  const closeWindow = (id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id))
  }

  const minimizeWindow = (id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)))
  }

  const restoreWindow = (id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMinimized: false } : w)))
  }

  return (
    <WindowManagerContext.Provider value={{ windows, openWindow, closeWindow, minimizeWindow, restoreWindow }}>
      {children}
      <AnimatePresence>
        {windows
          .filter((w) => !w.isMinimized)
          .map((window) => (
            <Window
              key={window.id}
              id={window.id}
              title={window.title}
              icon={window.icon}
              onClose={() => closeWindow(window.id)}
              onMinimize={() => minimizeWindow(window.id)}
            >
              {window.content}
            </Window>
          ))}
      </AnimatePresence>
    </WindowManagerContext.Provider>
  )
}

export function useWindowManager() {
  const context = useContext(WindowManagerContext)
  if (!context) {
    throw new Error("useWindowManager must be used within WindowManagerProvider")
  }
  return context
}
