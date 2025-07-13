"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import {
  Package,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Search,
  Filter,
  Download,
  BarChart3,
  DollarSign,
  ShoppingBag,
  Eye,
  RefreshCw,
  Plus,
  Settings,
  Bell,
  FileSpreadsheet,
  FileText,
  Sparkles,
} from "lucide-react"
import { topProducts, lowStockItems, Product } from "@/data/products"
import { searchProducts, exportToExcel, exportToPDF } from "@/utils/inventoryUtils"
import AISuggestionsModal from "./AISuggestionsModal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface InventoryOverviewPageProps {
  onViewDetailedAnalytics?: () => void
}

export default function InventoryOverviewPage({ onViewDetailedAnalytics }: InventoryOverviewPageProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showAISuggestions, setShowAISuggestions] = useState(false)

  const filteredProducts = useMemo(() => {
    return searchProducts(topProducts, searchTerm)
  }, [searchTerm])

  const handleViewDetailedAnalytics = () => {
    if (onViewDetailedAnalytics) {
      onViewDetailedAnalytics()
    } else {
      router.push("/analytics/detailed-analytics")
    }
  }

  const handleExport = (format: 'excel' | 'pdf') => {
    const timestamp = new Date().toISOString().split('T')[0]
    const filename = `inventory_report_${timestamp}`
    
    if (format === 'excel') {
      exportToExcel(filteredProducts, filename)
    } else {
      exportToPDF(filteredProducts, filename)
    }
  }

  const handleProductClick = (product: any) => {
    if (product.trend === 'down') {
      setSelectedProduct(product)
      setShowAISuggestions(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 w-full mx-auto max-w-7xl">
        {/* Enhanced Page Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Inventory Overview</h1>
                  <p className="text-slate-600 text-sm lg:text-base">
                    Monitor stock levels, track performance, and manage inventory efficiently
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm" className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleExport('excel')}>
                    <FileSpreadsheet className="w-4 h-4 mr-2" />
                    Export as Excel
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport('pdf')}>
                    <FileText className="w-4 h-4 mr-2" />
                    Export as PDF
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Key Performance Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <Card className="bg-gradient-to-br from-white to-blue-50/50 border-0 shadow-sm ring-1 ring-slate-200 hover:shadow-md transition-all duration-200 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-600">Total Products</p>
                  <p className="text-2xl lg:text-3xl font-bold text-slate-900">{topProducts.length}</p>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm text-emerald-600 font-medium">+2.5%</span>
                    <span className="text-sm text-slate-500">vs last month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-emerald-50/50 border-0 shadow-sm ring-1 ring-slate-200 hover:shadow-md transition-all duration-200 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-600">Inventory Value</p>
                  <p className="text-2xl lg:text-3xl font-bold text-slate-900">$2.4M</p>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm text-emerald-600 font-medium">+5.2%</span>
                    <span className="text-sm text-slate-500">vs last month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <DollarSign className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-amber-50/50 border-0 shadow-sm ring-1 ring-slate-200 hover:shadow-md transition-all duration-200 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-600">Low Stock Items</p>
                  <p className="text-2xl lg:text-3xl font-bold text-slate-900">23</p>
                  <div className="flex items-center space-x-1">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span className="text-sm text-amber-600 font-medium">Attention needed</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform relative">
                  <AlertTriangle className="w-6 h-6 text-amber-600" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-purple-50/50 border-0 shadow-sm ring-1 ring-slate-200 hover:shadow-md transition-all duration-200 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-600">Today's Sales</p>
                  <p className="text-2xl lg:text-3xl font-bold text-slate-900">$45.2K</p>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm text-emerald-600 font-medium">+12.3%</span>
                    <span className="text-sm text-slate-500">vs yesterday</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Search and Quick Actions */}
        <Card className="bg-white border-0 shadow-sm ring-1 ring-slate-200">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  placeholder="Search products by name, SKU, category, or supplier..."
                  className="pl-10 h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500 bg-slate-50 rounded-xl text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50 h-12 px-4">
                  <Filter className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Advanced Filter</span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50 h-12 px-4">
                      <Download className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">Export</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleExport('excel')}>
                      <FileSpreadsheet className="w-4 h-4 mr-2" />
                      Export as Excel
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleExport('pdf')}>
                      <FileText className="w-4 h-4 mr-2" />
                      Export as PDF
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50 h-12 px-4">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Enhanced Top Performing Products */}
          <Card className="xl:col-span-2 bg-white border-0 shadow-sm ring-1 ring-slate-200">
            <CardHeader className="pb-4 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Top Performing Products
                  {searchTerm && (
                    <Badge variant="outline" className="ml-2">
                      {filteredProducts.length} results
                    </Badge>
                  )}
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                  <Eye className="w-4 h-4 mr-1" />
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 p-6">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={`flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-white rounded-xl transition-all duration-200 border border-transparent group cursor-pointer ${
                    product.trend === 'down' 
                      ? 'hover:from-red-50 hover:to-white hover:border-red-200' 
                      : 'hover:from-blue-50 hover:to-white hover:border-blue-200'
                  }`}
                  onClick={() => handleProductClick(product)}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-xl object-cover bg-white border border-slate-200 group-hover:shadow-md transition-shadow"
                      />
                      <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-xs font-bold text-white">{index + 1}</span>
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${
                        product.stockStatus === 'in-stock' ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 group-hover:text-blue-900 transition-colors">{product.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="bg-slate-200 text-slate-700 text-xs hover:bg-blue-100 transition-colors">
                          {product.category}
                        </Badge>
                        <span className="text-xs text-slate-500">SKU: {product.id}</span>
                        {product.trend === 'down' && (
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300 text-xs">
                            <Sparkles className="w-3 h-3 mr-1" />
                            AI Help
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <p className="font-semibold text-slate-900">{product.stock}</p>
                      <p className="text-slate-500 text-xs">Stock</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-slate-900">{product.sold}</p>
                      <p className="text-slate-500 text-xs">Sold</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-slate-900">{product.revenue}</p>
                      <p className="text-slate-500 text-xs">Revenue</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-emerald-600">{product.margin}</p>
                      <p className="text-slate-500 text-xs">Margin</p>
                    </div>
                    <div className="flex items-center">
                      {product.trend === "up" ? (
                        <TrendingUp className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Enhanced Critical Stock Alerts */}
          <Card className="bg-white border-0 shadow-sm ring-1 ring-slate-200">
            <CardHeader className="pb-4 border-b border-slate-100">
              <CardTitle className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                <Bell className="w-5 h-5 text-amber-600" />
                Critical Stock Alerts
                <Badge variant="outline" className="ml-auto bg-red-50 text-red-700 border-red-200">
                  {lowStockItems.filter(item => item.urgency === 'critical').length} Critical
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              {lowStockItems.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border-l-4 transition-all duration-200 hover:shadow-md ${
                    item.urgency === "critical"
                      ? "bg-gradient-to-r from-red-50 to-red-25 border-red-500 hover:from-red-100"
                      : item.urgency === "high"
                        ? "bg-gradient-to-r from-amber-50 to-amber-25 border-amber-500 hover:from-amber-100"
                        : "bg-gradient-to-r from-yellow-50 to-yellow-25 border-yellow-500 hover:from-yellow-100"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-slate-900 text-sm">{item.name}</h4>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        item.urgency === "critical"
                          ? "border-red-300 text-red-700 bg-red-50"
                          : item.urgency === "high"
                            ? "border-amber-300 text-amber-700 bg-amber-50"
                            : "border-yellow-300 text-yellow-700 bg-yellow-50"
                      }`}
                    >
                      {item.category}
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs font-medium text-slate-600">
                      <span>Current: {item.stock}</span>
                      <span>Reorder: {item.reorderLevel}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          item.urgency === "critical"
                            ? "bg-gradient-to-r from-red-500 to-red-600"
                            : item.urgency === "high"
                              ? "bg-gradient-to-r from-amber-500 to-amber-600"
                              : "bg-gradient-to-r from-yellow-500 to-yellow-600"
                        }`}
                        style={{ width: `${Math.min((item.stock / item.reorderLevel) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <Button
                      size="sm"
                      className={`w-full text-xs font-medium transition-all duration-200 ${
                        item.urgency === "critical" 
                          ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800" 
                          : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                      } text-white shadow-sm hover:shadow-md`}
                    >
                      {item.urgency === "critical" ? "Urgent Reorder" : "Reorder Now"}
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full mt-4 border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent hover:shadow-sm transition-all"
              >
                <Bell className="w-4 h-4 mr-2" />
                View All Alerts
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Inventory Analytics Chart */}
        <Card className="bg-white border-0 shadow-sm ring-1 ring-slate-200">
          <CardHeader className="pb-4 border-b border-slate-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <CardTitle className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                Inventory Performance Analytics
              </CardTitle>
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-blue-25"
                >
                  Last 7 days
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
                >
                  Last 30 days
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
                >
                  Last 90 days
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-80 flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-2xl border border-slate-200">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <BarChart3 className="w-10 h-10 text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-700">Interactive Analytics Dashboard</p>
                  <p className="text-sm text-slate-500 max-w-md mx-auto">
                    Real-time inventory turnover, stock movement, and performance metrics with interactive charts and insights
                  </p>
                </div>
                <Button 
                  onClick={handleViewDetailedAnalytics} 
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Detailed Analytics
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Suggestions Modal */}
        {selectedProduct && (
          <AISuggestionsModal
            isOpen={showAISuggestions}
            onClose={() => setShowAISuggestions(false)}
            product={selectedProduct}
          />
        )}
      </div>
    </div>
  )
}
