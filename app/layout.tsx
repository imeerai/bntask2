import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/AuthContext"
import { ChatProvider } from "@/contexts/ChatContext"
import { Toaster } from "@/components/ui/toaster"
import { LoadingProvider } from "@/contexts/LoadingContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Business Nexus - Where Entrepreneurs Meet Investors",
  description:
    "The premier platform connecting ambitious entrepreneurs with strategic investors. Build meaningful partnerships, secure funding, and accelerate your business growth.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0a0a0a] text-white min-h-screen antialiased`}>
        <LoadingProvider>
          <AuthProvider>
            <ChatProvider>
              {children}
              <Toaster />
            </ChatProvider>
          </AuthProvider>
        </LoadingProvider>
      </body>
    </html>
  )
}
