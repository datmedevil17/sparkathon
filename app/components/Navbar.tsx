"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Store } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

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
          <a href="#features" className="text-walmart-tundora hover:text-walmart-blue transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-walmart-tundora hover:text-walmart-blue transition-colors">
            Pricing
          </a>
          <a href="#about" className="text-walmart-tundora hover:text-walmart-blue transition-colors">
            About
          </a>
          <a href="#contact" className="text-walmart-tundora hover:text-walmart-blue transition-colors">
            Contact
          </a>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" className="text-walmart-blue hover:bg-walmart-squeeze">
            Sign In
          </Button>
          <Button className="bg-walmart-blue hover:bg-walmart-lochmara text-white">Get Started</Button>
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
            <a href="#features" className="block text-walmart-tundora hover:text-walmart-blue transition-colors">
              Features
            </a>
            <a href="#pricing" className="block text-walmart-tundora hover:text-walmart-blue transition-colors">
              Pricing
            </a>
            <a href="#about" className="block text-walmart-tundora hover:text-walmart-blue transition-colors">
              About
            </a>
            <a href="#contact" className="block text-walmart-tundora hover:text-walmart-blue transition-colors">
              Contact
            </a>
            <div className="pt-4 space-y-2">
              <Button variant="ghost" className="w-full text-walmart-blue hover:bg-walmart-squeeze">
                Sign In
              </Button>
              <Button className="w-full bg-walmart-blue hover:bg-walmart-lochmara text-white">Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
