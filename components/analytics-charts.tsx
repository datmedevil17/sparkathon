"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Clock, Package, BarChart3, Activity } from "lucide-react"

export function AnalyticsCharts() {
  // Mock data for charts
  const deliveryPerformance = [
    { month: "Jan", onTime: 92, delayed: 8 },
    { month: "Feb", onTime: 89, delayed: 11 },
    { month: "Mar", onTime: 94, delayed: 6 },
    { month: "Apr", onTime: 91, delayed: 9 },
    { month: "May", onTime: 96, delayed: 4 },
    { month: "Jun", onTime: 94, delayed: 6 },
  ]

  const costAnalysis = [
    { category: "Transportation", cost: 2400000, change: 5.2 },
    { category: "Warehousing", cost: 1800000, change: -2.1 },
    { category: "Inventory", cost: 3200000, change: 1.8 },
    { category: "Labor", cost: 1600000, change: 3.4 },
  ]

  const warehouseUtilization = [
    { warehouse: "Dallas", utilization: 85, capacity: 10000 },
    { warehouse: "Phoenix", utilization: 92, capacity: 8000 },
    { warehouse: "Atlanta", utilization: 78, capacity: 12000 },
    { warehouse: "Chicago", utilization: 88, capacity: 9500 },
  ]

  const volumeTrends = [65, 78, 82, 75, 88, 92, 85, 90, 95, 88, 92, 96]

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight">Supply Chain Analytics Dashboard</h2>
        <p className="text-muted-foreground mt-2">Comprehensive performance metrics and insights</p>
      </div>

      {/* Performance Section */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Activity className="h-6 w-6 text-blue-600" />
          <h3 className="text-xl font-semibold">Performance Metrics</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Delivery Performance Chart */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <span>Delivery Performance</span>
              </CardTitle>
              <CardDescription>On-time vs delayed deliveries by month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deliveryPerformance.map((month) => (
                  <div key={month.month} className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span>{month.month}</span>
                      <span className="text-green-700">{month.onTime}% on-time</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-300 ease-in-out" 
                        style={{ width: `${month.onTime}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-green-600" />
                <span>Key Performance Indicators</span>
              </CardTitle>
              <CardDescription>Current month performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-green-200 bg-white rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Average Delivery Time</p>
                    <p className="text-lg font-bold text-green-700">2.3 days</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-600 font-medium">-0.2 days</p>
                  <p className="text-xs text-muted-foreground">vs last month</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-blue-200 bg-white rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Order Fulfillment Rate</p>
                    <p className="text-lg font-bold text-blue-700">98.7%</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-600 font-medium">+1.2%</p>
                  <p className="text-xs text-muted-foreground">vs last month</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-yellow-200 bg-white rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-yellow-100 rounded-full">
                    <DollarSign className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Cost per Shipment</p>
                    <p className="text-lg font-bold text-yellow-700">$45.20</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-red-600 font-medium">+$2.10</p>
                  <p className="text-xs text-muted-foreground">vs last month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Cost Analysis Section */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <DollarSign className="h-6 w-6 text-green-600" />
          <h3 className="text-xl font-semibold">Cost Analysis</h3>
        </div>
        
        <Card className="shadow-lg border-0 bg-gradient-to-br from-yellow-50 to-orange-50">
          <CardHeader>
            <CardTitle>Cost Breakdown Analysis</CardTitle>
            <CardDescription>Monthly operational costs by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {costAnalysis.map((item) => (
                <div key={item.category} className="flex items-center justify-between p-4 border bg-white rounded-lg hover:shadow-md transition-all">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{item.category}</h4>
                    <p className="text-2xl font-bold text-gray-900">${(item.cost / 1000000).toFixed(1)}M</p>
                  </div>
                  <div className="text-right">
                    <div
                      className={`flex items-center space-x-1 ${item.change >= 0 ? "text-red-600" : "text-green-600"}`}
                    >
                      {item.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      <span className="font-semibold">{Math.abs(item.change)}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">vs last month</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Utilization Section */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Package className="h-6 w-6 text-purple-600" />
          <h3 className="text-xl font-semibold">Warehouse Utilization</h3>
        </div>
        
        <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-pink-50">
          <CardHeader>
            <CardTitle>Warehouse Capacity Usage</CardTitle>
            <CardDescription>Current utilization across all distribution facilities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {warehouseUtilization.map((warehouse) => (
                <div key={warehouse.warehouse} className="space-y-3 p-4 border bg-white rounded-lg">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-lg">{warehouse.warehouse} Distribution Center</h4>
                    <span className="text-sm text-muted-foreground font-medium">
                      {warehouse.utilization}% ({((warehouse.capacity * warehouse.utilization) / 100).toLocaleString()} / {warehouse.capacity.toLocaleString()})
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div
                      className={`h-4 rounded-full transition-all duration-500 ${
                        warehouse.utilization > 90
                          ? "bg-gradient-to-r from-red-500 to-red-600"
                          : warehouse.utilization > 80
                            ? "bg-gradient-to-r from-yellow-500 to-yellow-600"
                            : "bg-gradient-to-r from-green-500 to-green-600"
                      }`}
                      style={{ width: `${warehouse.utilization}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span 
                      className={`font-medium ${
                        warehouse.utilization > 90 ? "text-red-600" : 
                        warehouse.utilization > 80 ? "text-yellow-600" : "text-green-600"
                      }`}
                    >
                      {warehouse.utilization > 90 ? "High Utilization" : 
                       warehouse.utilization > 80 ? "Moderate Utilization" : "Optimal Range"}
                    </span>
                    <span>100%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trends Section */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-6 w-6 text-indigo-600" />
          <h3 className="text-xl font-semibold">Trends & Efficiency</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-indigo-50 to-blue-50">
            <CardHeader>
              <CardTitle>Volume Trends</CardTitle>
              <CardDescription>Monthly shipment volume progression</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between space-x-2 p-4 bg-white rounded-lg">
                {volumeTrends.map((height, index) => (
                  <div 
                    key={index} 
                    className="flex-1 bg-gradient-to-t from-indigo-500 to-indigo-600 rounded-t hover:from-indigo-600 hover:to-indigo-700 transition-colors cursor-pointer" 
                    style={{ height: `${height}%` }}
                    title={`Month ${index + 1}: ${height}%`}
                  />
                ))}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-2 px-4">
                <span>Jan</span>
                <span>Jun</span>
                <span>Dec</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-teal-50 to-cyan-50">
            <CardHeader>
              <CardTitle>Efficiency Metrics</CardTitle>
              <CardDescription>Key operational efficiency indicators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-teal-200 bg-white rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-teal-100 rounded-full">
                    <Activity className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Fuel Efficiency</p>
                    <p className="text-lg font-bold text-teal-700">7.2 MPG avg</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-600 font-medium">+0.3 MPG</p>
                  <p className="text-xs text-muted-foreground">vs last quarter</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-blue-200 bg-white rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Route Optimization</p>
                    <p className="text-lg font-bold text-blue-700">94% optimal</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-600 font-medium">+2%</p>
                  <p className="text-xs text-muted-foreground">vs last quarter</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-purple-200 bg-white rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <Package className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Load Utilization</p>
                    <p className="text-lg font-bold text-purple-700">87% capacity</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-600 font-medium">+5%</p>
                  <p className="text-xs text-muted-foreground">vs last quarter</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
