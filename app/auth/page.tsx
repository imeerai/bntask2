"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { login, user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    // Redirect if already logged in
    if (user) {
      switch (user.role) {
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
    }
  }, [user, router])

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const success = await login(email, password)

    if (!success) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please check your credentials and try again.",
        variant: "destructive",
      })
    }

    setIsLoading(false)
  }

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast({
      title: "Sign Up Coming Soon",
      description: "Registration functionality will be available soon. Please use demo credentials for now.",
    })
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors text-xs">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Logo and Title */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-base">BN</span>
          </div>
          <h1 className="text-xl font-bold gradient-text mb-2">Welcome to Business Nexus</h1>
          <p className="text-gray-400 text-xs">Connect with investors and entrepreneurs worldwide</p>
        </div>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-900/50 border border-gray-800">
            <TabsTrigger
              value="signin"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 text-xs"
            >
              Sign In
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 text-xs"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <Card className="glass-effect border-gray-800/50">
              <CardHeader className="text-center">
                <CardTitle className="text-base">Sign In to Your Account</CardTitle>
                <CardDescription className="text-xs">Enter your credentials to access your dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder=""
                      required
                      className="bg-gray-800/50 border-gray-700 focus:border-purple-500 h-9 text-xs placeholder:text-gray-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-xs font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder=""
                        required
                        className="bg-gray-800/50 border-gray-700 focus:border-purple-500 h-9 pr-10 text-xs placeholder:text-gray-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full btn-primary h-9 text-xs" disabled={isLoading}>
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>

                {/* Demo Credentials */}
                <div className="mt-6 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                  <h3 className="font-semibold mb-3 text-center text-purple-400 text-xs">Demo Credentials</h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Admin:</span>
                      <span className="text-white font-mono text-xs">admin@imeer.ai / Admin123</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Investor:</span>
                      <span className="text-white font-mono text-xs">investor@imeer.ai / investor</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Entrepreneur:</span>
                      <span className="text-white font-mono text-xs">entrepreneur@imeer.ai</span>
                    </div>
                    <div className="flex justify-end">
                      <span className="text-white font-mono text-xs">/ entrepreneur</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card className="glass-effect border-gray-800/50">
              <CardHeader className="text-center">
                <CardTitle className="text-base">Create Your Account</CardTitle>
                <CardDescription className="text-xs">Join our community of entrepreneurs and investors</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-xs font-medium">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder=""
                        required
                        className="bg-gray-800/50 border-gray-700 focus:border-purple-500 h-9 text-xs placeholder:text-gray-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-xs font-medium">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder=""
                        required
                        className="bg-gray-800/50 border-gray-700 focus:border-purple-500 h-9 text-xs placeholder:text-gray-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-xs font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="signup-email"
                      name="email"
                      type="email"
                      placeholder=""
                      required
                      className="bg-gray-800/50 border-gray-700 focus:border-purple-500 h-9 text-xs placeholder:text-gray-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-xs font-medium">
                      I am a...
                    </Label>
                    <Select name="role" required>
                      <SelectTrigger className="bg-gray-800/50 border-gray-700 focus:border-purple-500 h-9 text-xs">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
                        <SelectItem value="investor">Investor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-xs font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder=""
                        required
                        className="bg-gray-800/50 border-gray-700 focus:border-purple-500 h-9 pr-10 text-xs placeholder:text-gray-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full btn-primary h-9 text-xs">
                    Create Account
                  </Button>
                </form>

                <div className="mt-4 text-center text-xs text-gray-400">
                  By creating an account, you agree to our{" "}
                  <Link href="/docs" className="text-purple-400 hover:text-purple-300">
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/docs" className="text-purple-400 hover:text-purple-300">
                    Privacy Policy
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
