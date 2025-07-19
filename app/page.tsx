"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { LoadingBar } from "@/components/LoadingBar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  DollarSign,
  Award,
  ArrowRight,
  Star,
  Shield,
  Zap,
  Globe,
  MessageCircle,
  BarChart3,
} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect logged-in users to their dashboard
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
      return
    }

    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [user, router])

  if (loading) {
    return (
      <>
        <LoadingBar />
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-3"></div>
            <p className="text-gray-400 text-xs">Loading Business Nexus...</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-transparent"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-block px-3 py-1 bg-gray-800/50 rounded-full text-xs text-gray-300 mb-6">
            Connecting Innovation with Investment
          </div>

          <h1 className="hero-title mb-6 leading-tight">
            Where Entrepreneurs <br />
            <span className="gradient-text">Meet Investors</span>
          </h1>

          <p className="text-sm text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Business Nexus is the premier platform connecting ambitious entrepreneurs with strategic investors. Build
            meaningful partnerships, secure funding, and accelerate your business growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="btn-primary text-sm px-6 py-3">
              <Link href="/auth">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="btn-secondary text-sm px-6 py-3 bg-transparent">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-gray-950/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center group">
              <div className="text-2xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform">
                500+
              </div>
              <div className="text-gray-400 text-xs">Active Investors</div>
            </div>
            <div className="text-center group">
              <div className="text-2xl font-bold text-green-400 mb-2 group-hover:scale-110 transition-transform">
                1,200+
              </div>
              <div className="text-gray-400 text-xs">Entrepreneurs</div>
            </div>
            <div className="text-center group">
              <div className="text-2xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform">
                $50M+
              </div>
              <div className="text-gray-400 text-xs">Funds Raised</div>
            </div>
            <div className="text-center group">
              <div className="text-2xl font-bold text-orange-400 mb-2 group-hover:scale-110 transition-transform">
                300+
              </div>
              <div className="text-gray-400 text-xs">Successful Deals</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Business Nexus */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Why Choose Business Nexus?</h2>
            <p className="text-sm text-gray-400 max-w-2xl mx-auto">
              Our platform provides everything you need to make successful business connections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-effect card-hover border-gray-800/50">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-base">Verified Network</CardTitle>
                <CardDescription className="text-gray-400 text-xs">
                  Connect with verified investors and entrepreneurs in our trusted ecosystem with comprehensive
                  background checks.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-effect card-hover border-gray-800/50">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-base">Smart Matching</CardTitle>
                <CardDescription className="text-gray-400 text-xs">
                  Our AI-powered system matches you with the most relevant opportunities based on your preferences and
                  history.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-effect card-hover border-gray-800/50">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-base">Secure Transactions</CardTitle>
                <CardDescription className="text-gray-400 text-xs">
                  All deals are processed through our secure, transparent platform with legal documentation support.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-effect card-hover border-gray-800/50">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-base">Real-time Communication</CardTitle>
                <CardDescription className="text-gray-400 text-xs">
                  Instant messaging, video calls, and collaboration tools to facilitate seamless communication.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-effect card-hover border-gray-800/50">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-base">Analytics Dashboard</CardTitle>
                <CardDescription className="text-gray-400 text-xs">
                  Comprehensive analytics and reporting tools to track your investment portfolio and business growth.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-effect card-hover border-gray-800/50">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-base">Global Reach</CardTitle>
                <CardDescription className="text-gray-400 text-xs">
                  Connect with investors and entrepreneurs from around the world, expanding your network globally.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-6 bg-gray-950/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Success Stories</h2>
            <p className="text-sm text-gray-400 max-w-2xl mx-auto">
              Real stories from entrepreneurs and investors who found success through our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-effect card-hover border-gray-800/50">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base">InnovateTech Solutions</CardTitle>
                    <CardDescription className="text-purple-400 text-xs">Series A Funding Success</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4 text-xs leading-relaxed">
                  "Business Nexus connected us with the perfect investor who understood our vision. The platform's
                  matching algorithm introduced us to Zain Shah, and we successfully raised $500K in Series A funding
                  within just 2 months of joining."
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-green-900/50 text-green-300 text-xs">
                      $500K Raised
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-900/50 text-blue-300 text-xs">
                      Series A
                    </Badge>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-800">
                  <p className="text-xs text-gray-400">- Noor Ahmed, CEO & Founder</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect card-hover border-gray-800/50">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Tech Ventures Capital</CardTitle>
                    <CardDescription className="text-green-400 text-xs">Investment Portfolio Growth</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4 text-xs leading-relaxed">
                  "As an investor, Business Nexus has been invaluable. The platform's verification system and detailed
                  startup profiles helped me identify promising opportunities. I've successfully invested in 8 startups
                  with a 75% success rate."
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-purple-900/50 text-purple-300 text-xs">
                      8 Investments
                    </Badge>
                    <Badge variant="secondary" className="bg-orange-900/50 text-orange-300 text-xs">
                      75% Success
                    </Badge>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-800">
                  <p className="text-xs text-gray-400">- Zain Shah, Senior Investment Manager</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-xl font-bold mb-8">Trusted by Industry Leaders</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 opacity-60">
            <div className="flex items-center justify-center h-12 bg-gray-800/30 rounded-lg">
              <span className="text-gray-400 font-semibold text-xs">TechCorp</span>
            </div>
            <div className="flex items-center justify-center h-12 bg-gray-800/30 rounded-lg">
              <span className="text-gray-400 font-semibold text-xs">InnovateLab</span>
            </div>
            <div className="flex items-center justify-center h-12 bg-gray-800/30 rounded-lg">
              <span className="text-gray-400 font-semibold text-xs">StartupX</span>
            </div>
            <div className="flex items-center justify-center h-12 bg-gray-800/30 rounded-lg">
              <span className="text-gray-400 font-semibold text-xs">VentureHub</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-purple-900/20">
        <div className="container mx-auto text-center">
          <h2 className="section-title mb-6">Ready to Get Started?</h2>
          <p className="text-sm text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of entrepreneurs and investors who are building the future together. Start your journey today
            and discover unlimited opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="btn-primary text-sm px-6 py-3">
              <Link href="/auth">Join as Entrepreneur</Link>
            </Button>
            <Button asChild size="lg" className="btn-secondary text-sm px-6 py-3">
              <Link href="/auth">Join as Investor</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
