import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, AlertTriangle, CheckCircle, FileText, Scale, Lock, Lightbulb } from "lucide-react"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />

      <div className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="hero-title mb-6">
            <span className="gradient-text">Documentation</span>
          </h1>
          <p className="text-sm text-gray-400 max-w-3xl mx-auto">
            Complete user guide, terms, and conditions for using the Business Nexus platform
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="glass-effect border-gray-800/50 sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <BookOpen className="h-5 w-5" />
                  Contents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <a
                  href="#getting-started"
                  className="block text-purple-400 hover:text-purple-300 transition-colors text-xs"
                >
                  Getting Started
                </a>
                <a href="#user-roles" className="block text-purple-400 hover:text-purple-300 transition-colors text-xs">
                  User Roles
                </a>
                <a
                  href="#platform-features"
                  className="block text-purple-400 hover:text-purple-300 transition-colors text-xs"
                >
                  Platform Features
                </a>
                <a
                  href="#deal-process"
                  className="block text-purple-400 hover:text-purple-300 transition-colors text-xs"
                >
                  Deal Process
                </a>
                <a
                  href="#terms-conditions"
                  className="block text-purple-400 hover:text-purple-300 transition-colors text-xs"
                >
                  Terms & Conditions
                </a>
                <a
                  href="#privacy-policy"
                  className="block text-purple-400 hover:text-purple-300 transition-colors text-xs"
                >
                  Privacy Policy
                </a>
                <a href="#support" className="block text-purple-400 hover:text-purple-300 transition-colors text-xs">
                  Support
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Getting Started */}
            <section id="getting-started">
              <Card className="glass-effect border-gray-800/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    Getting Started
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Learn how to use the Business Nexus platform effectively
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold mb-2">1. Account Registration</h3>
                    <p className="text-gray-400 mb-2 text-xs">
                      Create your account by selecting your role (Investor or Entrepreneur) and completing the
                      registration process with accurate information.
                    </p>
                    <Badge variant="outline" className="text-xs">
                      Required: Email verification
                    </Badge>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-2">2. Profile Setup</h3>
                    <p className="text-gray-400 mb-2 text-xs">
                      Complete your profile with detailed information about your background, interests, and goals.
                      Include professional experience, investment preferences, or startup details.
                    </p>
                    <Badge variant="outline" className="text-xs">
                      Tip: Complete profiles get 3x more connections
                    </Badge>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-2">3. Verification Process</h3>
                    <p className="text-gray-400 mb-2 text-xs">
                      Submit required documents for profile verification to gain access to premium features and build
                      trust with other users.
                    </p>
                    <Badge variant="outline" className="text-xs">
                      Processing time: 2-3 business days
                    </Badge>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-2">4. Start Networking</h3>
                    <p className="text-gray-400 text-xs">
                      Browse profiles, send connection requests, and start meaningful conversations with potential
                      partners, investors, or entrepreneurs.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* User Roles */}
            <section id="user-roles">
              <Card className="glass-effect border-gray-800/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Users className="h-6 w-6 text-blue-500" />
                    User Roles & Capabilities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold mb-3 text-blue-400">Entrepreneurs</h3>
                    <ul className="list-disc list-inside text-gray-400 space-y-1 text-xs">
                      <li>Create and manage multiple startup profiles</li>
                      <li>Post funding requirements and detailed business plans</li>
                      <li>Connect with potential investors and partners</li>
                      <li>Track funding progress and deal status</li>
                      <li>Access mentorship and educational resources</li>
                      <li>Participate in pitch events and competitions</li>
                      <li>Receive feedback and ratings from investors</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-3 text-green-400">Investors</h3>
                    <ul className="list-disc list-inside text-gray-400 space-y-1 text-xs">
                      <li>Browse and filter startup opportunities</li>
                      <li>Advanced search by industry, stage, and funding amount</li>
                      <li>Connect directly with entrepreneurs</li>
                      <li>Manage investment portfolio and track performance</li>
                      <li>Access detailed startup analytics and metrics</li>
                      <li>Participate in due diligence processes</li>
                      <li>Rate and review entrepreneurs post-investment</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Platform Features */}
            <section id="platform-features">
              <Card className="glass-effect border-gray-800/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Lightbulb className="h-6 w-6 text-yellow-500" />
                    Platform Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-800/30 rounded-lg">
                      <h4 className="font-semibold mb-2 text-xs">Real-time Messaging</h4>
                      <p className="text-gray-400 text-xs">
                        Secure, encrypted communication between users with file sharing capabilities
                      </p>
                    </div>
                    <div className="p-4 bg-gray-800/30 rounded-lg">
                      <h4 className="font-semibold mb-2 text-xs">Deal Management</h4>
                      <p className="text-gray-400 text-xs">
                        Complete deal lifecycle management from initial contact to closing
                      </p>
                    </div>
                    <div className="p-4 bg-gray-800/30 rounded-lg">
                      <h4 className="font-semibold mb-2 text-xs">Profile Verification</h4>
                      <p className="text-gray-400 text-xs">
                        Multi-level verification system for enhanced trust and security
                      </p>
                    </div>
                    <div className="p-4 bg-gray-800/30 rounded-lg">
                      <h4 className="font-semibold mb-2 text-xs">Analytics Dashboard</h4>
                      <p className="text-gray-400 text-xs">
                        Comprehensive analytics and reporting tools for performance tracking
                      </p>
                    </div>
                    <div className="p-4 bg-gray-800/30 rounded-lg">
                      <h4 className="font-semibold mb-2 text-xs">Smart Matching</h4>
                      <p className="text-gray-400 text-xs">
                        AI-powered matching algorithm based on preferences and history
                      </p>
                    </div>
                    <div className="p-4 bg-gray-800/30 rounded-lg">
                      <h4 className="font-semibold mb-2 text-xs">Document Management</h4>
                      <p className="text-gray-400 text-xs">Secure document storage and sharing with version control</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Deal Process */}
            <section id="deal-process">
              <Card className="glass-effect border-gray-800/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <FileText className="h-6 w-6 text-purple-500" />
                    Investment Deal Process
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold text-xs">Initial Contact</h4>
                        <p className="text-gray-400 text-xs">
                          Investor expresses interest in startup through platform messaging
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-xs font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold text-xs">Information Exchange</h4>
                        <p className="text-gray-400 text-xs">
                          Sharing of pitch decks, financial models, and business plans
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-xs font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold text-xs">Due Diligence</h4>
                        <p className="text-gray-400 text-xs">
                          Comprehensive review of business model, financials, and market opportunity
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center text-xs font-bold">
                        4
                      </div>
                      <div>
                        <h4 className="font-semibold text-xs">Term Sheet</h4>
                        <p className="text-gray-400 text-xs">
                          Negotiation and agreement on investment terms and conditions
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center text-xs font-bold">
                        5
                      </div>
                      <div>
                        <h4 className="font-semibold text-xs">Legal Documentation</h4>
                        <p className="text-gray-400 text-xs">Preparation and signing of investment agreements</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center text-xs font-bold">
                        6
                      </div>
                      <div>
                        <h4 className="font-semibold text-xs">Closing</h4>
                        <p className="text-gray-400 text-xs">Fund transfer and completion of investment process</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Terms & Conditions */}
            <section id="terms-conditions">
              <Card className="glass-effect border-gray-800/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Scale className="h-6 w-6 text-purple-500" />
                    Terms & Conditions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold mb-2">Platform Usage</h3>
                    <ul className="list-disc list-inside text-gray-400 space-y-1 text-xs">
                      <li>Users must provide accurate and truthful information in all profiles and communications</li>
                      <li>
                        Prohibited activities include spam, harassment, fraudulent activities, or misrepresentation
                      </li>
                      <li>All communications must maintain professional standards and respectful tone</li>
                      <li>Users are solely responsible for their investment decisions and due diligence</li>
                      <li>Platform serves as facilitator only and does not provide investment advice</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-2">Financial Terms</h3>
                    <ul className="list-disc list-inside text-gray-400 space-y-1 text-xs">
                      <li>Platform commission: 0.5% of successful investment deals</li>
                      <li>All transactions must be verified and approved by platform administrators</li>
                      <li>Users must comply with applicable securities laws and regulations</li>
                      <li>Dispute resolution available through platform mediation services</li>
                      <li>Refund policy applies only to platform fees, not investment amounts</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-2">Account Management</h3>
                    <p className="text-gray-400 text-xs">
                      Business Nexus reserves the right to suspend or terminate accounts that violate terms of service,
                      engage in fraudulent activities, or negatively impact the platform community. Users will receive
                      prior notice except in cases of severe violations.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Privacy Policy */}
            <section id="privacy-policy">
              <Card className="glass-effect border-gray-800/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Lock className="h-6 w-6 text-green-500" />
                    Privacy Policy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold mb-2">Data Collection</h3>
                    <p className="text-gray-400 mb-2 text-xs">
                      We collect information necessary to provide our services, including:
                    </p>
                    <ul className="list-disc list-inside text-gray-400 space-y-1 text-xs">
                      <li>Profile information, business details, and professional background</li>
                      <li>Communication data and messaging history within the platform</li>
                      <li>Platform usage analytics and interaction patterns</li>
                      <li>Transaction information and deal-related documentation</li>
                      <li>Device information and technical data for security purposes</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-2">Data Protection</h3>
                    <ul className="list-disc list-inside text-gray-400 space-y-1 text-xs">
                      <li>All data encrypted in transit using TLS 1.3 and at rest using AES-256</li>
                      <li>Strict access controls limit data access to authorized personnel only</li>
                      <li>Regular security audits and penetration testing</li>
                      <li>Full compliance with GDPR, CCPA, and other privacy regulations</li>
                      <li>Data retention policies ensure information is not kept longer than necessary</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-2">User Rights</h3>
                    <p className="text-gray-400 text-xs">
                      Users have the right to access, modify, or delete their personal data at any time. Data
                      portability options are available, and users can request complete account deletion with 30 days
                      notice.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Support */}
            <section id="support">
              <Card className="glass-effect border-gray-800/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <AlertTriangle className="h-6 w-6 text-orange-500" />
                    Support & Help
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold mb-2">Getting Help</h3>
                    <p className="text-gray-400 mb-2 text-xs">Multiple support channels available:</p>
                    <ul className="list-disc list-inside text-gray-400 space-y-1 text-xs">
                      <li>Email support: admin@imeer.ai (Response within 24 hours)</li>
                      <li>Phone support: +92 318 222 1812 (Business hours)</li>
                      <li>Live chat available 24/7 through platform interface</li>
                      <li>Comprehensive help center with FAQs and video tutorials</li>
                      <li>Community forum for user-to-user assistance</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-2">Reporting Issues</h3>
                    <p className="text-gray-400 text-xs">
                      Report technical issues, inappropriate behavior, or security concerns through our dedicated
                      reporting system. All reports are reviewed within 48 hours, with urgent security matters addressed
                      immediately.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-2">Business Hours</h3>
                    <div className="text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Monday - Friday:</span>
                        <span>9:00 AM - 6:00 PM PKT</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Saturday:</span>
                        <span>10:00 AM - 4:00 PM PKT</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Sunday:</span>
                        <span className="text-red-400">Closed</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
