"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Truck, MapPin, Clock, Package, AlertCircle } from "lucide-react"

interface LiveShipment {
  id: string
  trackingNumber: string
  origin: string
  destination: string
  status: "departed" | "in-transit" | "delayed" | "arrived" | "delivered"
  progress: number
  estimatedArrival: string
  currentLocation: string
  driver: string
  items: number
  lastUpdate: Date
}

const mockShipments: LiveShipment[] = [
  {
    id: "1",
    trackingNumber: "WM-2024-001",
    origin: "Dallas, TX",
    destination: "Houston, TX",
    status: "in-transit",
    progress: 65,
    estimatedArrival: "2:30 PM",
    currentLocation: "I-45 near Huntsville",
    driver: "John Smith",
    items: 145,
    lastUpdate: new Date(Date.now() - 5 * 60 * 1000),
  },
  {
    id: "2",
    trackingNumber: "WM-2024-002",
    origin: "Phoenix, AZ",
    destination: "Las Vegas, NV",
    status: "delayed",
    progress: 40,
    estimatedArrival: "6:45 PM",
    currentLocation: "Flagstaff, AZ",
    driver: "Maria Garcia",
    items: 89,
    lastUpdate: new Date(Date.now() - 12 * 60 * 1000),
  },
  {
    id: "3",
    trackingNumber: "WM-2024-003",
    origin: "Atlanta, GA",
    destination: "Jacksonville, FL",
    status: "in-transit",
    progress: 80,
    estimatedArrival: "1:15 PM",
    currentLocation: "I-75 near Valdosta",
    driver: "Robert Johnson",
    items: 203,
    lastUpdate: new Date(Date.now() - 2 * 60 * 1000),
  },
  {
    id: "4",
    trackingNumber: "WM-2024-004",
    origin: "Denver, CO",
    destination: "Salt Lake City, UT",
    status: "departed",
    progress: 15,
    estimatedArrival: "11:30 PM",
    currentLocation: "I-70 near Vail",
    driver: "Sarah Wilson",
    items: 167,
    lastUpdate: new Date(Date.now() - 1 * 60 * 1000),
  },
]

export function RealtimeMonitor() {
  const [shipments, setShipments] = useState(mockShipments)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())

      // Simulate real-time updates
      setShipments((prev) =>
        prev.map((shipment) => {
          if (Math.random() < 0.1) {
            // 10% chance of update
            const progressIncrement = Math.random() * 2
            const newProgress = Math.min(shipment.progress + progressIncrement, 100)

            return {
              ...shipment,
              progress: newProgress,
              lastUpdate: new Date(),
              status: newProgress >= 100 ? "delivered" : shipment.status,
            }
          }
          return shipment
        }),
      )
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "departed":
        return "bg-blue-500"
      case "in-transit":
        return "bg-green-500"
      case "delayed":
        return "bg-red-500"
      case "arrived":
        return "bg-yellow-500"
      case "delivered":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "departed":
        return "secondary"
      case "in-transit":
        return "default"
      case "delayed":
        return "destructive"
      case "arrived":
        return "outline"
      case "delivered":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((currentTime.getTime() - date.getTime()) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    return `${hours}h ago`
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Real-time Shipment Monitor</h2>
          <p className="text-muted-foreground">Live tracking of all active shipments</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-muted-foreground">Live Updates</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Truck className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Active Shipments</p>
                <p className="text-2xl font-bold">{shipments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Total Items</p>
                <p className="text-2xl font-bold">{shipments.reduce((sum, s) => sum + s.items, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm font-medium">Delayed</p>
                <p className="text-2xl font-bold">{shipments.filter((s) => s.status === "delayed").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium">Avg Progress</p>
                <p className="text-2xl font-bold">
                  {Math.round(shipments.reduce((sum, s) => sum + s.progress, 0) / shipments.length)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Shipment Tracking */}
      <Card>
        <CardHeader>
          <CardTitle>Live Shipment Tracking</CardTitle>
          <CardDescription>Real-time updates from GPS tracking systems</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-4">
              {shipments.map((shipment) => (
                <div key={shipment.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold">{shipment.trackingNumber}</h4>
                        <Badge variant={getStatusVariant(shipment.status)}>{shipment.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {shipment.origin} → {shipment.destination}
                      </p>
                    </div>
                    <div className="text-right text-sm">
                      <p className="font-medium">ETA: {shipment.estimatedArrival}</p>
                      <p className="text-muted-foreground">{shipment.items} items</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{Math.round(shipment.progress)}%</span>
                    </div>
                    <Progress value={shipment.progress} className="h-2" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{shipment.currentLocation}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Truck className="h-4 w-4 text-muted-foreground" />
                      <span>Driver: {shipment.driver}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Updated {formatTimeAgo(shipment.lastUpdate)}</span>
                    </div>
                  </div>

                  {shipment.status === "delayed" && (
                    <div className="bg-red-50 border border-red-200 rounded p-2 text-sm text-red-800">
                      <AlertCircle className="h-4 w-4 inline mr-1" />
                      Shipment delayed due to traffic conditions. New ETA being calculated.
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
