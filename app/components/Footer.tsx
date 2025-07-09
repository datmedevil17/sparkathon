"use client"

import { Store, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-walmart-shaft text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-walmart-blue">
                <Store className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">Set Up Your Store</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              AI-powered retail solutions with Walmart's supply chain advantage. Launch your store with confidence.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-walmart-blue rounded-lg flex items-center justify-center">
                <Mail className="h-4 w-4" />
              </div>
              <div className="w-8 h-8 bg-walmart-blue rounded-lg flex items-center justify-center">
                <Phone className="h-4 w-4" />
              </div>
              <div className="w-8 h-8 bg-walmart-blue rounded-lg flex items-center justify-center">
                <MapPin className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-walmart-yellow">Platform</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-walmart-yellow transition-colors">
                  AI Recommendations
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-walmart-yellow transition-colors">
                  Supply Chain Access
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-walmart-yellow transition-colors">
                  Inventory Management
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-walmart-yellow transition-colors">
                  Analytics Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-walmart-yellow">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-walmart-yellow transition-colors">
                  Getting Started
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-walmart-yellow transition-colors">
                  Store Setup Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-walmart-yellow transition-colors">
                  Demographics Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-walmart-yellow transition-colors">
                  Best Practices
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-walmart-yellow">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-walmart-yellow transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-walmart-yellow transition-colors">
                  Contact Support
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-walmart-yellow transition-colors">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-walmart-yellow transition-colors">
                  Community
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">© 2024 Set Up Your Store. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-300 hover:text-walmart-yellow text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-300 hover:text-walmart-yellow text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-300 hover:text-walmart-yellow text-sm transition-colors">
              Walmart Partnership
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
