"use client"

import { useState, useEffect } from "react"
import { Bell, Package, Truck, Warehouse, AlertTriangle, Clock, DollarSign } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { DragDropShipmentPlanner } from "@/components/drag-drop-planner"
import { RealtimeMonitor } from "@/components/realtime-monitor"
import { SupplyChainMap } from "@/components/supply-chain-map"
import { AnalyticsCharts } from "@/components/analytics-charts"

// Mock data for demonstration
const mockAlerts = [
  {
    id: 1,
    type: "delay",
    title: "Shipment Delay Alert",
    description: "Shipment #WM-2024-001 delayed by 2 hours due to weather conditions",
    severity: "warning",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: 2,
    type: "reorder",
    title: "Reorder Recommendation",
    description: "Electronics inventory at Dallas warehouse below optimal threshold",
    severity: "info",
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
  },
  {
    id: 3,
    type: "critical",
    title: "Critical Stock Alert",
    description: "Grocery items at Phoenix warehouse critically low",
    severity: "destructive",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
  },
]

const warehouseData = [
  {
    id: "WH-001",
    name: "Dallas Distribution Center",
    status: "operational",
    capacity: 85,
    location: "Dallas, TX",
    inventory: 12450,
    shipments: 23,
  },
  {
    id: "WH-002",
    name: "Phoenix Fulfillment Center",
    status: "warning",
    capacity: 92,
    location: "Phoenix, AZ",
    inventory: 8920,
    shipments: 18,
  },
  {
    id: "WH-003",
    name: "Atlanta Regional Hub",
    status: "operational",
    capacity: 78,
    location: "Atlanta, GA",
    inventory: 15680,
    shipments: 31,
  },
]

const deliveryTimelines = [
  {
    id: "DEL-001",
    destination: "Houston, TX",
    status: "in-transit",
    progress: 65,
    eta: "2 hours",
    items: 145,
  },
  {
    id: "DEL-002",
    destination: "Miami, FL",
    status: "delayed",
    progress: 40,
    eta: "5 hours",
    items: 89,
  },
  {
    id: "DEL-003",
    destination: "Denver, CO",
    status: "on-time",
    progress: 80,
    eta: "1 hour",
    items: 203,
  },
]

export default function SupplyChainDashboard() {
  const [alerts, setAlerts] = useState(mockAlerts)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-500"
      case "warning":
        return "bg-yellow-500"
      case "critical":
        return "bg-red-500"
      case "in-transit":
        return "bg-blue-500"
      case "delayed":
        return "bg-red-500"
      case "on-time":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getSeverityVariant = (severity: string): "default" | "destructive" => {
    switch (severity) {
      case "warning":
        return "default"
      case "info":
        return "default"
      case "destructive":
        return "destructive"
      default:
        return "default"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 ">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Walmart Supply Chain Command Center</h1>
            </div>
            <Badge variant="outline" className="text-xs">
              Live Data • {currentTime.toLocaleTimeString()}
            </Badge>
          </div>

     <div className="flex items-center space-x-4">
  <Button variant="outline" size="sm" className="relative bg-transparent">
    <Bell className="h-4 w-4" />
    {alerts.length > 0 && (
      <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">{alerts.length}</Badge>
    )}
  </Button>
  <div className="text-sm text-gray-600 dark:text-gray-300">
    System Status: <span className="text-green-600 font-medium">All Systems Operational</span>
  </div>
</div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Alerts Section */}
        {alerts.length > 0 && (
          <div className="space-y-2">
            {alerts.slice(0, 2).map((alert) => (
              <Alert key={alert.id} variant={getSeverityVariant(alert.severity)}>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>{alert.title}</AlertTitle>
                <AlertDescription>
                  {alert.description} • {alert.timestamp.toLocaleTimeString()}
                </AlertDescription>
              </Alert>
            ))}
          </div>
        )}

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="shipments">Shipments</TabsTrigger>
            <TabsTrigger value="warehouses">Warehouses</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="planning">Planning</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
          

            {/* Supply Chain Map */}
            <SupplyChainMap />
          </TabsContent>

          <TabsContent value="shipments">
            <RealtimeMonitor />
          </TabsContent>

          <TabsContent value="warehouses">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {warehouseData.map((warehouse) => (
                <Card key={warehouse.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {warehouse.name}
                      <Badge variant={warehouse.status === "operational" ? "default" : "destructive"}>
                        {warehouse.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{warehouse.location}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Capacity Utilization</span>
                        <span>{warehouse.capacity}%</span>
                      </div>
                      <Progress value={warehouse.capacity} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Inventory</span>
                        <p className="font-medium">{warehouse.inventory.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Active Shipments</span>
                        <p className="font-medium">{warehouse.shipments}</p>
                      </div>
                    </div>
                    <Button className="w-full bg-transparent" variant="outline">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsCharts />
          </TabsContent>

          <TabsContent value="planning">
            <DragDropShipmentPlanner />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
