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
  Plus,
  Edit,
  FileText,
  Activity,
} from "lucide-react"
import platformData from "@/data/platform-data.json"
import { useLoading } from "@/contexts/LoadingContext"

export default function EntrepreneurDashboard() {
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

    if (user.role !== "entrepreneur") {
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

  const investors = platformData.users.filter((u) => u.role === "investor")
  const currentUserData = platformData.users.find((u) => u.id === user?.id)
  const unreadMessages = user ? getUnreadCount(user.id) : 0

  const filteredInvestors = investors.filter(
    (investor) =>
      investor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      investor.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      investor.investmentFields?.some((field) => field.toLowerCase().includes(searchQuery.toLowerCase())),
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
              <h1 className="text-base font-bold gradient-text">Business Nexus</h1>
              <p className="text-xs text-gray-400">Entrepreneur Portal</p>
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
              <BarChart3 className="h-4 w-4" />
              <span className="text-xs">Dashboard</span>
            </button>
            <button
              onClick={() => setSelectedTab("startups")}
              className={`sidebar-item w-full ${selectedTab === "startups" ? "active" : ""}`}
            >
              <Building2 className="h-4 w-4" />
              <span className="text-xs">My Startups</span>
            </button>
            <button
              onClick={() => setSelectedTab("investors")}
              className={`sidebar-item w-full ${selectedTab === "investors" ? "active" : ""}`}
            >
              <Users className="h-4 w-4" />
              <span className="text-xs">Investors</span>
            </button>
            <button
              onClick={() => setSelectedTab("profile")}
              className={`sidebar-item w-full ${selectedTab === "profile" ? "active" : ""}`}
            >
              <User className="h-4 w-4" />
              <span className="text-xs">Profile</span>
            </button>
            <button
              onClick={() => setSelectedTab("messages")}
              className={`sidebar-item w-full ${selectedTab === "messages" ? "active" : ""}`}
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs">Messages</span>
              {unreadMessages > 0 && (
                <Badge variant="secondary" className="ml-auto bg-red-600 text-white text-xs">
                  {unreadMessages}
                </Badge>
              )}
            </button>
            <button
              onClick={() => setSelectedTab("deals")}
              className={`sidebar-item w-full ${selectedTab === "deals" ? "active" : ""}`}
            >
              <FileText className="h-4 w-4" />
              <span className="text-xs">Deals</span>
            </button>
            <button
              onClick={() => setSelectedTab("analytics")}
              className={`sidebar-item w-full ${selectedTab === "analytics" ? "active" : ""}`}
            >
              <Activity className="h-4 w-4" />
              <span className="text-xs">Analytics</span>
            </button>
            <button
              onClick={() => setSelectedTab("notifications")}
              className={`sidebar-item w-full ${selectedTab === "notifications" ? "active" : ""}`}
            >
              <Bell className="h-4 w-4" />
              <span className="text-xs">Notifications</span>
            </button>
          </div>
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate text-xs">{user?.name}</p>
              <p className="text-xs text-gray-400 truncate">{currentUserData?.title}</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="w-full bg-transparent border-gray-700 hover:bg-gray-800 text-xs"
          >
            <LogOut className="h-3 w-3 mr-2" />
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
                <h2 className="text-lg font-bold">
                  {selectedTab === "dashboard" && "Dashboard"}
                  {selectedTab === "startups" && "My Startups"}
                  {selectedTab === "investors" && "Investors"}
                  {selectedTab === "profile" && "Profile"}
                  {selectedTab === "messages" && "Messages"}
                  {selectedTab === "deals" && "Deals"}
                  {selectedTab === "analytics" && "Analytics"}
                  {selectedTab === "notifications" && "Notifications"}
                </h2>
                <p className="text-gray-400 text-xs">
                  {selectedTab === "dashboard" && `Welcome back, ${user?.name}`}
                  {selectedTab === "startups" && "Manage your startup profiles and funding campaigns"}
                  {selectedTab === "investors" && "Connect with potential investors"}
                  {selectedTab === "profile" && "Manage your entrepreneur profile"}
                  {selectedTab === "messages" && "Your conversations with investors"}
                  {selectedTab === "deals" && "Track your investment deals"}
                  {selectedTab === "analytics" && "View your performance metrics"}
                  {selectedTab === "notifications" && "Stay updated with latest activities"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {currentUserData?.verified && (
                  <Badge variant="secondary" className="bg-green-900/50 text-green-300 text-xs">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
                <div className="flex items-center gap-1">
                  <div className="online-indicator"></div>
                  <span className="text-xs text-gray-400">Active</span>
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
                    <CardTitle className="text-xs font-medium">Active Startups</CardTitle>
                    <Building2 className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">{currentUserData?.startups?.length || 1}</div>
                    <p className="text-xs text-gray-400">Currently fundraising</p>
                  </CardContent>
                </Card>

                <Card className="glass-effect border-gray-800/50">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xs font-medium">Funding Raised</CardTitle>
                    <DollarSign className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">$150K</div>
                    <p className="text-xs text-gray-400">Out of $500K goal</p>
                  </CardContent>
                </Card>

                <Card className="glass-effect border-gray-800/50">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xs font-medium">Investor Interest</CardTitle>
                    <TrendingUp className="h-4 w-4 text-purple-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">24</div>
                    <p className="text-xs text-gray-400">Interested investors</p>
                  </CardContent>
                </Card>

                <Card className="glass-effect border-gray-800/50">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xs font-medium">Messages</CardTitle>
                    <MessageCircle className="h-4 w-4 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">{unreadMessages}</div>
                    <p className="text-xs text-gray-400">Unread messages</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="glass-effect border-gray-800/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-sm">My Startups</CardTitle>
                        <CardDescription className="text-xs">
                          Manage your startup profiles and funding campaigns
                        </CardDescription>
                      </div>
                      <Button size="sm" className="btn-primary text-xs">
                        <Plus className="h-3 w-3 mr-1" />
                        Add Startup
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {currentUserData?.startups?.map((startup) => (
                        <div key={startup.id} className="p-3 bg-gray-800/30 rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-xs">{startup.name}</h3>
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="text-xs text-gray-400 mb-3">{startup.description}</p>
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-4">
                              <span className="text-gray-400">Goal: {startup.fundingGoal}</span>
                              <span className="text-green-400">Raised: {startup.currentFunding}</span>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {startup.stage}
                            </Badge>
                          </div>
                          <div className="mt-3 bg-gray-700 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: "30%" }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-effect border-gray-800/50">
                  <CardHeader>
                    <CardTitle className="text-sm">Recent Activity</CardTitle>
                    <CardDescription className="text-xs">Latest updates and interactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <p className="text-xs">Zain Shah viewed your InnovateTech Solutions profile</p>
                        <span className="text-xs text-gray-400">2 hours ago</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <p className="text-xs">New message from Areeba Shakeel</p>
                        <span className="text-xs text-gray-400">5 hours ago</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <p className="text-xs">Your startup profile was featured in trending</p>
                        <span className="text-xs text-gray-400">1 day ago</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <p className="text-xs">Investment proposal received from Tech Ventures</p>
                        <span className="text-xs text-gray-400">2 days ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {selectedTab === "investors" && (
            <div className="space-y-6">
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search investors, companies, or investment fields..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-800/50 border-gray-700 focus:border-purple-500 text-xs"
                  />
                </div>
                <Button variant="outline" className="flex items-center gap-2 bg-transparent border-gray-700 text-xs">
                  <Filter className="h-3 w-3" />
                  Filter
                </Button>
              </div>

              {/* Investors List */}
              <div className="grid grid-cols-1 gap-6">
                {filteredInvestors.map((investor) => (
                  <Card key={investor.id} className="glass-effect border-gray-800/50 card-hover">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={investor.avatar || "/placeholder.svg"} alt={investor.name} />
                            <AvatarFallback>{investor.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-base font-semibold">{investor.name}</h3>
                              {investor.verified && (
                                <Badge variant="secondary" className="bg-blue-900/50 text-blue-300 text-xs">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${i < Math.floor(investor.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}`}
                                  />
                                ))}
                                <span className="text-xs text-gray-400 ml-1">({investor.rating})</span>
                              </div>
                            </div>
                            <p className="text-purple-400 font-medium mb-2 text-xs">
                              {investor.title} at {investor.company}
                            </p>
                            <p className="text-gray-300 mb-4 leading-relaxed text-xs">{investor.bio}</p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div className="flex items-center gap-2 text-xs text-gray-400">
                                <MapPin className="h-3 w-3" />
                                {investor.location}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-gray-400">
                                <DollarSign className="h-3 w-3" />
                                {investor.investmentRange}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-gray-400">
                                <Briefcase className="h-3 w-3" />
                                {investor.preferredStage}
                              </div>
                            </div>

                            <div className="bg-gray-800/30 p-3 rounded-lg">
                              <h4 className="font-medium mb-2 text-xs">Investment Focus</h4>
                              <div className="flex flex-wrap gap-1">
                                {investor.investmentFields?.map((field, index) => (
                                  <Badge
                                    key={index}
                                    variant="secondary"
                                    className="bg-purple-900/50 text-purple-300 text-xs"
                                  >
                                    {field}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 ml-4">
                          <Button size="sm" variant="outline" className="bg-transparent text-xs">
                            <Eye className="h-3 w-3 mr-2" />
                            View Profile
                          </Button>
                          <Button size="sm" className="btn-primary text-xs">
                            <MessageCircle className="h-3 w-3 mr-2" />
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
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">Entrepreneur Profile</CardTitle>
                      <CardDescription className="text-xs">
                        Manage your professional information and startup details
                      </CardDescription>
                    </div>
                    <Button className="btn-primary text-xs">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit Profile
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                      <AvatarFallback className="text-lg">{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-bold">{user?.name}</h3>
                      <p className="text-purple-400 text-xs">{currentUserData?.title}</p>
                      <p className="text-gray-400 text-xs">{currentUserData?.company}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-xs">Contact Information</h4>
                      <div className="space-y-2 text-xs">
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
                      <h4 className="font-semibold mb-3 text-xs">Business Details</h4>
                      <div className="space-y-2 text-xs">
                        <p>
                          <span className="text-gray-400">Experience:</span> {currentUserData?.experience}
                        </p>
                        <p>
                          <span className="text-gray-400">Industry:</span> {currentUserData?.industry}
                        </p>
                        <p>
                          <span className="text-gray-400">Team Size:</span> {currentUserData?.teamSize}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-xs">Bio</h4>
                    <p className="text-gray-300 leading-relaxed text-xs">{currentUserData?.bio}</p>
                  </div>

                  <div className="flex gap-3">
                    <Button className="btn-primary text-xs">Edit Profile</Button>
                    <Button variant="outline" className="bg-transparent border-gray-700 text-xs">
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
                    <MessageCircle className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-base font-semibold mb-2">Messages Coming Soon</h3>
                    <p className="text-gray-400 text-xs">Real-time messaging feature will be available soon.</p>
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
                    <Bell className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-base font-semibold mb-2">No New Notifications</h3>
                    <p className="text-gray-400 text-xs">You're all caught up! Check back later for updates.</p>
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
