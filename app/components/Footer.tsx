import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Set Up Your Store</h3>
          <p className="text-gray-400">AI-powered retail solutions with Walmart's supply chain advantage.</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Platform</h4>
          <ul className="space-y-2">
            <li>
              <Link href="#features" className="text-gray-400 hover:text-white">
                AI Features
              </Link>
            </li>
            <li>
              <Link href="#pricing" className="text-gray-400 hover:text-white">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-white">
                Supply Chain
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Resources</h4>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-gray-400 hover:text-white">
                Getting Started
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-white">
                Store Setup Guide
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-white">
                Support Center
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Connect</h4>
          <div className="flex space-x-4">
            <Link href="#" className="text-gray-400 hover:text-white">
              <Facebook className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              <Twitter className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              <Instagram className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              <Linkedin className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
        <p>&copy; 2025 Set Up Your Store. All rights reserved.</p>
      </div>
    </footer>
  )
}
