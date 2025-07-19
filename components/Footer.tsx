import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-[#0a0a0a]">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BN</span>
              </div>
              <span className="text-lg font-bold gradient-text">Business Nexus</span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              Connecting ambitious entrepreneurs with strategic investors to build meaningful partnerships and drive
              innovation forward.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm">Platform</h3>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link href="/docs" className="hover:text-white transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/auth" className="hover:text-white transition-colors">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm">For Users</h3>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link href="/auth" className="hover:text-white transition-colors">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link href="/auth" className="hover:text-white transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-white transition-colors">
                  User Guide
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm">Contact Info</h3>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>admin@imeer.ai</li>
              <li>+92 318 222 1812</li>
              <li>
                R 123 Business District
                <br />
                Malir, Karachi Pakistan
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-400 mb-2 md:mb-0">© 2025 Business Nexus. All rights reserved.</p>
          <p className="text-xs text-gray-400">
            Powered by <span className="text-purple-400 font-semibold">imeer.ai</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
