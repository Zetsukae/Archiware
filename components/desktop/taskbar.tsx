"use client"

import type { User } from "@supabase/supabase-js"
import { motion } from "framer-motion"
import { Search, Grid3x3, Volume2, Wifi, Battery, LogOut } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface TaskbarProps {
  user: User
  time: Date
}

export function Taskbar({ user, time }: TaskbarProps) {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/login")
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="absolute bottom-0 left-0 right-0 z-50"
    >
      <div className="mx-4 mb-4 rounded-full border border-white/20 bg-white/10 px-6 py-3 shadow-2xl backdrop-blur-3xl">
        <div className="flex items-center justify-between">
          {/* Left section - Start button and search */}
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-400 to-pink-400 shadow-lg transition-all hover:shadow-purple-400/50"
            >
              <Grid3x3 className="h-5 w-5 text-white" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex h-10 items-center gap-2 rounded-xl bg-white/10 px-4 transition-all hover:bg-white/20"
            >
              <Search className="h-4 w-4 text-gray-700" />
              <span className="text-sm text-gray-700">Search</span>
            </motion.button>
          </div>

          {/* Center section - Pinned apps */}
          <div className="flex items-center gap-1">{/* Placeholder for pinned apps */}</div>

          {/* Right section - System tray */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-gray-700">
              <Wifi className="h-4 w-4" />
              <Volume2 className="h-4 w-4" />
              <Battery className="h-4 w-4" />
            </div>

            <div className="h-8 w-px bg-white/20" />

            <div className="flex flex-col items-end">
              <span className="text-sm font-medium text-gray-800">{formatTime(time)}</span>
              <span className="text-xs text-gray-600">{formatDate(time)}</span>
            </div>

            <div className="h-8 w-px bg-white/20" />

            <Button
              onClick={handleLogout}
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-xl text-gray-700 hover:bg-white/20 hover:text-gray-800"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
