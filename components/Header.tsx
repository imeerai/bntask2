"use client"

import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

export function Header() {
  const { user } = useAuth()
  const pathname = usePathname()

  // Don't show header on dashboard pages
  if (pathname.startsWith("/admin") || pathname.startsWith("/investor") || pathname.startsWith("/entrepreneur")) {
    return null
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-gray-800/50">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">BN</span>
            </div>
            <span className="text-xl font-bold gradient-text">Business Nexus</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className={`text-sm text-gray-300 hover:text-white transition-colors ${pathname === "/" ? "text-white" : ""}`}
            >
              Home
            </Link>
            <Link
              href="/docs"
              className={`text-sm text-gray-300 hover:text-white transition-colors ${pathname === "/docs" ? "text-white" : ""}`}
            >
              Docs
            </Link>
            <Link
              href="/about"
              className={`text-sm text-gray-300 hover:text-white transition-colors ${pathname === "/about" ? "text-white" : ""}`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`text-sm text-gray-300 hover:text-white transition-colors ${pathname === "/contact" ? "text-white" : ""}`}
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            {!user && (
              <>
                <Button asChild variant="ghost" className="text-sm text-gray-300 hover:text-white">
                  <Link href="/auth">Sign In</Link>
                </Button>
                <Button asChild className="btn-primary">
                  <Link href="/auth">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
