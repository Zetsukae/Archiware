"use client"

import { motion } from "framer-motion"
import { Wifi, Battery, User } from "lucide-react"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export function SystemBar() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        setUserEmail(user.email || null)
      }
    }
    getUser()

    return () => clearInterval(timer)
  }, [supabase])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  }

  const getUserName = () => {
    if (!userEmail) return "User"
    return userEmail.split("@")[0]
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 rounded-3xl border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-3xl"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
          <User className="h-5 w-5 text-white" />
        </div>
        <span className="text-sm font-medium text-white">{getUserName()}</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 rounded-3xl border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-3xl"
      >
        <Wifi className="h-5 w-5 text-white" />
        <Battery className="h-5 w-5 text-white" />
        <span className="text-sm font-medium text-white">{formatTime(currentTime)}</span>
      </motion.div>
    </div>
  )
}
