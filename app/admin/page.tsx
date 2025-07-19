"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  DollarSign,
  TrendingUp,
  Bell,
  Settings,
  UserCheck,
  AlertTriangle,
  Building2,
  LogOut,
  Eye,
  CheckCircle,
  BarChart3,
  MessageSquare,
} from "lucide-react"
import platformData from "@/data/platform-data.json"
import { useLoading } from "@/contexts/LoadingContext"

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const { setLoading: setGlobalLoading, setLoadingText } = useLoading()

  useEffect(() => {
    if (!user) {
      router.push("/auth")
      return
    }

    if (user.role !== "admin") {
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

  const stats = platformData.platformStats
  const users = platformData.users
  const deals = platformData.deals
  const notifications = platformData.notifications.filter((n) => n.userId === "admin-1")
  const contactSubmissions = platformData.contactSubmissions

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-800 bg-[#0a0a0a]/95 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">Business Nexus</h1>
                <p className="text-gray-400 text-sm">Administrator Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-red-900/50 text-red-300">
                {notifications.filter((n) => !n.read).length} Pending
              </Badge>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                {notifications.filter((n) => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                )}
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back, {user?.name}</h2>
          <p className="text-gray-400">Here's what's happening on your platform today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="glass-effect border-gray-800/50 card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-gray-400 mt-1">
                {stats.totalInvestors} investors, {stats.totalEntrepreneurs} entrepreneurs
              </p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-gray-800/50 card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Deals</CardTitle>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalDeals}</div>
              <p className="text-xs text-gray-400 mt-1">{stats.completedDeals} completed</p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-gray-800/50 card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Funding</CardTitle>
              <DollarSign className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalFunding}</div>
              <p className="text-xs text-gray-400 mt-1">Platform facilitated</p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-gray-800/50 card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Platform Revenue</CardTitle>
              <DollarSign className="h-5 w-5 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.platformRevenue}</div>
              <p className="text-xs text-gray-400 mt-1">0.5% commission</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-gray-900/50 border border-gray-800">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="deals">Deals</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Users */}
              <Card className="glass-effect border-gray-800/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Recent Users
                  </CardTitle>
                  <CardDescription>Latest registered users on the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.slice(1, 5).map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-400">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={user.role === "investor" ? "default" : "secondary"}>{user.role}</Badge>
                          {user.verified && (
                            <Badge variant="secondary" className="bg-green-900/50 text-green-300">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="glass-effect border-gray-800/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Platform Activity
                  </CardTitle>
                  <CardDescription>Recent platform activities and metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                          <TrendingUp className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Monthly Growth</p>
                          <p className="text-sm text-gray-400">{stats.monthlyGrowth} increase</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Success Rate</p>
                          <p className="text-sm text-gray-400">{stats.successRate} deal completion</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                          <MessageSquare className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Active Conversations</p>
                          <p className="text-sm text-gray-400">25+ daily messages</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="glass-effect border-gray-800/50">
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage all platform users and their verification status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users
                    .filter((u) => u.role !== "admin")
                    .map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{user.name}</p>
                              {user.verified && (
                                <Badge variant="secondary" className="bg-green-900/50 text-green-300">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-400">{user.email}</p>
                            <p className="text-sm text-gray-500">
                              {user.title} • {user.location}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={user.role === "investor" ? "default" : "secondary"}>{user.role}</Badge>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Settings className="h-4 w-4" />
                            </Button>
                            {!user.verified && (
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                <UserCheck className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deals" className="space-y-6">
            <Card className="glass-effect border-gray-800/50">
              <CardHeader>
                <CardTitle>Deal Management</CardTitle>
                <CardDescription>Monitor and manage all investment deals on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deals.map((deal) => {
                    const investor = users.find((u) => u.id === deal.investorId)
                    const entrepreneur = users.find((u) => u.id === deal.entrepreneurId)

                    return (
                      <div key={deal.id} className="p-4 bg-gray-800/30 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-4">
                            <div className="flex -space-x-2">
                              <Avatar className="h-8 w-8 border-2 border-gray-800">
                                <AvatarImage src={investor?.avatar || "/placeholder.svg"} alt={investor?.name} />
                                <AvatarFallback>{investor?.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <Avatar className="h-8 w-8 border-2 border-gray-800">
                                <AvatarImage
                                  src={entrepreneur?.avatar || "/placeholder.svg"}
                                  alt={entrepreneur?.name}
                                />
                                <AvatarFallback>{entrepreneur?.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                            </div>
                            <div>
                              <p className="font-medium">
                                {investor?.name} → {entrepreneur?.name}
                              </p>
                              <p className="text-sm text-gray-400">{new Date(deal.date).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant="secondary" className="bg-green-900/50 text-green-300">
                              {deal.amount}
                            </Badge>
                            <Badge variant={deal.status === "completed" ? "default" : "secondary"}>{deal.status}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-400">
                          <span>Platform Fee: {deal.platformFee}</span>
                          <span>Equity: {deal.equity}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="glass-effect border-gray-800/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications & Alerts
                </CardTitle>
                <CardDescription>Manage platform notifications and user requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg border ${
                        notification.read ? "bg-gray-800/30 border-gray-700" : "bg-blue-900/20 border-blue-800"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              notification.type === "verification_request"
                                ? "bg-blue-600"
                                : notification.type === "deal_completed"
                                  ? "bg-green-600"
                                  : notification.type === "report_submitted"
                                    ? "bg-red-600"
                                    : "bg-gray-600"
                            }`}
                          >
                            {notification.type === "verification_request" && <UserCheck className="h-4 w-4" />}
                            {notification.type === "deal_completed" && <CheckCircle className="h-4 w-4" />}
                            {notification.type === "report_submitted" && <AlertTriangle className="h-4 w-4" />}
                            {notification.type === "new_message" && <MessageSquare className="h-4 w-4" />}
                          </div>
                          <div>
                            <p className="font-medium">{notification.title}</p>
                            <p className="text-sm text-gray-400 mt-1">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-2">
                              {new Date(notification.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {notification.actionRequired && (
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              Review
                            </Button>
                          )}
                          {!notification.read && (
                            <Button size="sm" variant="outline">
                              Mark Read
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6">
            <Card className="glass-effect border-gray-800/50">
              <CardHeader>
                <CardTitle>Contact Form Submissions</CardTitle>
                <CardDescription>Messages received through the contact form</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contactSubmissions.map((contact) => (
                    <div key={contact.id} className="p-4 bg-gray-800/30 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-medium">
                            {contact.firstName} {contact.lastName}
                          </p>
                          <p className="text-sm text-gray-400">{contact.email}</p>
                          <p className="text-sm text-gray-500 mt-1">{contact.subject}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className={
                              contact.status === "new" ? "bg-blue-900/50 text-blue-300" : "bg-gray-700 text-gray-300"
                            }
                          >
                            {contact.status}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {new Date(contact.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300 bg-gray-800/50 p-3 rounded">{contact.message}</p>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline">
                          Reply
                        </Button>
                        <Button size="sm" variant="outline">
                          Mark as Resolved
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
