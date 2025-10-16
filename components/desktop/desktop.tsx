"use client"

import type { User } from "@supabase/supabase-js"
import { Dock } from "./dock"
import { SystemBar } from "./system-bar"
import { DesktopIcon } from "./desktop-icon"
import { WindowManagerProvider, useWindowManager } from "./window-manager"
import { Globe, Calculator, FileText, Settings, ImageIcon, Music } from "lucide-react"
import { Browser } from "@/components/apps/browser"
import { Calculator as CalculatorApp } from "@/components/apps/calculator"
import { Notes } from "@/components/apps/notes"
import { Settings as SettingsApp } from "@/components/apps/settings"
import { motion } from "framer-motion"

interface DesktopProps {
  user: User
}

function DesktopContent({ user }: DesktopProps) {
  const { openWindow } = useWindowManager()

  const desktopApps = [
    {
      id: "browser",
      name: "Browser",
      icon: Globe,
      color: "from-purple-400 to-pink-400",
      content: <Browser />,
    },
    {
      id: "calculator",
      name: "Calculator",
      icon: Calculator,
      color: "from-violet-400 to-purple-400",
      content: <CalculatorApp />,
    },
    {
      id: "notes",
      name: "Notes",
      icon: FileText,
      color: "from-pink-400 to-rose-400",
      content: <Notes />,
    },
    {
      id: "photos",
      name: "Photos",
      icon: ImageIcon,
      color: "from-blue-400 to-violet-400",
      content: (
        <div className="flex h-full items-center justify-center p-6 text-white/60">Photos app coming soon...</div>
      ),
    },
    {
      id: "music",
      name: "Music",
      icon: Music,
      color: "from-indigo-400 to-purple-400",
      content: (
        <div className="flex h-full items-center justify-center p-6 text-white/60">Music app coming soon...</div>
      ),
    },
    {
      id: "settings",
      name: "Settings",
      icon: Settings,
      color: "from-slate-400 to-gray-400",
      content: <SettingsApp />,
    },
  ]

  const handleAppClick = (app: (typeof desktopApps)[0]) => {
    openWindow({
      id: app.id,
      title: app.name,
      icon: <app.icon className="h-4 w-4 text-white" />,
      content: app.content,
    })
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200">
      <div className="absolute inset-0">
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-[10%] left-[15%] h-[500px] w-[500px] rounded-full bg-gradient-to-br from-purple-300/40 to-pink-300/40 blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 40, 0],
            x: [0, -30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-[20%] right-[10%] h-[600px] w-[600px] rounded-full bg-gradient-to-br from-blue-300/30 to-purple-300/30 blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, 15, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-[15%] left-[25%] h-[400px] w-[400px] rounded-full bg-gradient-to-br from-pink-300/35 to-violet-300/35 blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 25, 0],
            x: [0, -20, 0],
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 9,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute bottom-[20%] right-[20%] h-[450px] w-[450px] rounded-full bg-gradient-to-br from-violet-300/30 to-blue-300/30 blur-3xl"
        />
      </div>

      <SystemBar />

      {/* Desktop icons grid */}
      <div className="relative z-10 h-[calc(100vh-8rem)] overflow-auto p-8 pt-24">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
          {desktopApps.map((app) => (
            <div key={app.id} onClick={() => handleAppClick(app)}>
              <DesktopIcon name={app.name} icon={app.icon} color={app.color} />
            </div>
          ))}
        </div>
      </div>

      <Dock />
    </div>
  )
}

export function Desktop({ user }: DesktopProps) {
  return (
    <WindowManagerProvider>
      <DesktopContent user={user} />
    </WindowManagerProvider>
  )
}
