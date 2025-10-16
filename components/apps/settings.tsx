"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { User, Bell, Palette, Info, Globe, Volume2, Shield, HardDrive } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

const settingsCategories = [
  { id: "account", name: "Account", icon: User, color: "bg-blue-500/20 text-blue-400" },
  { id: "notifications", name: "Notifications", icon: Bell, color: "bg-purple-500/20 text-purple-400" },
  { id: "appearance", name: "Appearance", icon: Palette, color: "bg-pink-500/20 text-pink-400" },
  { id: "language", name: "Language & Region", icon: Globe, color: "bg-green-500/20 text-green-400" },
  { id: "sound", name: "Sound", icon: Volume2, color: "bg-orange-500/20 text-orange-400" },
  { id: "privacy", name: "Privacy & Security", icon: Shield, color: "bg-red-500/20 text-red-400" },
  { id: "storage", name: "Storage", icon: HardDrive, color: "bg-cyan-500/20 text-cyan-400" },
  { id: "about", name: "About", icon: Info, color: "bg-gray-500/20 text-gray-400" },
]

export function Settings() {
  const [selectedCategory, setSelectedCategory] = useState("account")
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [soundEffects, setSoundEffects] = useState(true)
  const [autoUpdate, setAutoUpdate] = useState(true)
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = "/lockscreen"
  }

  const renderContent = () => {
    switch (selectedCategory) {
      case "account":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white">Account Settings</h3>
              <p className="text-sm text-white/60">Manage your account and profile</p>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/60">Email</span>
                    <span className="text-white">user@example.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Account Type</span>
                    <span className="text-white">Premium</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Member Since</span>
                    <span className="text-white">January 2025</span>
                  </div>
                </div>
              </div>
              <Button onClick={handleSignOut} variant="destructive" className="w-full">
                Sign Out
              </Button>
            </div>
          </div>
        )
      case "notifications":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white">Notifications</h3>
              <p className="text-sm text-white/60">Configure how you receive notifications</p>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notifications" className="text-white">
                      Enable notifications
                    </Label>
                    <p className="text-sm text-white/60">Receive system notifications</p>
                  </div>
                  <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sound-notif" className="text-white">
                      Sound alerts
                    </Label>
                    <p className="text-sm text-white/60">Play sound for notifications</p>
                  </div>
                  <Switch id="sound-notif" checked={soundEffects} onCheckedChange={setSoundEffects} />
                </div>
              </div>
            </div>
          </div>
        )
      case "appearance":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white">Appearance</h3>
              <p className="text-sm text-white/60">Customize the look and feel</p>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="darkMode" className="text-white">
                      Dark mode
                    </Label>
                    <p className="text-sm text-white/60">Use dark theme</p>
                  </div>
                  <Switch id="darkMode" checked={darkMode} onCheckedChange={setDarkMode} />
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <div>
                  <Label className="text-white">Accent Color</Label>
                  <div className="mt-3 flex gap-3">
                    {["bg-blue-500", "bg-purple-500", "bg-pink-500", "bg-green-500", "bg-orange-500"].map((color) => (
                      <button
                        key={color}
                        className={`h-10 w-10 rounded-full ${color} transition-transform hover:scale-110`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case "language":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white">Language & Region</h3>
              <p className="text-sm text-white/60">Set your language and regional preferences</p>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/60">Language</span>
                    <span className="text-white">English (US)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Region</span>
                    <span className="text-white">United States</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Time Zone</span>
                    <span className="text-white">PST (UTC-8)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case "sound":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white">Sound</h3>
              <p className="text-sm text-white/60">Manage audio settings</p>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="soundEffects" className="text-white">
                      Sound effects
                    </Label>
                    <p className="text-sm text-white/60">Play UI sound effects</p>
                  </div>
                  <Switch id="soundEffects" checked={soundEffects} onCheckedChange={setSoundEffects} />
                </div>
              </div>
            </div>
          </div>
        )
      case "privacy":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white">Privacy & Security</h3>
              <p className="text-sm text-white/60">Control your privacy settings</p>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoUpdate" className="text-white">
                      Automatic updates
                    </Label>
                    <p className="text-sm text-white/60">Keep your system up to date</p>
                  </div>
                  <Switch id="autoUpdate" checked={autoUpdate} onCheckedChange={setAutoUpdate} />
                </div>
              </div>
            </div>
          </div>
        )
      case "storage":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white">Storage</h3>
              <p className="text-sm text-white/60">Manage your storage space</p>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <div className="space-y-4">
                  <div>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-white/60">Used</span>
                      <span className="text-white">45.2 GB of 128 GB</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-[35%] rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Applications</span>
                      <span className="text-white">12.4 GB</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Documents</span>
                      <span className="text-white">8.7 GB</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Media</span>
                      <span className="text-white">24.1 GB</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case "about":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white">About</h3>
              <p className="text-sm text-white/60">System information</p>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">OS Version</span>
                    <span className="text-white">WebOS 1.0.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Build</span>
                    <span className="text-white">2025.01.16</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Kernel</span>
                    <span className="text-white">Next.js 15</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex h-full">
      <div className="w-64 border-r border-white/10 bg-white/5 p-4 backdrop-blur-xl">
        <h2 className="mb-4 px-2 text-lg font-semibold text-white">Paramètres</h2>
        <div className="space-y-1">
          {settingsCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 transition-all ${
                selectedCategory === category.id
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${category.color}`}>
                <category.icon className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">{category.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  )
}
