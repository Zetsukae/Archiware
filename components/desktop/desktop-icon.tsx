"use client"

import type { LucideIcon } from "lucide-react"
import { motion } from "framer-motion"

interface DesktopIconProps {
  name: string
  icon: LucideIcon
  color: string
}

export function DesktopIcon({ name, icon: Icon, color }: DesktopIconProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="group flex flex-col items-center gap-3 rounded-2xl p-4 transition-all duration-300 hover:bg-white/5"
    >
      <motion.div
        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 0.5 }}
        className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${color} shadow-lg shadow-black/20 backdrop-blur-xl`}
      >
        <Icon className="h-8 w-8 text-white" />
      </motion.div>
      <span className="text-sm font-medium text-white/90 text-center leading-tight">{name}</span>
    </motion.button>
  )
}
