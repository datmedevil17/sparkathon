"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import {
  ShoppingCart,
  Package,
  TrendingUp,
  Search,
  Filter,
  Apple,
  Shirt,
  Home,
  Gamepad2,
  Pill,
  Car,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  BarChart3,
} from "lucide-react"

interface CategoriesPageProps {
  onViewDetailedAnalytics?: () => void
}

export default function CategoriesPage({ onViewDetailedAnalytics }: CategoriesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[0] | null>(null)
  const router = useRouter()

  const handleViewDetailedAnalytics = () => {
    if (onViewDetailedAnalytics) {
      onViewDetailedAnalytics()
    } else {
      router.push("/analytics/detailed-analytics")
    }
  }

  const categories = [
    {
      id: "grocery",
      name: "Grocery & Food",
      icon: Apple,
      totalProducts: 4250,
      totalValue: "$850K",
      monthlyGrowth: "+8.5%",
      topSubcategories: ["Fresh Produce", "Dairy", "Meat & Seafood", "Pantry Staples"],
      performance: "excellent",
      color: "bg-emerald-50 text-emerald-700 border-emerald-200",
      iconColor: "bg-emerald-100 text-emerald-600",
    },
    {
      id: "clothing",
      name: "Clothing & Apparel",
      icon: Shirt,
      totalProducts: 2100,
      totalValue: "$420K",
      monthlyGrowth: "+12.3%",
      topSubcategories: ["Men's Clothing", "Women's Clothing", "Kids & Baby", "Shoes"],
      performance: "excellent",
      color: "bg-purple-50 text-purple-700 border-purple-200",
      iconColor: "bg-purple-100 text-purple-600",
    },
    {
      id: "home",
      name: "Home & Garden",
      icon: Home,
      totalProducts: 1850,
      totalValue: "$380K",
      monthlyGrowth: "+5.7%",
      topSubcategories: ["Furniture", "Home Decor", "Kitchen", "Garden & Patio"],
      performance: "good",
      color: "bg-blue-50 text-blue-700 border-blue-200",
      iconColor: "bg-blue-100 text-blue-600",
    },
    {
      id: "electronics",
      name: "Electronics",
      icon: Gamepad2,
      totalProducts: 890,
      totalValue: "$650K",
      monthlyGrowth: "+15.2%",
      topSubcategories: ["Mobile Phones", "Computers", "TV & Audio", "Gaming"],
      performance: "excellent",
      color: "bg-indigo-50 text-indigo-700 border-indigo-200",
      iconColor: "bg-indigo-100 text-indigo-600",
    },
    {
      id: "health",
      name: "Health & Wellness",
      icon: Pill,
      totalProducts: 1200,
      totalValue: "$290K",
      monthlyGrowth: "+6.8%",
      topSubcategories: ["Pharmacy", "Personal Care", "Vitamins", "First Aid"],
      performance: "good",
      color: "bg-rose-50 text-rose-700 border-rose-200",
      iconColor: "bg-rose-100 text-rose-600",
    },
    {
      id: "automotive",
      name: "Automotive",
      icon: Car,
      totalProducts: 650,
      totalValue: "$180K",
      monthlyGrowth: "+3.4%",
      topSubcategories: ["Car Care", "Tools", "Accessories", "Tires & Wheels"],
      performance: "average",
      color: "bg-slate-50 text-slate-700 border-slate-200",
      iconColor: "bg-slate-100 text-slate-600",
    },
  ]

  const subcategoryDetails = {
    grocery: [
      { name: "Fresh Produce", products: 450, value: "$125K", trend: "+12%", margin: "35%" },
      { name: "Dairy Products", products: 280, value: "$95K", trend: "+8%", margin: "22%" },
      { name: "Meat & Seafood", products: 320, value: "$180K", trend: "+15%", margin: "18%" },
      { name: "Pantry Staples", products: 890, value: "$220K", trend: "+5%", margin: "28%" },
      { name: "Frozen Foods", products: 340, value: "$85K", trend: "+7%", margin: "25%" },
      { name: "Beverages", products: 520, value: "$145K", trend: "+10%", margin: "30%" },
    ],
  }

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Product Categories</h1>
          <p className="text-slate-600 mt-1">Manage and analyze product categories and subcategories performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter Categories
          </Button>
          <Button variant="outline" className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        </div>
      </div>

      {/* Search and Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3 bg-white border-0 shadow-sm ring-1 ring-slate-200">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search categories and subcategories..."
                className="pl-10 h-11 border-slate-300 focus:border-blue-500 focus:ring-blue-500 bg-slate-50"
              />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-sm ring-1 ring-slate-200">
          <CardContent className="p-6 text-center">
            <p className="text-2xl font-bold text-slate-900">{categories.length}</p>
            <p className="text-sm text-slate-600">Active Categories</p>
          </CardContent>
        </Card>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Card
            key={category.id}
            className="bg-white border-0 shadow-sm hover:shadow-xl ring-1 ring-slate-200/50 hover:ring-slate-300/50 transition-all duration-300 cursor-pointer group overflow-hidden relative"
            onClick={() => setSelectedCategory(category)}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            <CardHeader className="pb-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${category.iconColor} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-7 h-7" />
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={`${category.color} border-0 shadow-sm font-medium px-3 py-1`}>
                    {category.monthlyGrowth}
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-slate-100 rounded-xl"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-slate-900 mt-4 group-hover:text-slate-800 transition-colors">
                {category.name}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6 relative z-10">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Products</p>
                  <p className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {category.totalProducts.toLocaleString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Total Value</p>
                  <p className="text-2xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {category.totalValue}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Top Subcategories</p>
                <div className="space-y-3">
                  {category.topSubcategories.slice(0, 3).map((sub, index) => (
                    <div key={index} className="flex items-center justify-between group/sub py-1">
                      <span className="text-sm font-medium text-slate-700 group-hover/sub:text-slate-900 transition-colors">
                        {sub}
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-12 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                            style={{ width: `${70 + index * 10}%` }}
                          />
                        </div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full shadow-sm"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50/80 p-2 rounded-xl font-medium transition-all duration-200"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-600 hover:text-slate-700 hover:bg-slate-50 p-2 rounded-xl font-medium transition-all duration-200"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Manage
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Category Performance Overview */}
      <Card className="bg-gradient-to-br from-white to-slate-50/50 border-0 shadow-lg ring-1 ring-slate-200/50 overflow-hidden">
        <CardHeader className="pb-6 relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
          <CardTitle className="text-2xl font-bold text-slate-900 relative z-10">
            Category Performance Overview
          </CardTitle>
          <p className="text-slate-600 relative z-10">
            Comprehensive analytics across all product categories
          </p>
        </CardHeader>
        <CardContent className="relative">
          <div className="h-80 flex items-center justify-center bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200/50 shadow-inner">
            <div className="text-center space-y-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xl font-bold text-slate-900">
                  Category Performance Analytics
                </p>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Interactive visualization showing sales trends, growth rates, and performance metrics by category
                </p>
              </div>
              <Button 
                onClick={handleViewDetailedAnalytics} 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 rounded-xl font-medium"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                View Detailed Analytics
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Detail Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-200">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedCategory.iconColor}`}>
                  <selectedCategory.icon className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-slate-900">{selectedCategory.name}</CardTitle>
                  <p className="text-slate-600">Category Performance & Management</p>
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={() => setSelectedCategory(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </Button>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-blue-50 rounded-xl">
                  <Package className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-slate-900">{selectedCategory.totalProducts.toLocaleString()}</p>
                  <p className="text-sm text-slate-600">Total Products</p>
                </div>
                <div className="text-center p-6 bg-emerald-50 rounded-xl">
                  <TrendingUp className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-slate-900">{selectedCategory.totalValue}</p>
                  <p className="text-sm text-slate-600">Total Value</p>
                </div>
                <div className="text-center p-6 bg-amber-50 rounded-xl">
                  <ShoppingCart className="w-10 h-10 text-amber-600 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-slate-900">{selectedCategory.monthlyGrowth}</p>
                  <p className="text-sm text-slate-600">Monthly Growth</p>
                </div>
              </div>

              {selectedCategory.id === "grocery" && subcategoryDetails.grocery && (
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">Subcategory Performance</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {subcategoryDetails.grocery.map((sub, index) => (
                      <div
                        key={index}
                        className="p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-semibold text-slate-900">{sub.name}</h4>
                          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">{sub.trend}</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-sm">
                          <div>
                            <span className="text-slate-600">Products</span>
                            <p className="font-semibold text-slate-900">{sub.products}</p>
                          </div>
                          <div>
                            <span className="text-slate-600">Value</span>
                            <p className="font-semibold text-slate-900">{sub.value}</p>
                          </div>
                          <div>
                            <span className="text-slate-600">Margin</span>
                            <p className="font-semibold text-emerald-600">{sub.margin}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-6 border-t border-slate-200">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Eye className="w-4 h-4 mr-2" />
                  View All Products
                </Button>
                <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics Report
                </Button>
                <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent">
                  <Edit className="w-4 h-4 mr-2" />
                  Manage Category
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
