"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, TrendingUp, Users, AnchorIcon } from "lucide-react"
import Link from "next/link"
import StoreSetupModal from "./StoreSetupModal"

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center space-x-2 rounded-full bg-walmart-squeeze/80 backdrop-blur-sm px-4 py-2 text-sm font-medium text-walmart-blue mb-6 border border-walmart-sky/20">
            <Zap className="h-4 w-4" />
            <span>AI-Powered Retail Solutions</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-walmart-shaft sm:text-6xl md:text-7xl mb-6">
            Set Up Your Store with{" "}
            <span className="bg-gradient-to-r from-walmart-blue to-walmart-everyday bg-clip-text text-transparent">
              AI Intelligence
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-xl text-walmart-tundora mb-8">
            Launch your retail business with Walmart's supply chain advantage. Our AI analyzes demographics, optimizes
            inventory, and connects you to wholesale pricing for maximum profitability.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-walmart-blue hover:bg-walmart-lochmara text-white text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => setIsModalOpen(true)}
            >
              Start Your Store
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link href="/ai-assist">
              <Button
                size="lg"
                variant="outline"
                className="border-walmart-blue text-walmart-blue hover:bg-walmart-squeeze text-lg px-8 py-4 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <AnchorIcon className="mr-2 h-5 w-5" />
                Try AI Assistant
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-walmart-sky/20 hover:bg-white/80 transition-all duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-walmart-squeeze rounded-lg mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-walmart-blue" />
              </div>
              <div className="text-2xl font-bold text-walmart-shaft">40%</div>
              <div className="text-sm text-walmart-tundora">Higher ROI</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-walmart-sky/20 hover:bg-white/80 transition-all duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-walmart-squeeze rounded-lg mx-auto mb-3">
                <Users className="h-6 w-6 text-walmart-blue" />
              </div>
              <div className="text-2xl font-bold text-walmart-shaft">10K+</div>
              <div className="text-sm text-walmart-tundora">Stores Launched</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-walmart-sky/20 hover:bg-white/80 transition-all duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-walmart-squeeze rounded-lg mx-auto mb-3">
                <Zap className="h-6 w-6 text-walmart-blue" />
              </div>
              <div className="text-2xl font-bold text-walmart-shaft">2 Weeks</div>
              <div className="text-sm text-walmart-tundora">Average Setup</div>
            </div>
          </div>
        </div>
      </div>

      <StoreSetupModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
      />
    </section>
  )
}
