"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, RotateCw, Home, Star, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

interface Tab {
  id: string
  title: string
  url: string
}

export function Browser() {
  const [tabs, setTabs] = useState<Tab[]>([{ id: "1", title: "New Tab", url: "https://www.example.com" }])
  const [activeTabId, setActiveTabId] = useState("1")
  const [urlInput, setUrlInput] = useState("https://www.example.com")
  const [favorites, setFavorites] = useState<string[]>([
    "https://www.google.com",
    "https://www.github.com",
    "https://www.wikipedia.org",
  ])

  const activeTab = tabs.find((tab) => tab.id === activeTabId)

  const handleNavigate = () => {
    if (activeTab) {
      setTabs(
        tabs.map((tab) =>
          tab.id === activeTabId ? { ...tab, url: urlInput, title: new URL(urlInput).hostname } : tab,
        ),
      )
    }
  }

  const handleAddTab = () => {
    const newTab: Tab = {
      id: Date.now().toString(),
      title: "New Tab",
      url: "https://www.example.com",
    }
    setTabs([...tabs, newTab])
    setActiveTabId(newTab.id)
    setUrlInput(newTab.url)
  }

  const handleCloseTab = (tabId: string) => {
    const newTabs = tabs.filter((tab) => tab.id !== tabId)
    if (newTabs.length === 0) {
      handleAddTab()
    } else {
      setTabs(newTabs)
      if (activeTabId === tabId) {
        setActiveTabId(newTabs[0].id)
        setUrlInput(newTabs[0].url)
      }
    }
  }

  const handleRefresh = () => {
    const iframe = document.getElementById(`iframe-${activeTabId}`) as HTMLIFrameElement
    if (iframe) {
      iframe.src = iframe.src
    }
  }

  const toggleFavorite = () => {
    if (favorites.includes(urlInput)) {
      setFavorites(favorites.filter((fav) => fav !== urlInput))
    } else {
      setFavorites([...favorites, urlInput])
    }
  }

  return (
    <div className="flex h-full flex-col">
      {/* Tabs bar */}
      <div className="flex items-center gap-1 border-b border-white/10 bg-white/5 px-2 py-1">
        {tabs.map((tab) => (
          <motion.div
            key={tab.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className={`group flex items-center gap-2 rounded-lg px-3 py-1.5 transition-colors ${
              activeTabId === tab.id ? "bg-white/10" : "hover:bg-white/5"
            }`}
          >
            <button
              onClick={() => {
                setActiveTabId(tab.id)
                setUrlInput(tab.url)
              }}
              className="flex-1 truncate text-left text-sm text-white/80"
            >
              {tab.title}
            </button>
            <button
              onClick={() => handleCloseTab(tab.id)}
              className="opacity-0 transition-opacity group-hover:opacity-100"
            >
              <X className="h-3 w-3 text-white/60 hover:text-white" />
            </button>
          </motion.div>
        ))}
        <Button
          onClick={handleAddTab}
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-white/60 hover:bg-white/10 hover:text-white"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Navigation bar */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 p-3">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white/60 hover:bg-white/10 hover:text-white">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white/60 hover:bg-white/10 hover:text-white">
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleRefresh}
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white/60 hover:bg-white/10 hover:text-white"
          >
            <RotateCw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white/60 hover:bg-white/10 hover:text-white">
            <Home className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-1 items-center gap-2">
          <Input
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleNavigate()}
            placeholder="Enter URL..."
            className="flex-1 border-white/10 bg-white/5 text-white placeholder:text-white/40"
          />
          <Button
            onClick={toggleFavorite}
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white/60 hover:bg-white/10 hover:text-white"
          >
            <Star className={`h-4 w-4 ${favorites.includes(urlInput) ? "fill-yellow-400 text-yellow-400" : ""}`} />
          </Button>
        </div>
      </div>

      {/* Favorites bar */}
      {favorites.length > 0 && (
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-3 py-2">
          <span className="text-xs text-white/60">Favorites:</span>
          {favorites.map((fav, index) => (
            <button
              key={index}
              onClick={() => {
                setUrlInput(fav)
                if (activeTab) {
                  setTabs(
                    tabs.map((tab) =>
                      tab.id === activeTabId ? { ...tab, url: fav, title: new URL(fav).hostname } : tab,
                    ),
                  )
                }
              }}
              className="rounded-lg bg-white/5 px-3 py-1 text-xs text-white/80 transition-colors hover:bg-white/10"
            >
              {new URL(fav).hostname}
            </button>
          ))}
        </div>
      )}

      {/* Content area */}
      <div className="relative flex-1 bg-white">
        {tabs.map((tab) => (
          <iframe
            key={tab.id}
            id={`iframe-${tab.id}`}
            src={tab.url}
            className={`h-full w-full ${activeTabId === tab.id ? "block" : "hidden"}`}
            title={tab.title}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        ))}
      </div>
    </div>
  )
}
