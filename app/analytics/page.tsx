"use client"

import { useState } from "react"
import { Package, BarChart3, TrendingUp, Zap, ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"
import InventoryOverviewPage from "@/components/inventory"
import CategoriesPage from "@/components/categories"
import AnalyticsPage from "@/components/analytics"
import AIRecommendationsPage from "@/components/ai-recommendations"
import StockManagementPage from "@/components/stock-management"

export default function AnalysisDashboard() {
  const [activeSection, setActiveSection] = useState("inventory")
  const router = useRouter()

  const navigationItems = [
    { id: "inventory", label: "Inventory Overview", icon: Package },
    { id: "categories", label: "Categories", icon: ShoppingCart },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "ai-recommendations", label: "AI Insights", icon: Zap },
    { id: "stock-management", label: "Stock Management", icon: TrendingUp },
  ]

  const handleViewDetailedAnalytics = () => {
    router.push("/analytics/detailed-analytics")
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation Header */}
    <header className="bg-white border-b border-slate-200 shadow-sm">
       
        {/* Navigation Tabs */}
        <div className="px-6 border-t border-slate-100">
          <nav className="flex justify-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeSection === item.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>
      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {activeSection === "inventory" && (
          <InventoryOverviewPage onViewDetailedAnalytics={handleViewDetailedAnalytics} />
        )}
        {activeSection === "categories" && <CategoriesPage onViewDetailedAnalytics={handleViewDetailedAnalytics} />}
        {activeSection === "analytics" && <AnalyticsPage />}
        {activeSection === "ai-recommendations" && <AIRecommendationsPage />}
        {activeSection === "stock-management" && <StockManagementPage />}
      </main>
    </div>
  )
}
