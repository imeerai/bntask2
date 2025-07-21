import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Mail, Phone, Award, Users, Target, Heart, Building2 } from "lucide-react"

export default function AboutPage() {
  const team = [
    {
      name: "Zameer Abbas",
      role: "CEO & Co-Founder",
      image: "/entrepreneur.jpg?height=200&width=200",
      bio: "Visionary leader with 15+ years of experience in business development and strategic partnerships.",
      email: "zameer@imeer.ai",
    },
    {
      name: "Meer Abbas",
      role: "CTO & Co-Founder",
      image: "/entrepreneur.jpg?height=200&width=200",
      bio: "Tech entrepreneur and expert in building scalable platforms and innovative solutions.",
      email: "meer@imeer.ai",
    },
    {
      name: "Areeba Shakeel",
      role: "Head of Partnerships",
      image: "/entrepreneur.jpg?height=200&width=200",
      bio: "Partnership specialist with expertise in connecting investors with promising startups.",
      email: "areeba@imeer.ai",
    },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />

      <div className="container mx-auto px-6 py-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="hero-title mb-6">
            About <span className="gradient-text">Business Nexus</span>
          </h1>
          <p className="text-sm text-gray-400 max-w-3xl mx-auto">
            We're building the future of business networking by connecting ambitious entrepreneurs with visionary
            investors through our innovative platform.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="glass-effect border-gray-800/50 card-hover">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-base">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 text-xs leading-relaxed mb-4">
                Business Nexus exists to democratize access to investment opportunities and entrepreneurial talent. We
                believe that great ideas should find great investors, regardless of geographical boundaries or
                traditional networking limitations.
              </p>
              <p className="text-gray-400 text-xs leading-relaxed">
                Our platform leverages cutting-edge technology to create meaningful connections that drive innovation,
                economic growth, and positive change in the business ecosystem.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-gray-800/50 card-hover">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-base">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 text-xs leading-relaxed mb-6">
                To become the world's leading platform for business networking, fostering innovation and economic growth
                globally.
              </p>
              <div>
                <h4 className="font-semibold mb-3 text-xs">Our Values</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-purple-900/50 text-purple-300 text-xs">
                    Transparency
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-900/50 text-blue-300 text-xs">
                    Innovation
                  </Badge>
                  <Badge variant="secondary" className="bg-green-900/50 text-green-300 text-xs">
                    Trust
                  </Badge>
                  <Badge variant="secondary" className="bg-orange-900/50 text-orange-300 text-xs">
                    Growth
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Meet Our Team</h2>
            <p className="text-gray-400 text-xs">The passionate individuals behind Business Nexus</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="glass-effect border-gray-800/50 text-center card-hover">
                <CardHeader>
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-base">{member.name}</CardTitle>
                  <CardDescription className="text-purple-400 text-xs">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-xs mb-4">{member.bio}</p>
                  <div className="flex justify-center gap-2">
                    <Badge variant="secondary" className="bg-gray-800 text-gray-300 text-xs">
                      {member.email}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats & Company Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="glass-effect border-gray-800/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <MapPin className="h-5 w-5 text-purple-500" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-blue-500 mt-1" />
                <div>
                  <p className="font-medium text-xs">Headquarters</p>
                  <p className="text-gray-400 text-xs">R 123 Business District, Malir, Karachi Pakistan</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-blue-500 mt-1" />
                <div>
                  <p className="font-medium text-xs">Email</p>
                  <p className="text-gray-400 text-xs">admin@imeer.ai</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-blue-500 mt-1" />
                <div>
                  <p className="font-medium text-xs">Phone</p>
                  <p className="text-gray-400 text-xs">+92 318 222 1812</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-gray-800/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Users className="h-5 w-5 text-green-500" />
                Platform Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-xs">Active Users</span>
                <span className="font-bold text-blue-500 text-sm">1,700+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-xs">Successful Deals</span>
                <span className="font-bold text-green-500 text-sm">300+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-xs">Total Funding</span>
                <span className="font-bold text-purple-500 text-sm">$50M+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-xs">Countries</span>
                <span className="font-bold text-orange-500 text-sm">25+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-xs">Success Rate</span>
                <span className="font-bold text-teal-500 text-sm">85%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Why Choose Us */}
        <div className="mt-16 text-center">
          <Card className="glass-effect border-gray-800/50">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg">Why We Do What We Do</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 text-xs leading-relaxed max-w-3xl mx-auto">
                We believe that every great idea deserves the chance to flourish. By connecting passionate entrepreneurs
                with visionary investors, we're not just facilitating business deals – we're building the foundation for
                tomorrow's innovations. Our platform has already helped hundreds of startups secure funding and grow
                into successful businesses, creating jobs and driving economic growth across multiple industries.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
