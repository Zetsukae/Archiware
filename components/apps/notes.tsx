"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Plus, Trash2 } from "lucide-react"
import { motion } from "framer-motion"

interface Note {
  id: string
  title: string
  content: string
  createdAt: Date
}

export function Notes() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Welcome",
      content: "Welcome to your notes app! Create, edit, and organize your thoughts.",
      createdAt: new Date(),
    },
  ])
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>("1")

  const selectedNote = notes.find((note) => note.id === selectedNoteId)

  const handleAddNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "New Note",
      content: "",
      createdAt: new Date(),
    }
    setNotes([newNote, ...notes])
    setSelectedNoteId(newNote.id)
  }

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id))
    if (selectedNoteId === id) {
      setSelectedNoteId(notes[0]?.id || null)
    }
  }

  const handleUpdateTitle = (title: string) => {
    if (selectedNote) {
      setNotes(notes.map((note) => (note.id === selectedNote.id ? { ...note, title } : note)))
    }
  }

  const handleUpdateContent = (content: string) => {
    if (selectedNote) {
      setNotes(notes.map((note) => (note.id === selectedNote.id ? { ...note, content } : note)))
    }
  }

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/10 bg-white/5">
        <div className="border-b border-white/10 p-4">
          <Button
            onClick={handleAddNote}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Note
          </Button>
        </div>

        <div className="overflow-auto p-2">
          {notes.map((note) => (
            <motion.button
              key={note.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedNoteId(note.id)}
              className={`group mb-2 w-full rounded-lg p-3 text-left transition-colors ${
                selectedNoteId === note.id ? "bg-white/10" : "hover:bg-white/5"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 truncate">
                  <div className="truncate text-sm font-medium text-white">{note.title}</div>
                  <div className="mt-1 truncate text-xs text-white/60">{note.content || "Empty note"}</div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteNote(note.id)
                  }}
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4 text-red-400 hover:text-red-300" />
                </button>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="flex flex-1 flex-col">
        {selectedNote ? (
          <div className="flex h-full flex-col p-6">
            <Input
              value={selectedNote.title}
              onChange={(e) => handleUpdateTitle(e.target.value)}
              className="mb-4 border-white/10 bg-white/5 text-2xl font-bold text-white placeholder:text-white/40"
              placeholder="Note title..."
            />
            <Textarea
              value={selectedNote.content}
              onChange={(e) => handleUpdateContent(e.target.value)}
              className="flex-1 resize-none border-white/10 bg-white/5 text-white placeholder:text-white/40"
              placeholder="Start typing..."
            />
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-white/60">
            <div className="text-center">
              <p className="mb-2">No note selected</p>
              <p className="text-sm">Create a new note to get started</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
