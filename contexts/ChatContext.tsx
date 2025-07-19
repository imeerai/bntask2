"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import platformData from "@/data/platform-data.json"

interface Message {
  id: string
  senderId: string
  receiverId: string
  message: string
  timestamp: string
  read: boolean
  type: "text" | "file" | "image"
}

interface ChatContextType {
  messages: Message[]
  sendMessage: (receiverId: string, message: string) => void
  markAsRead: (messageId: string) => void
  getConversation: (userId1: string, userId2: string) => Message[]
  getUnreadCount: (userId: string) => number
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>(platformData.messages as Message[])

  const sendMessage = (receiverId: string, message: string) => {
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}")

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      receiverId,
      message,
      timestamp: new Date().toISOString(),
      read: false,
      type: "text",
    }

    setMessages((prev) => [...prev, newMessage])
  }

  const markAsRead = (messageId: string) => {
    setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, read: true } : msg)))
  }

  const getConversation = (userId1: string, userId2: string) => {
    return messages
      .filter(
        (msg) =>
          (msg.senderId === userId1 && msg.receiverId === userId2) ||
          (msg.senderId === userId2 && msg.receiverId === userId1),
      )
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
  }

  const getUnreadCount = (userId: string) => {
    return messages.filter((msg) => msg.receiverId === userId && !msg.read).length
  }

  return (
    <ChatContext.Provider
      value={{
        messages,
        sendMessage,
        markAsRead,
        getConversation,
        getUnreadCount,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}
