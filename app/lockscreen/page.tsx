"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Lock, User } from "lucide-react"

export default function LockscreenPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        setUserEmail(user.email || null)
        setEmail(user.email || "")
      }
    }
    checkUser()

    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    const handleKeyPress = (e: KeyboardEvent) => {
      if (!showLoginForm && e.key) {
        setShowLoginForm(true)
      }
    }

    window.addEventListener("keydown", handleKeyPress)

    return () => {
      clearInterval(timer)
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [supabase, showLoginForm])

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || window.location.origin,
          },
        })
        if (error) throw error
        router.push("/desktop")
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        router.push("/desktop")
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("Authentication failed")
      }
      setPassword("")
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-purple-300 via-pink-200 to-blue-200">
      <motion.div
        className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-purple-400/30 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-pink-300/30 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 40, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: 1,
            y: showLoginForm ? -100 : 0,
            scale: showLoginForm ? 0.8 : 1,
          }}
          transition={{
            duration: 0.6,
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
          className="text-center"
        >
          <h1 className="text-8xl font-light text-white drop-shadow-lg">{formatTime(currentTime)}</h1>
          <p className="mt-2 text-2xl font-light text-white/90 drop-shadow-md">{formatDate(currentTime)}</p>
        </motion.div>

        <AnimatePresence>
          {!showLoginForm && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-lg text-white/70 drop-shadow-md"
            >
              Press any key to unlock
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {showLoginForm && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 25,
                mass: 1,
              }}
              className="w-full max-w-sm"
            >
              <div className="rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-3xl">
                <div className="mb-6 flex flex-col items-center space-y-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: 0.1,
                    }}
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-xl"
                  >
                    {userEmail ? <Lock className="h-10 w-10 text-white" /> : <User className="h-10 w-10 text-white" />}
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg font-medium text-white"
                  >
                    {userEmail ? userEmail : isSignUp ? "Create Account" : "Sign In"}
                  </motion.p>
                </div>

                <form onSubmit={handleAuth} className="space-y-4">
                  {!userEmail && (
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/40"
                      autoFocus
                      required
                    />
                  )}

                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/40"
                    autoFocus={!!userEmail}
                    required
                  />

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-lg border border-red-400/20 bg-red-400/10 p-3 text-center text-sm text-red-100"
                    >
                      {error}
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-xl transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : userEmail ? "Unlock" : isSignUp ? "Sign Up" : "Sign In"}
                  </Button>

                  {!userEmail && (
                    <button
                      type="button"
                      onClick={() => setIsSignUp(!isSignUp)}
                      className="w-full text-center text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
                    </button>
                  )}
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
