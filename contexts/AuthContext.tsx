"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import platformData from "@/data/platform-data.json"
import { useLoading } from "./LoadingContext"

interface User {
  id: string
  email: string
  role: "admin" | "investor" | "entrepreneur"
  name: string
  avatar: string
  [key: string]: any
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { setLoading: setGlobalLoading, setLoadingText } = useLoading()

  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setGlobalLoading(true)
    setLoadingText("Signing you in...")

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const foundUser = platformData.users.find((u) => u.email === email && u.password === password)

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword as User)
      localStorage.setItem("user", JSON.stringify(userWithoutPassword))

      // Redirect based on role
      setTimeout(() => {
        switch (foundUser.role) {
          case "admin":
            router.push("/admin")
            break
          case "investor":
            router.push("/investor")
            break
          case "entrepreneur":
            router.push("/entrepreneur")
            break
        }
        setGlobalLoading(false)
      }, 500)

      return true
    }

    setGlobalLoading(false)
    return false
  }

  const logout = () => {
    setGlobalLoading(true)
    setLoadingText("Logging you out...")

    setTimeout(() => {
      setUser(null)
      localStorage.removeItem("user")
      router.push("/")
      setGlobalLoading(false)
    }, 1000)
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
  }

  return <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
