"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function Calculator() {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [newNumber, setNewNumber] = useState(true)

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num)
      setNewNumber(false)
    } else {
      setDisplay(display === "0" ? num : display + num)
    }
  }

  const handleOperation = (op: string) => {
    const current = Number.parseFloat(display)
    if (previousValue === null) {
      setPreviousValue(current)
    } else if (operation) {
      const result = calculate(previousValue, current, operation)
      setDisplay(String(result))
      setPreviousValue(result)
    }
    setOperation(op)
    setNewNumber(true)
  }

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case "+":
        return a + b
      case "-":
        return a - b
      case "×":
        return a * b
      case "÷":
        return a / b
      default:
        return b
    }
  }

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const result = calculate(previousValue, Number.parseFloat(display), operation)
      setDisplay(String(result))
      setPreviousValue(null)
      setOperation(null)
      setNewNumber(true)
    }
  }

  const handleClear = () => {
    setDisplay("0")
    setPreviousValue(null)
    setOperation(null)
    setNewNumber(true)
  }

  const handleDecimal = () => {
    if (!display.includes(".")) {
      setDisplay(display + ".")
      setNewNumber(false)
    }
  }

  const buttons = [
    { label: "C", onClick: handleClear, className: "bg-red-500/20 hover:bg-red-500/30 text-red-400" },
    { label: "÷", onClick: () => handleOperation("÷"), className: "bg-blue-500/20 hover:bg-blue-500/30 text-blue-400" },
    { label: "×", onClick: () => handleOperation("×"), className: "bg-blue-500/20 hover:bg-blue-500/30 text-blue-400" },
    { label: "-", onClick: () => handleOperation("-"), className: "bg-blue-500/20 hover:bg-blue-500/30 text-blue-400" },
    { label: "7", onClick: () => handleNumber("7") },
    { label: "8", onClick: () => handleNumber("8") },
    { label: "9", onClick: () => handleNumber("9") },
    { label: "+", onClick: () => handleOperation("+"), className: "bg-blue-500/20 hover:bg-blue-500/30 text-blue-400" },
    { label: "4", onClick: () => handleNumber("4") },
    { label: "5", onClick: () => handleNumber("5") },
    { label: "6", onClick: () => handleNumber("6") },
    {
      label: "=",
      onClick: handleEquals,
      className: "row-span-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400",
    },
    { label: "1", onClick: () => handleNumber("1") },
    { label: "2", onClick: () => handleNumber("2") },
    { label: "3", onClick: () => handleNumber("3") },
    { label: "0", onClick: () => handleNumber("0"), className: "col-span-2" },
    { label: ".", onClick: handleDecimal },
  ]

  return (
    <div className="flex h-full flex-col gap-4 p-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-right backdrop-blur-xl">
        <div className="text-4xl font-bold text-white">{display}</div>
        {operation && (
          <div className="mt-2 text-sm text-white/60">
            {previousValue} {operation}
          </div>
        )}
      </div>

      <div className="grid flex-1 grid-cols-4 gap-3">
        {buttons.map((button, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={button.className || ""}
            style={{
              gridRow: button.label === "=" ? "span 2" : undefined,
              gridColumn: button.label === "0" ? "span 2" : undefined,
            }}
          >
            <Button
              onClick={button.onClick}
              className={`h-full w-full rounded-xl border border-white/10 bg-white/5 text-xl font-semibold text-white backdrop-blur-xl transition-all hover:bg-white/10 ${button.className || ""}`}
            >
              {button.label}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
