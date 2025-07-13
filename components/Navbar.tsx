"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Store, User, LogOut, Settings, ChevronDown, Bell, HelpCircle } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const navigationItems = [
    { href: "/", label: "Home" },
    { href: "/analytics", label: "Analytics" },
    { href: "/supply", label: "Supply Chain" }
  ]

  const isActiveTab = (href: string) => pathname === href

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-walmart-squeeze bg-white/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-walmart-blue">
            <Store className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-walmart-shaft">Set Up Your Store</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navigationItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              className={`text-walmart-tundora hover:text-walmart-blue transition-colors relative ${
                isActiveTab(item.href) ? 'text-walmart-blue font-medium' : ''
              }`}
            >
              {item.label}
              {isActiveTab(item.href) && (
                <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-walmart-blue" />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="flex items-center space-x-3">
              {/* Notifications */}
              <Button 
                variant="ghost" 
                size="sm"
                className="text-walmart-tundora hover:text-walmart-blue hover:bg-walmart-squeeze relative"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>

              {/* Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <Button 
                  variant="ghost" 
                  className="text-walmart-blue hover:bg-walmart-squeeze flex items-center space-x-2 px-3 py-2"
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                >
                  <div className="h-7 w-7 rounded-full bg-walmart-blue flex items-center justify-center">
                    <span className="text-xs font-medium text-white">JD</span>
                  </div>
                  <span className="hidden lg:block">John Doe</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${showProfileDropdown ? 'rotate-180' : ''}`} />
                </Button>
                
                {showProfileDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-walmart-squeeze rounded-xl shadow-lg z-50 overflow-hidden">
                    <div className="p-4 bg-gradient-to-r from-walmart-blue to-walmart-lochmara text-white">
                      <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                          <span className="text-lg font-semibold">JD</span>
                        </div>
                        <div>
                          <p className="font-semibold">John Doe</p>
                          <p className="text-sm text-white/80">Store Manager</p>
                          <p className="text-xs text-white/60">john@example.com</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="py-2">
                      <button className="w-full px-4 py-3 text-left text-sm text-walmart-tundora hover:bg-walmart-squeeze transition-colors flex items-center space-x-3">
                        <User className="h-4 w-4" />
                        <div>
                          <span className="font-medium">My Profile</span>
                          <p className="text-xs text-walmart-tundora/60">Manage your account</p>
                        </div>
                      </button>
                      
                      <button className="w-full px-4 py-3 text-left text-sm text-walmart-tundora hover:bg-walmart-squeeze transition-colors flex items-center space-x-3">
                        <Settings className="h-4 w-4" />
                        <div>
                          <span className="font-medium">Settings</span>
                          <p className="text-xs text-walmart-tundora/60">Preferences & privacy</p>
                        </div>
                      </button>
                      
                      <button className="w-full px-4 py-3 text-left text-sm text-walmart-tundora hover:bg-walmart-squeeze transition-colors flex items-center space-x-3">
                        <HelpCircle className="h-4 w-4" />
                        <div>
                          <span className="font-medium">Help & Support</span>
                          <p className="text-xs text-walmart-tundora/60">Get assistance</p>
                        </div>
                      </button>
                    </div>
                    
                    <div className="border-t border-walmart-squeeze">
                      <button 
                        className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-3"
                        onClick={() => {
                          setIsLoggedIn(false)
                          setShowProfileDropdown(false)
                        }}
                      >
                        <LogOut className="h-4 w-4" />
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <Button 
                variant="ghost" 
                className="text-walmart-blue hover:bg-walmart-squeeze"
                onClick={() => setIsLoggedIn(true)}
              >
                Sign In
              </Button>
              <Button className="bg-walmart-blue hover:bg-walmart-lochmara text-white">Get Started</Button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-walmart-tundora hover:text-walmart-blue"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-walmart-squeeze bg-white/95 backdrop-blur-md">
          <div className="container py-4 space-y-4">
            {navigationItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className={`block text-walmart-tundora hover:text-walmart-blue transition-colors ${
                  isActiveTab(item.href) ? 'text-walmart-blue font-medium' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            <div className="pt-4 space-y-3">
              {isLoggedIn ? (
                <>
                  <div className="p-4 border border-walmart-squeeze rounded-xl bg-gradient-to-r from-walmart-blue to-walmart-lochmara text-white">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                        <span className="font-semibold">JD</span>
                      </div>
                      <div>
                        <p className="font-semibold">John Doe</p>
                        <p className="text-sm text-white/80">Store Manager</p>
                        <p className="text-xs text-white/60">john@example.com</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="ghost" className="w-full text-walmart-blue hover:bg-walmart-squeeze flex items-center justify-start space-x-3 h-12">
                    <User className="h-4 w-4" />
                    <span>My Profile</span>
                  </Button>
                  
                  <Button variant="ghost" className="w-full text-walmart-blue hover:bg-walmart-squeeze flex items-center justify-start space-x-3 h-12">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Button>
                  
                  <Button variant="ghost" className="w-full text-walmart-blue hover:bg-walmart-squeeze flex items-center justify-start space-x-3 h-12">
                    <HelpCircle className="h-4 w-4" />
                    <span>Help & Support</span>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full text-red-600 hover:bg-red-50 flex items-center justify-start space-x-3 h-12"
                    onClick={() => {
                      setIsLoggedIn(false)
                      setIsOpen(false)
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    className="w-full text-walmart-blue hover:bg-walmart-squeeze h-12"
                    onClick={() => {
                      setIsLoggedIn(true)
                      setIsOpen(false)
                    }}
                  >
                    Sign In
                  </Button>
                  <Button className="w-full bg-walmart-blue hover:bg-walmart-lochmara text-white h-12">Get Started</Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
