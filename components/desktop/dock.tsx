"use client"

import { motion } from "framer-motion"
import { useWindowManager } from "./window-manager"
import { Globe, Calculator, FileText, Settings } from "lucide-react"

const dockApps = [
  { id: "browser", name: "Browser", icon: Globe, color: "bg-blue-500" },
  { id: "calculator", name: "Calculator", icon: Calculator, color: "bg-orange-500" },
  { id: "notes", name: "Notes", icon: FileText, color: "bg-yellow-500" },
  { id: "settings", name: "Settings", icon: Settings, color: "bg-gray-500" },
]

export function Dock() {
  const { openWindow } = useWindowManager()

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2"
    >
      <div className="flex items-center gap-2 rounded-3xl border border-white/20 bg-white/10 px-3 py-2 shadow-2xl backdrop-blur-3xl">
        {dockApps.map((app, index) => (
          <motion.button
            key={app.id}
            onClick={() => openWindow(app.id as any, app.name)}
            className={`group relative flex h-14 w-14 items-center justify-center rounded-2xl ${app.color} transition-all duration-300 hover:scale-110`}
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <app.icon className="h-7 w-7 text-white" />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="absolute -top-12 rounded-xl border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-white backdrop-blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {app.name}
            </motion.div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
