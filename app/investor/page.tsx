"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useChat } from "@/contexts/ChatContext"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  TrendingUp,
  MessageCircle,
  Bell,
  User,
  DollarSign,
  Building2,
  LogOut,
  Search,
  Filter,
  Star,
  MapPin,
  Briefcase,
  Eye,
  CheckCircle,
  Users,
  BarChart3,
} from "lucide-react"
import platformData from "@/data/platform-data.json"
import { useLoading } from "@/contexts/LoadingContext"

export default function InvestorDashboard() {
  const { user, logout } = useAuth()
  const { getUnreadCount } = useChat()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("dashboard")
  const { setLoading: setGlobalLoading, setLoadingText } = useLoading()

  useEffect(() => {
    if (!user) {
      router.push("/auth")
      return
    }

    if (user.role !== "investor") {
      router.push("/")
      return
    }

    setLoading(false)
  }, [user, router])

  const handleLogout = () => {
    setGlobalLoading(true)
    setLoadingText("Logging out...")
    logout()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  const entrepreneurs = platformData.users.filter((u) => u.role === "entrepreneur")
  const currentUserData = platformData.users.find((u) => u.id === user?.id)
  const unreadMessages = user ? getUnreadCount(user.id) : 0

  const filteredEntrepreneurs = entrepreneurs.filter(
    (entrepreneur) =>
      entrepreneur.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entrepreneur.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entrepreneur.industry.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-950 border-r border-gray-800 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">Business Nexus</h1>
              <p className="text-xs text-gray-400">Investor Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <button
              onClick={() => setSelectedTab("dashboard")}
              className={`sidebar-item w-full ${selectedTab === "dashboard" ? "active" : ""}`}
            >
              <BarChart3 className="h-5 w-5" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setSelectedTab("profile")}
              className={`sidebar-item w-full ${selectedTab === "profile" ? "active" : ""}`}
            >
              <User className="h-5 w-5" />
              <span>Profile</span>
            </button>
            <button
              onClick={() => setSelectedTab("entrepreneurs")}
              className={`sidebar-item w-full ${selectedTab === "entrepreneurs" ? "active" : ""}`}
            >
              <Users className="h-5 w-5" />
              <span>Entrepreneurs</span>
            </button>
            <button
              onClick={() => setSelectedTab("messages")}
              className={`sidebar-item w-full ${selectedTab === "messages" ? "active" : ""}`}
            >
              <MessageCircle className="h-5 w-5" />
              <span>Messages</span>
              {unreadMessages > 0 && (
                <Badge variant="secondary" className="ml-auto bg-red-600 text-white">
                  {unreadMessages}
                </Badge>
              )}
            </button>
            <button
              onClick={() => setSelectedTab("notifications")}
              className={`sidebar-item w-full ${selectedTab === "notifications" ? "active" : ""}`}
            >
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </button>
          </div>
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.avatar || "/entrepreneur.jpg"} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{user?.name}</p>
              <p className="text-sm text-gray-400 truncate">{currentUserData?.title}</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="w-full bg-transparent border-gray-700 hover:bg-gray-800"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-gray-800 bg-gray-950/50 backdrop-blur-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  {selectedTab === "dashboard" && "Dashboard"}
                  {selectedTab === "profile" && "Profile"}
                  {selectedTab === "entrepreneurs" && "Entrepreneurs"}
                  {selectedTab === "messages" && "Messages"}
                  {selectedTab === "notifications" && "Notifications"}
                </h2>
                <p className="text-gray-400">
                  {selectedTab === "dashboard" && `Welcome back, ${user?.name}`}
                  {selectedTab === "profile" && "Manage your investor profile"}
                  {selectedTab === "entrepreneurs" && "Discover promising startups"}
                  {selectedTab === "messages" && "Your conversations"}
                  {selectedTab === "notifications" && "Stay updated"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {currentUserData?.verified && (
                  <Badge variant="secondary" className="bg-green-900/50 text-green-300">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
                <div className="flex items-center gap-1">
                  <div className="online-indicator"></div>
                  <span className="text-sm text-gray-400">Online</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {selectedTab === "dashboard" && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="glass-effect border-gray-800/50">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Portfolio</CardTitle>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{currentUserData?.totalInvestments || 0}</div>
                    <p className="text-xs text-gray-400">Active investments</p>
                  </CardContent>
                </Card>

                <Card className="glass-effect border-gray-800/50">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                    <BarChart3 className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {(
                        ((currentUserData?.successfulExits || 0) / (currentUserData?.totalInvestments || 1)) *
                        100
                      ).toFixed(0)}
                      %
                    </div>
                    <p className="text-xs text-gray-400">Successful exits</p>
                  </CardContent>
                </Card>

                <Card className="glass-effect border-gray-800/50">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Investment Range</CardTitle>
                    <DollarSign className="h-4 w-4 text-purple-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{currentUserData?.investmentRange || "N/A"}</div>
                    <p className="text-xs text-gray-400">Per deal</p>
                  </CardContent>
                </Card>

                <Card className="glass-effect border-gray-800/50">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Messages</CardTitle>
                    <MessageCircle className="h-4 w-4 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{unreadMessages}</div>
                    <p className="text-xs text-gray-400">Unread messages</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="glass-effect border-gray-800/50">
                  <CardHeader>
                    <CardTitle>Investment Focus</CardTitle>
                    <CardDescription>Your preferred investment sectors</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {currentUserData?.investmentFields?.map((field, index) => (
                        <Badge key={index} variant="secondary" className="bg-purple-900/50 text-purple-300">
                          {field}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-effect border-gray-800/50">
                  <CardHeader>
                    <CardTitle>Portfolio Companies</CardTitle>
                    <CardDescription>Your current investments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {currentUserData?.portfolioCompanies?.map((company, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-800/30 rounded">
                          <span className="text-sm">{company}</span>
                          <Badge variant="secondary" className="bg-green-900/50 text-green-300">
                            Active
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {selectedTab === "entrepreneurs" && (
            <div className="space-y-6">
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search entrepreneurs, startups, or industries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-800/50 border-gray-700 focus:border-purple-500"
                  />
                </div>
                <Button variant="outline" className="flex items-center gap-2 bg-transparent border-gray-700">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </div>

              {/* Entrepreneurs List */}
              <div className="grid grid-cols-1 gap-6">
                {filteredEntrepreneurs.map((entrepreneur) => (
                  <Card key={entrepreneur.id} className="glass-effect border-gray-800/50 card-hover">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={entrepreneur.avatar || "/entrepreneur.jpg"} alt={entrepreneur.name} />
                            <AvatarFallback>{entrepreneur.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-xl font-semibold">{entrepreneur.name}</h3>
                              {entrepreneur.verified && (
                                <Badge variant="secondary" className="bg-blue-900/50 text-blue-300">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < Math.floor(entrepreneur.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}`}
                                  />
                                ))}
                                <span className="text-sm text-gray-400 ml-1">({entrepreneur.rating})</span>
                              </div>
                            </div>
                            <p className="text-purple-400 font-medium mb-2">
                              {entrepreneur.title} at {entrepreneur.company}
                            </p>
                            <p className="text-gray-300 mb-4 leading-relaxed">{entrepreneur.bio}</p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div className="flex items-center gap-2 text-sm text-gray-400">
                                <MapPin className="h-4 w-4" />
                                {entrepreneur.location}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-400">
                                <DollarSign className="h-4 w-4" />
                                {entrepreneur.fundingNeeded}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-400">
                                <Briefcase className="h-4 w-4" />
                                {entrepreneur.stage}
                              </div>
                            </div>

                            {entrepreneur.startups && entrepreneur.startups.length > 0 && (
                              <div className="bg-gray-800/30 p-4 rounded-lg">
                                <h4 className="font-medium mb-2">Current Startup</h4>
                                <p className="text-sm text-gray-300 mb-2">{entrepreneur.startups[0].description}</p>
                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                  <span>Goal: {entrepreneur.startups[0].fundingGoal}</span>
                                  <span>Raised: {entrepreneur.startups[0].currentFunding}</span>
                                  <span>Growth: {entrepreneur.startups[0].growth}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 ml-4">
                          <Button size="sm" variant="outline" className="bg-transparent">
                            <Eye className="h-4 w-4 mr-2" />
                            View Profile
                          </Button>
                          <Button size="sm" className="btn-primary">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {selectedTab === "profile" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <Card className="glass-effect border-gray-800/50">
                <CardHeader>
                  <CardTitle>Investor Profile</CardTitle>
                  <CardDescription>Manage your professional information and investment preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={user?.avatar || "/entrepreneur.jpg"} alt={user?.name} />
                      <AvatarFallback className="text-2xl">{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-2xl font-bold">{user?.name}</h3>
                      <p className="text-purple-400">{currentUserData?.title}</p>
                      <p className="text-gray-400">{currentUserData?.company}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Contact Information</h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="text-gray-400">Email:</span> {user?.email}
                        </p>
                        <p>
                          <span className="text-gray-400">Phone:</span> {currentUserData?.phone}
                        </p>
                        <p>
                          <span className="text-gray-400">Location:</span> {currentUserData?.location}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Investment Details</h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="text-gray-400">Experience:</span> {currentUserData?.experience}
                        </p>
                        <p>
                          <span className="text-gray-400">Investment Range:</span> {currentUserData?.investmentRange}
                        </p>
                        <p>
                          <span className="text-gray-400">Preferred Stage:</span> {currentUserData?.preferredStage}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Bio</h4>
                    <p className="text-gray-300 leading-relaxed">{currentUserData?.bio}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Investment Focus Areas</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentUserData?.investmentFields?.map((field, index) => (
                        <Badge key={index} variant="secondary" className="bg-purple-900/50 text-purple-300">
                          {field}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="btn-primary">Edit Profile</Button>
                    <Button variant="outline" className="bg-transparent border-gray-700">
                      Request Verification
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {selectedTab === "messages" && (
            <div className="h-full">
              <Card className="glass-effect border-gray-800/50 h-full">
                <CardContent className="p-6 h-full flex items-center justify-center">
                  <div className="text-center">
                    <MessageCircle className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Messages Coming Soon</h3>
                    <p className="text-gray-400">Real-time messaging feature will be available soon.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {selectedTab === "notifications" && (
            <div className="space-y-4">
              <Card className="glass-effect border-gray-800/50">
                <CardContent className="p-6">
                  <div className="text-center">
                    <Bell className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No New Notifications</h3>
                    <p className="text-gray-400">You're all caught up! Check back later for updates.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
