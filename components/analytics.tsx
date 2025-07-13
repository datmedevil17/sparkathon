"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Calendar,
  Download,
  Filter,
  Eye,
} from "lucide-react"

export default function AnalyticsPage() {
  const salesData = [
    { period: "Jan", sales: 45000, orders: 1250, customers: 890, growth: "+8%" },
    { period: "Feb", sales: 52000, orders: 1420, customers: 950, growth: "+15%" },
    { period: "Mar", sales: 48000, orders: 1380, customers: 920, growth: "-8%" },
    { period: "Apr", sales: 61000, orders: 1650, customers: 1100, growth: "+27%" },
    { period: "May", sales: 58000, orders: 1580, customers: 1050, growth: "-5%" },
    { period: "Jun", sales: 67000, orders: 1820, customers: 1200, growth: "+16%" },
  ]

  const topSellingProducts = [
    { name: "Great Value Milk", sales: "$12,450", units: 2100, growth: "+15%", category: "Dairy" },
    { name: "Bananas (per lb)", sales: "$8,920", units: 5600, growth: "+22%", category: "Produce" },
    { name: "Tide Detergent", sales: "$15,680", units: 890, growth: "+8%", category: "Household" },
    { name: "Wonder Bread", sales: "$6,340", units: 1450, growth: "-3%", category: "Bakery" },
    { name: "Coca-Cola 12pk", sales: "$11,200", units: 1200, growth: "+12%", category: "Beverages" },
  ]

  const categoryPerformance = [
    { category: "Grocery & Food", revenue: "$850K", growth: "+8.5%", trend: "up", margin: "24%" },
    { category: "Electronics", revenue: "$650K", growth: "+15.2%", trend: "up", margin: "18%" },
    { category: "Clothing", revenue: "$420K", growth: "+12.3%", trend: "up", margin: "32%" },
    { category: "Home & Garden", revenue: "$380K", growth: "+5.7%", trend: "up", margin: "28%" },
    { category: "Health & Wellness", revenue: "$290K", growth: "+6.8%", trend: "up", margin: "22%" },
    { category: "Automotive", revenue: "$180K", growth: "+3.4%", trend: "up", margin: "15%" },
  ]

  return (
    <div className="p-8 space-y-8 w-full mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Sales Analytics</h1>
          <p className="text-slate-600 mt-1">Comprehensive sales performance analysis and business intelligence</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </Button>
          <Button variant="outline" className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter Data
          </Button>
          <Button variant="outline" className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white border-0 shadow-sm ring-1 ring-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-600">Total Revenue</p>
                <p className="text-3xl font-bold text-slate-900">$2.85M</p>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-emerald-600 font-medium">+12.5%</span>
                  <span className="text-sm text-slate-500">vs last month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-sm ring-1 ring-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-600">Total Orders</p>
                <p className="text-3xl font-bold text-slate-900">9,850</p>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-emerald-600 font-medium">+8.3%</span>
                  <span className="text-sm text-slate-500">vs last month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-sm ring-1 ring-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-600">Avg Order Value</p>
                <p className="text-3xl font-bold text-slate-900">$289</p>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-emerald-600 font-medium">+3.8%</span>
                  <span className="text-sm text-slate-500">vs last month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-sm ring-1 ring-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-600">Unique Customers</p>
                <p className="text-3xl font-bold text-slate-900">6,210</p>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-emerald-600 font-medium">+15.2%</span>
                  <span className="text-sm text-slate-500">vs last month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Trend Chart */}
      <Card className="bg-white border-0 shadow-sm ring-1 ring-slate-200">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-slate-900">Sales Performance Trend</CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
              >
                6 Months
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
              >
                1 Year
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
              >
                Custom
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-end justify-between gap-4 p-6 bg-slate-50 rounded-xl">
            {salesData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center group">
                <div className="w-full bg-slate-200 rounded-t-lg relative" style={{ height: "200px" }}>
                  <div
                    className="w-full bg-gradient-to-t from-blue-600 to-blue-500 rounded-t-lg absolute bottom-0 transition-all duration-700 group-hover:from-blue-700 group-hover:to-blue-600"
                    style={{ height: `${(data.sales / 70000) * 100}%` }}
                  ></div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm font-semibold text-slate-900">{data.period}</p>
                  <p className="text-xs text-slate-600">${(data.sales / 1000).toFixed(0)}K</p>
                  <Badge
                    className={`mt-1 text-xs ${data.growth.startsWith("+") ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}
                  >
                    {data.growth}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Selling Products */}
        <Card className="bg-white border-0 shadow-sm ring-1 ring-slate-200">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-slate-900">Top Selling Products</CardTitle>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                <Eye className="w-4 h-4 mr-1" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {topSellingProducts.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{product.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="bg-slate-200 text-slate-700 text-xs">
                        {product.category}
                      </Badge>
                      <span className="text-sm text-slate-500">{product.units} units</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">{product.sales}</p>
                  <Badge
                    className={`mt-1 ${
                      product.growth.startsWith("+") ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.growth}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Category Performance */}
        <Card className="bg-white border-0 shadow-sm ring-1 ring-slate-200">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-slate-900">Category Performance</CardTitle>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                <BarChart3 className="w-4 h-4 mr-1" />
                Detailed View
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {categoryPerformance.map((category, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900">{category.category}</h4>
                  <div className="flex items-center gap-4 mt-1 text-sm text-slate-600">
                    <span>Revenue: {category.revenue}</span>
                    <span>Margin: {category.margin}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-emerald-100 text-emerald-700">{category.growth}</Badge>
                  {category.trend === "up" ? (
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-600" />
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Customer Analytics */}
      <Card className="bg-white border-0 shadow-sm ring-1 ring-slate-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-slate-900">Customer Analytics Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <Users className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <p className="text-3xl font-bold text-slate-900">6,210</p>
              <p className="text-sm text-slate-600">Total Customers</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span className="text-sm text-emerald-600 font-medium">+15.2% growth</span>
              </div>
            </div>
            <div className="text-center p-6 bg-emerald-50 rounded-xl">
              <ShoppingCart className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
              <p className="text-3xl font-bold text-slate-900">1.6</p>
              <p className="text-sm text-slate-600">Avg Orders per Customer</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span className="text-sm text-emerald-600 font-medium">+8.3% growth</span>
              </div>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <DollarSign className="w-10 h-10 text-purple-600 mx-auto mb-3" />
              <p className="text-3xl font-bold text-slate-900">$459</p>
              <p className="text-sm text-slate-600">Customer Lifetime Value</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span className="text-sm text-emerald-600 font-medium">+12.7% growth</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
