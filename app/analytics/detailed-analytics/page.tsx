"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  ArrowLeft,
  Download,
  Filter,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  BarChart3,
  Activity,
  Target,
} from "lucide-react"

export default function DetailedAnalyticsPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("6months")
  const [selectedMetric, setSelectedMetric] = useState("revenue")

  // Sample data for charts
  const salesTrendData = [
    { month: "Jan", revenue: 45000, orders: 1250, customers: 890, profit: 12000 },
    { month: "Feb", revenue: 52000, orders: 1420, customers: 950, profit: 15600 },
    { month: "Mar", revenue: 48000, orders: 1380, customers: 920, profit: 13440 },
    { month: "Apr", revenue: 61000, orders: 1650, customers: 1100, profit: 18300 },
    { month: "May", revenue: 58000, orders: 1580, customers: 1050, profit: 17400 },
    { month: "Jun", revenue: 67000, orders: 1820, customers: 1200, profit: 20100 },
    { month: "Jul", revenue: 72000, orders: 1950, customers: 1280, profit: 21600 },
    { month: "Aug", revenue: 69000, orders: 1870, customers: 1220, profit: 20700 },
    { month: "Sep", revenue: 75000, orders: 2100, customers: 1350, profit: 22500 },
    { month: "Oct", revenue: 78000, orders: 2200, customers: 1400, profit: 23400 },
    { month: "Nov", revenue: 82000, orders: 2350, customers: 1480, profit: 24600 },
    { month: "Dec", revenue: 89000, orders: 2500, customers: 1600, profit: 26700 },
  ]

  const categoryPerformanceData = [
    { name: "Grocery & Food", value: 850000, percentage: 35, growth: 8.5 },
    { name: "Electronics", value: 650000, percentage: 27, growth: 15.2 },
    { name: "Clothing", value: 420000, percentage: 17, growth: 12.3 },
    { name: "Home & Garden", value: 380000, percentage: 16, growth: 5.7 },
    { name: "Health & Wellness", value: 290000, percentage: 12, growth: 6.8 },
    { name: "Automotive", value: 180000, percentage: 7, growth: 3.4 },
  ]

  const inventoryTurnoverData = [
    { category: "Dairy", turnover: 12.5, daysOnHand: 29, efficiency: 95 },
    { category: "Produce", turnover: 18.2, daysOnHand: 20, efficiency: 98 },
    { category: "Electronics", turnover: 4.8, daysOnHand: 76, efficiency: 78 },
    { category: "Clothing", turnover: 6.2, daysOnHand: 59, efficiency: 82 },
    { category: "Household", turnover: 8.9, daysOnHand: 41, efficiency: 88 },
    { category: "Health", turnover: 7.3, daysOnHand: 50, efficiency: 85 },
  ]

  const customerAnalyticsData = [
    { segment: "New Customers", count: 1240, percentage: 20, value: 289 },
    { segment: "Returning Customers", count: 3680, percentage: 59, value: 456 },
    { segment: "VIP Customers", count: 890, percentage: 14, value: 789 },
    { segment: "Inactive Customers", count: 400, percentage: 7, value: 123 },
  ]

  const profitMarginData = [
    { month: "Jan", grossMargin: 28.5, netMargin: 12.2 },
    { month: "Feb", grossMargin: 30.1, netMargin: 15.1 },
    { month: "Mar", grossMargin: 29.8, netMargin: 14.8 },
    { month: "Apr", grossMargin: 31.2, netMargin: 16.2 },
    { month: "May", grossMargin: 30.8, netMargin: 15.8 },
    { month: "Jun", grossMargin: 32.1, netMargin: 17.1 },
  ]

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4"]

  const timeRanges = [
    { value: "7days", label: "Last 7 Days" },
    { value: "30days", label: "Last 30 Days" },
    { value: "3months", label: "Last 3 Months" },
    { value: "6months", label: "Last 6 Months" },
    { value: "1year", label: "Last Year" },
    { value: "custom", label: "Custom Range" },
  ]

  const metrics = [
    { value: "revenue", label: "Revenue", icon: DollarSign },
    { value: "orders", label: "Orders", icon: ShoppingCart },
    { value: "customers", label: "Customers", icon: Users },
    { value: "profit", label: "Profit", icon: TrendingUp },
  ]

  return (
    <div className="p-8 space-y-8 w-full mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.history.back()}
            className="text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Detailed Analytics Dashboard</h1>
            <p className="text-slate-600 mt-1">Comprehensive business intelligence and performance metrics</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            {timeRanges.map((range) => (
              <Button
                key={range.value}
                variant={selectedTimeRange === range.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTimeRange(range.value)}
                className={
                  selectedTimeRange === range.value
                    ? "bg-blue-600 text-white"
                    : "border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
                }
              >
                {range.label}
              </Button>
            ))}
          </div>
          <Button variant="outline" className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50">
            <Download className="w-4 h-4 mr-2" />
            Export
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
                <p className="text-3xl font-bold text-slate-900">$789K</p>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-emerald-600 font-medium">+18.2%</span>
                  <span className="text-sm text-slate-500">vs last period</span>
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
                <p className="text-3xl font-bold text-slate-900">22,150</p>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-emerald-600 font-medium">+12.8%</span>
                  <span className="text-sm text-slate-500">vs last period</span>
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
                <p className="text-3xl font-bold text-slate-900">$356</p>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-emerald-600 font-medium">+4.7%</span>
                  <span className="text-sm text-slate-500">vs last period</span>
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
                <p className="text-sm font-medium text-slate-600">Customer Growth</p>
                <p className="text-3xl font-bold text-slate-900">+1,240</p>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-emerald-600 font-medium">+22.1%</span>
                  <span className="text-sm text-slate-500">vs last period</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="sales" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-slate-100 p-1 rounded-xl">
          <TabsTrigger value="sales" className="rounded-lg">
            Sales Trends
          </TabsTrigger>
          <TabsTrigger value="categories" className="rounded-lg">
            Category Analysis
          </TabsTrigger>
          <TabsTrigger value="inventory" className="rounded-lg">
            Inventory Metrics
          </TabsTrigger>
          <TabsTrigger value="customers" className="rounded-lg">
            Customer Insights
          </TabsTrigger>
          <TabsTrigger value="profitability" className="rounded-lg">
            Profitability
          </TabsTrigger>
        </TabsList>

        {/* Sales Trends Tab */}
        <TabsContent value="sales" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 bg-white border-0 shadow-sm ring-1 ring-slate-200">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold text-slate-900">Sales Performance Trend</CardTitle>
                  <div className="flex items-center space-x-2">
                    {metrics.map((metric) => (
                      <Button
                        key={metric.value}
                        variant={selectedMetric === metric.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedMetric(metric.value)}
                        className={
                          selectedMetric === metric.value
                            ? "bg-blue-600 text-white"
                            : "border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
                        }
                      >
                        <metric.icon className="w-4 h-4 mr-1" />
                        {metric.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={salesTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey={selectedMetric}
                      stroke="#3B82F6"
                      fill="url(#colorGradient)"
                      strokeWidth={3}
                    />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-sm ring-1 ring-slate-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-slate-900">Monthly Growth Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {salesTrendData.slice(-6).map((data, index) => {
                    const prevData = salesTrendData[salesTrendData.length - 7 + index]
                    const growth = prevData ? ((data.revenue - prevData.revenue) / prevData.revenue) * 100 : 0
                    return (
                      <div key={data.month} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <p className="font-semibold text-slate-900">{data.month}</p>
                          <p className="text-sm text-slate-600">${(data.revenue / 1000).toFixed(0)}K revenue</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            {growth >= 0 ? (
                              <TrendingUp className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-red-600" />
                            )}
                            <span className={`font-semibold ${growth >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                              {growth >= 0 ? "+" : ""}
                              {growth.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Category Analysis Tab */}
        <TabsContent value="categories" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white border-0 shadow-sm ring-1 ring-slate-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-slate-900">Revenue by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={categoryPerformanceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                    >
                      {categoryPerformanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`$${(Number(value) / 1000).toFixed(0)}K`, "Revenue"]}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-sm ring-1 ring-slate-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-slate-900">Category Growth Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={categoryPerformanceData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis type="number" stroke="#64748b" />
                    <YAxis dataKey="name" type="category" width={100} stroke="#64748b" />
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Growth Rate"]}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                    <Bar dataKey="growth" fill="#10B981" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Inventory Metrics Tab */}
        <TabsContent value="inventory" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white border-0 shadow-sm ring-1 ring-slate-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-slate-900">Inventory Turnover by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={inventoryTurnoverData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="category" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                    <Bar dataKey="turnover" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-sm ring-1 ring-slate-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-slate-900">Inventory Efficiency Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inventoryTurnoverData.map((item, index) => (
                    <div key={item.category} className="p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-slate-900">{item.category}</h4>
                        <Badge
                          className={`${
                            item.efficiency >= 90
                              ? "bg-emerald-100 text-emerald-700"
                              : item.efficiency >= 80
                                ? "bg-amber-100 text-amber-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {item.efficiency}% Efficient
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-600">Turnover Rate:</span>
                          <p className="font-bold text-slate-900">{item.turnover}x</p>
                        </div>
                        <div>
                          <span className="text-slate-600">Days on Hand:</span>
                          <p className="font-bold text-slate-900">{item.daysOnHand} days</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Customer Insights Tab */}
        <TabsContent value="customers" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white border-0 shadow-sm ring-1 ring-slate-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-slate-900">Customer Segmentation</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={customerAnalyticsData}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="count"
                      label={({ segment, percentage }) => `${segment}: ${percentage}%`}
                    >
                      {customerAnalyticsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [value.toLocaleString(), "Customers"]}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-sm ring-1 ring-slate-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-slate-900">Customer Value Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customerAnalyticsData.map((segment, index) => (
                    <div key={segment.segment} className="p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-slate-900">{segment.segment}</h4>
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                      </div>
                      <div className="grid grid-cols-3 gap-3 text-sm">
                        <div>
                          <span className="text-slate-600">Count:</span>
                          <p className="font-bold text-slate-900">{segment.count.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-slate-600">Percentage:</span>
                          <p className="font-bold text-slate-900">{segment.percentage}%</p>
                        </div>
                        <div>
                          <span className="text-slate-600">Avg Value:</span>
                          <p className="font-bold text-emerald-600">${segment.value}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Profitability Tab */}
        <TabsContent value="profitability" className="space-y-6">
          <Card className="bg-white border-0 shadow-sm ring-1 ring-slate-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-slate-900">Profit Margin Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={profitMarginData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="grossMargin" stroke="#10B981" strokeWidth={3} name="Gross Margin %" />
                  <Line type="monotone" dataKey="netMargin" stroke="#3B82F6" strokeWidth={3} name="Net Margin %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Summary Insights */}
      <Card className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-0 shadow-sm ring-1 ring-blue-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-slate-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Key Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-white rounded-xl border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <h4 className="font-semibold text-slate-900">Strong Growth</h4>
              </div>
              <p className="text-sm text-slate-600">
                Revenue increased by 18.2% this period, with Electronics and Clothing categories leading growth.
              </p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-slate-900">Inventory Optimization</h4>
              </div>
              <p className="text-sm text-slate-600">
                Produce category shows excellent turnover (18.2x), while Electronics needs attention (4.8x).
              </p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-purple-600" />
                <h4 className="font-semibold text-slate-900">Customer Retention</h4>
              </div>
              <p className="text-sm text-slate-600">
                59% returning customers with high average value. Focus on converting new customers to returning.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
