"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Package,
  AlertTriangle,
  TrendingUp,
  Search,
  Filter,
  Plus,
  RefreshCw,
  Download,
  Truck,
  Eye,
  Edit,
  MoreHorizontal,
} from "lucide-react"

export default function StockManagementPage() {
  const [selectedProduct, setSelectedProduct] = useState<typeof stockItems[0] | null>(null)

  const stockItems = [
    {
      id: "WM-001",
      name: "Great Value Whole Milk",
      category: "Dairy",
      currentStock: 245,
      minStock: 100,
      maxStock: 500,
      reorderPoint: 150,
      supplier: "Local Dairy Co.",
      lastRestock: "2025-01-10",
      avgDailySales: 25,
      status: "good",
      cost: "$2.50",
      sellPrice: "$3.99",
      margin: "37%",
    },
    {
      id: "WM-002",
      name: "Bananas (per lb)",
      category: "Produce",
      currentStock: 89,
      minStock: 50,
      maxStock: 200,
      reorderPoint: 75,
      supplier: "Fresh Farms Inc.",
      lastRestock: "2025-01-12",
      avgDailySales: 45,
      status: "low",
      cost: "$0.45",
      sellPrice: "$0.68",
      margin: "34%",
    },
    {
      id: "WM-003",
      name: "iPhone 15 Pro Cases",
      category: "Electronics",
      currentStock: 12,
      minStock: 25,
      maxStock: 100,
      reorderPoint: 30,
      supplier: "Tech Accessories Ltd.",
      lastRestock: "2025-01-08",
      avgDailySales: 8,
      status: "critical",
      cost: "$8.99",
      sellPrice: "$24.99",
      margin: "64%",
    },
    {
      id: "WM-004",
      name: "Tide Laundry Detergent",
      category: "Household",
      currentStock: 67,
      minStock: 40,
      maxStock: 150,
      reorderPoint: 50,
      supplier: "P&G Distribution",
      lastRestock: "2025-01-11",
      avgDailySales: 12,
      status: "low",
      cost: "$8.50",
      sellPrice: "$12.99",
      margin: "35%",
    },
    {
      id: "WM-005",
      name: "Wonder Bread",
      category: "Bakery",
      currentStock: 156,
      minStock: 80,
      maxStock: 200,
      reorderPoint: 100,
      supplier: "Wonder Bakery",
      lastRestock: "2025-01-13",
      avgDailySales: 18,
      status: "good",
      cost: "$1.25",
      sellPrice: "$2.49",
      margin: "50%",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "low":
        return "bg-amber-100 text-amber-700 border-amber-200"
      case "critical":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-slate-100 text-slate-700 border-slate-200"
    }
  }

  const getStockPercentage = (current: number, max: number) => {
    return (current / max) * 100
  }

  const getDaysUntilReorder = (current: number, reorderPoint: number, dailySales: number) => {
    if (current <= reorderPoint) return 0
    return Math.floor((current - reorderPoint) / dailySales)
  }

  return (
    <div className="p-8 space-y-8 w-full mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Stock Management</h1>
          <p className="text-slate-600 mt-1">
            Monitor inventory levels, track stock movement, and manage replenishment
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter Stock
          </Button>
          <Button variant="outline" className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50">
            <Truck className="w-4 h-4 mr-2" />
            Bulk Reorder
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Stock Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white border-0 shadow-sm ring-1 ring-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-600">Total SKUs</p>
                <p className="text-3xl font-bold text-slate-900">12,847</p>
                <div className="flex items-center space-x-1">
                  <Package className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-blue-600 font-medium">Active products</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-sm ring-1 ring-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-600">Low Stock Items</p>
                <p className="text-3xl font-bold text-slate-900">23</p>
                <div className="flex items-center space-x-1">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span className="text-sm text-amber-600 font-medium">Need attention</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-sm ring-1 ring-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-600">Critical Stock</p>
                <p className="text-3xl font-bold text-slate-900">5</p>
                <div className="flex items-center space-x-1">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-red-600 font-medium">Immediate action</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-sm ring-1 ring-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-600">Stock Value</p>
                <p className="text-3xl font-bold text-slate-900">$2.4M</p>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-emerald-600 font-medium">+5.2% this month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Quick Actions */}
      <Card className="bg-white border-0 shadow-sm ring-1 ring-slate-200">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search products by name, SKU, category, or supplier..."
                className="pl-10 h-11 border-slate-300 focus:border-blue-500 focus:ring-blue-500 bg-slate-50"
              />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50 h-11">
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filter
              </Button>
              <Button variant="outline" className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50 h-11">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Data
              </Button>
              <Button variant="outline" className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50 h-11">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stock Items Table */}
      <Card className="bg-white border-0 shadow-sm ring-1 ring-slate-200">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-slate-900">Current Stock Levels</CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
              >
                All Items
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
              >
                Low Stock
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
              >
                Critical
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stockItems.map((item, index) => (
              <div
                key={item.id}
                className="p-6 border border-slate-200 rounded-xl hover:shadow-md transition-all duration-200 cursor-pointer"
                onClick={() => setSelectedProduct(item)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                      <Package className="w-6 h-6 text-slate-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{item.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="bg-slate-200 text-slate-700 text-xs">
                          {item.category}
                        </Badge>
                        <span className="text-sm text-slate-500">SKU: {item.id}</span>
                        <span className="text-sm text-slate-500">• {item.supplier}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={`${getStatusColor(item.status)} border`}>{item.status.toUpperCase()}</Badge>
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  <div className="md:col-span-2">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-600">Stock Level</span>
                      <span className="text-sm font-bold text-slate-900">
                        {item.currentStock} / {item.maxStock}
                      </span>
                    </div>
                    <Progress value={getStockPercentage(item.currentStock, item.maxStock)} className="h-3" />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>Min: {item.minStock}</span>
                      <span>Reorder: {item.reorderPoint}</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-slate-600">Daily Sales</p>
                    <p className="text-xl font-bold text-slate-900">{item.avgDailySales}</p>
                    <p className="text-xs text-slate-500">units/day</p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-slate-600">Days Until Reorder</p>
                    <p className="text-xl font-bold text-slate-900">
                      {getDaysUntilReorder(item.currentStock, item.reorderPoint, item.avgDailySales)}
                    </p>
                    <p className="text-xs text-slate-500">estimated</p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-slate-600">Margin</p>
                    <p className="text-xl font-bold text-emerald-600">{item.margin}</p>
                    <p className="text-xs text-slate-500">
                      {item.cost} → {item.sellPrice}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
                  <div className="text-sm text-slate-600">
                    Last restocked: <span className="font-medium text-slate-900">{item.lastRestock}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      className={`${
                        item.status === "critical" || item.status === "low"
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-slate-600 hover:bg-slate-700"
                      } text-white`}
                    >
                      <Truck className="w-4 h-4 mr-1" />
                      Reorder
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-slate-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-slate-900">{selectedProduct.name}</CardTitle>
                  <p className="text-slate-600">
                    SKU: {selectedProduct.id} • {selectedProduct.category}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={() => setSelectedProduct(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </Button>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-blue-50 rounded-xl">
                  <Package className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-slate-900">{selectedProduct.currentStock}</p>
                  <p className="text-sm text-slate-600">Current Stock</p>
                </div>
                <div className="text-center p-6 bg-emerald-50 rounded-xl">
                  <TrendingUp className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-slate-900">{selectedProduct.avgDailySales}</p>
                  <p className="text-sm text-slate-600">Daily Sales</p>
                </div>
                <div className="text-center p-6 bg-amber-50 rounded-xl">
                  <AlertTriangle className="w-10 h-10 text-amber-600 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-slate-900">{selectedProduct.reorderPoint}</p>
                  <p className="text-sm text-slate-600">Reorder Point</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Stock Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Minimum Stock:</span>
                      <span className="font-semibold text-slate-900">{selectedProduct.minStock}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Maximum Stock:</span>
                      <span className="font-semibold text-slate-900">{selectedProduct.maxStock}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Last Restock:</span>
                      <span className="font-semibold text-slate-900">{selectedProduct.lastRestock}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Supplier:</span>
                      <span className="font-semibold text-slate-900">{selectedProduct.supplier}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Pricing & Margin</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Cost Price:</span>
                      <span className="font-semibold text-slate-900">{selectedProduct.cost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Selling Price:</span>
                      <span className="font-semibold text-slate-900">{selectedProduct.sellPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Profit Margin:</span>
                      <span className="font-semibold text-emerald-600">{selectedProduct.margin}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Status:</span>
                      <Badge className={`${getStatusColor(selectedProduct.status)} border`}>
                        {selectedProduct.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t border-slate-200">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Truck className="w-4 h-4 mr-2" />
                  Create Reorder
                </Button>
                <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Product
                </Button>
                <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
