"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, DollarSign, Clock } from "lucide-react"

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

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div>
        <h2 className="text-2xl font-bold">Supply Chain Analytics</h2>
        <p className="text-muted-foreground">Performance metrics and insights</p>
      </div>

      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
          <TabsTrigger value="utilization">Utilization</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Delivery Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Performance</CardTitle>
                <CardDescription>On-time vs delayed deliveries by month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deliveryPerformance.map((month) => (
                    <div key={month.month} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{month.month}</span>
                        <span>{month.onTime}% on-time</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-green-600 h-3 rounded-full" style={{ width: `${month.onTime}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Key Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Key Performance Indicators</CardTitle>
                <CardDescription>Current month performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Average Delivery Time</p>
                      <p className="text-sm text-muted-foreground">2.3 days</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-green-600">-0.2 days</p>
                    <p className="text-xs text-muted-foreground">vs last month</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Order Fulfillment Rate</p>
                      <p className="text-sm text-muted-foreground">98.7%</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-green-600">+1.2%</p>
                    <p className="text-xs text-muted-foreground">vs last month</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="font-medium">Cost per Shipment</p>
                      <p className="text-sm text-muted-foreground">$45.20</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-red-600">+$2.10</p>
                    <p className="text-xs text-muted-foreground">vs last month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="costs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cost Breakdown Analysis</CardTitle>
              <CardDescription>Monthly operational costs by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {costAnalysis.map((item) => (
                  <div key={item.category} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{item.category}</h4>
                      <p className="text-2xl font-bold">${(item.cost / 1000000).toFixed(1)}M</p>
                    </div>
                    <div className="text-right">
                      <div
                        className={`flex items-center space-x-1 ${item.change >= 0 ? "text-red-600" : "text-green-600"}`}
                      >
                        {item.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                        <span className="font-medium">{Math.abs(item.change)}%</span>
                      </div>
                      <p className="text-xs text-muted-foreground">vs last month</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="utilization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Warehouse Utilization</CardTitle>
              <CardDescription>Current capacity usage across all facilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {warehouseUtilization.map((warehouse) => (
                  <div key={warehouse.warehouse} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{warehouse.warehouse} Distribution Center</h4>
                      <span className="text-sm text-muted-foreground">
                        {warehouse.utilization}% (
                        {((warehouse.capacity * warehouse.utilization) / 100).toLocaleString()} /{" "}
                        {warehouse.capacity.toLocaleString()})
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className={`h-4 rounded-full transition-all ${
                          warehouse.utilization > 90
                            ? "bg-red-600"
                            : warehouse.utilization > 80
                              ? "bg-yellow-600"
                              : "bg-green-600"
                        }`}
                        style={{ width: `${warehouse.utilization}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Volume Trends</CardTitle>
                <CardDescription>Shipment volume over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between space-x-2">
                  {[65, 78, 82, 75, 88, 92, 85, 90, 95, 88, 92, 96].map((height, index) => (
                    <div key={index} className="flex-1 bg-blue-600 rounded-t" style={{ height: `${height}%` }} />
                  ))}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Jan</span>
                  <span>Dec</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Efficiency Metrics</CardTitle>
                <CardDescription>Key efficiency indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Fuel Efficiency</p>
                    <p className="text-sm text-muted-foreground">7.2 MPG avg</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-green-600">+0.3 MPG</p>
                    <p className="text-xs text-muted-foreground">vs last quarter</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Route Optimization</p>
                    <p className="text-sm text-muted-foreground">94% optimal routes</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-green-600">+2%</p>
                    <p className="text-xs text-muted-foreground">vs last quarter</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Load Utilization</p>
                    <p className="text-sm text-muted-foreground">87% capacity used</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-green-600">+5%</p>
                    <p className="text-xs text-muted-foreground">vs last quarter</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
