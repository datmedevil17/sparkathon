"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Warehouse, Store, Package, Clock, Filter, Eye } from "lucide-react"

interface Supplier {
  id: string
  name: string
  type: "warehouse" | "distribution_center" | "manufacturer"
  location: string
  coordinates: { x: number; y: number }
  status: "operational" | "delayed" | "maintenance" | "offline"
  reliability: number
  categories: string[]
  activeDeliveries: number
  nextDelivery?: string
}

interface Delivery {
  id: string
  supplierId: string
  supplierName: string
  vehicleType: "truck" | "van" | "freight"
  status: "dispatched" | "in_transit" | "arriving" | "delayed" | "delivered"
  progress: number
  eta: string
  items: Array<{
    category: string
    quantity: number
    value: number
  }>
  coordinates: { x: number; y: number }
  route: Array<{ x: number; y: number }>
  priority: "high" | "medium" | "low"
  estimatedValue: number
}

const suppliers: Supplier[] = [
  {
    id: "sup-1",
    name: "Walmart Regional DC",
    type: "distribution_center",
    location: "Dallas, TX",
    coordinates: { x: 25, y: 35 },
    status: "operational",
    reliability: 96,
    categories: ["Groceries", "Electronics", "Home & Garden"],
    activeDeliveries: 2,
    nextDelivery: "Today 2:30 PM",
  },
  {
    id: "sup-2",
    name: "Fresh Foods Warehouse",
    type: "warehouse",
    location: "Austin, TX",
    coordinates: { x: 30, y: 55 },
    status: "operational",
    reliability: 94,
    categories: ["Groceries", "Fresh Produce"],
    activeDeliveries: 1,
    nextDelivery: "Tomorrow 8:00 AM",
  },
  {
    id: "sup-3",
    name: "Electronics Hub",
    type: "warehouse",
    location: "Houston, TX",
    coordinates: { x: 45, y: 65 },
    status: "delayed",
    reliability: 87,
    categories: ["Electronics", "Tech Accessories"],
    activeDeliveries: 1,
    nextDelivery: "Today 6:00 PM (Delayed)",
  },
  {
    id: "sup-4",
    name: "Home Essentials DC",
    type: "distribution_center",
    location: "San Antonio, TX",
    coordinates: { x: 20, y: 70 },
    status: "operational",
    reliability: 98,
    categories: ["Home & Garden", "Cleaning Supplies"],
    activeDeliveries: 0,
    nextDelivery: "Tomorrow 10:00 AM",
  },
  {
    id: "sup-5",
    name: "Apparel Manufacturing",
    type: "manufacturer",
    location: "Fort Worth, TX",
    coordinates: { x: 28, y: 25 },
    status: "operational",
    reliability: 91,
    categories: ["Clothing", "Accessories"],
    activeDeliveries: 1,
    nextDelivery: "Today 4:00 PM",
  },
]

const deliveries: Delivery[] = [
  {
    id: "del-1",
    supplierId: "sup-1",
    supplierName: "Walmart Regional DC",
    vehicleType: "truck",
    status: "in_transit",
    progress: 65,
    eta: "2:30 PM",
    coordinates: { x: 35, y: 45 },
    route: [
      { x: 25, y: 35 },
      { x: 30, y: 40 },
      { x: 35, y: 45 },
      { x: 50, y: 50 },
    ],
    priority: "high",
    estimatedValue: 15420,
    items: [
      { category: "Groceries", quantity: 150, value: 8500 },
      { category: "Electronics", quantity: 25, value: 6920 },
    ],
  },
  {
    id: "del-2",
    supplierId: "sup-2",
    supplierName: "Fresh Foods Warehouse",
    vehicleType: "van",
    status: "dispatched",
    progress: 15,
    eta: "8:00 AM Tomorrow",
    coordinates: { x: 32, y: 52 },
    route: [
      { x: 30, y: 55 },
      { x: 35, y: 52 },
      { x: 45, y: 50 },
      { x: 50, y: 50 },
    ],
    priority: "high",
    estimatedValue: 3200,
    items: [
      { category: "Fresh Produce", quantity: 80, value: 2100 },
      { category: "Dairy", quantity: 45, value: 1100 },
    ],
  },
  {
    id: "del-3",
    supplierId: "sup-3",
    supplierName: "Electronics Hub",
    vehicleType: "truck",
    status: "delayed",
    progress: 40,
    eta: "6:00 PM (Delayed)",
    coordinates: { x: 47, y: 60 },
    route: [
      { x: 45, y: 65 },
      { x: 47, y: 60 },
      { x: 49, y: 55 },
      { x: 50, y: 50 },
    ],
    priority: "medium",
    estimatedValue: 12800,
    items: [{ category: "Electronics", quantity: 35, value: 12800 }],
  },
]

// Shop location (destination for all deliveries)
const shopLocation = { x: 50, y: 50 }

export function SupplyChainMap() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all")
  const [selectedDelivery, setSelectedDelivery] = useState<string | null>(null)
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
        return "text-green-600"
      case "delayed":
        return "text-red-600"
      case "maintenance":
        return "text-yellow-600"
      case "offline":
        return "text-gray-600"
      case "in_transit":
        return "text-blue-600"
      case "dispatched":
        return "text-purple-600"
      case "arriving":
        return "text-green-600"
      case "delivered":
        return "text-gray-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "operational":
        return "default"
      case "delayed":
        return "destructive"
      case "maintenance":
        return "secondary"
      case "offline":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-500 bg-red-50"
      case "medium":
        return "border-yellow-500 bg-yellow-50"
      case "low":
        return "border-green-500 bg-green-50"
      default:
        return "border-gray-500 bg-gray-50"
    }
  }

  const getVehicleIcon = (vehicleType: string) => {
    switch (vehicleType) {
      case "truck":
        return "🚛"
      case "van":
        return "🚐"
      case "freight":
        return "🚚"
      default:
        return "🚛"
    }
  }

  const filteredSuppliers =
    selectedFilter === "all"
      ? suppliers
      : suppliers.filter((s) => s.categories.some((cat) => cat.toLowerCase().includes(selectedFilter.toLowerCase())))

  const filteredDeliveries =
    selectedFilter === "all"
      ? deliveries
      : deliveries.filter((d) =>
          d.items.some((item) => item.category.toLowerCase().includes(selectedFilter.toLowerCase())),
        )

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Store className="h-6 w-6 text-blue-600" />
                <span>Your Supply Network</span>
              </CardTitle>
              <CardDescription>Real-time view of incoming deliveries and supplier network</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                Live • {currentTime.toLocaleTimeString()}
              </Badge>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="map" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="map">Network Map</TabsTrigger>
              <TabsTrigger value="deliveries">Active Deliveries</TabsTrigger>
              <TabsTrigger value="suppliers">Supplier Status</TabsTrigger>
            </TabsList>

            <TabsContent value="map">
              {/* Category Filter */}
              <div className="flex space-x-2 mb-4">
                <Button
                  variant={selectedFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter("all")}
                >
                  All Categories
                </Button>
                <Button
                  variant={selectedFilter === "groceries" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter("groceries")}
                >
                  Groceries
                </Button>
                <Button
                  variant={selectedFilter === "electronics" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter("electronics")}
                >
                  Electronics
                </Button>
                <Button
                  variant={selectedFilter === "home" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter("home")}
                >
                  Home & Garden
                </Button>
              </div>

              {/* Enhanced Map */}
              <div className="relative w-full h-[500px] bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border-2 border-gray-200 overflow-hidden">
                {/* Geographic Background */}
                <div className="absolute inset-0 opacity-10">
                  <svg width="100%" height="100%">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>

                {/* State/Region Labels */}
                <div className="absolute top-4 left-4 text-xs text-gray-500 font-medium">Texas Supply Network</div>

                {/* Delivery Routes */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {filteredDeliveries.map((delivery) => (
                    <g key={delivery.id}>
                      {/* Route Path */}
                      <path
                        d={`M ${delivery.route[0].x}% ${delivery.route[0].y}% ${delivery.route
                          .slice(1)
                          .map((point) => `L ${point.x}% ${point.y}%`)
                          .join(" ")}`}
                        stroke={
                          delivery.status === "delayed"
                            ? "#ef4444"
                            : delivery.priority === "high"
                              ? "#3b82f6"
                              : "#6b7280"
                        }
                        strokeWidth="3"
                        strokeDasharray={delivery.status === "in_transit" ? "8,4" : "none"}
                        fill="none"
                        className={delivery.status === "in_transit" ? "animate-pulse" : ""}
                        opacity="0.7"
                      />

                      {/* Direction Arrow */}
                      <polygon
                        points="0,-4 8,0 0,4"
                        fill={delivery.status === "delayed" ? "#ef4444" : "#3b82f6"}
                        transform={`translate(${shopLocation.x}%, ${shopLocation.y}%) rotate(45)`}
                        opacity="0.8"
                      />
                    </g>
                  ))}
                </svg>

                {/* Your Shop (Central Hub) */}
                <div
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                  style={{ left: `${shopLocation.x}%`, top: `${shopLocation.y}%` }}
                >
                  <div className="relative">
                    <div className="bg-blue-600 rounded-full p-3 shadow-lg border-4 border-white">
                      <Store className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-2 py-1 rounded font-medium whitespace-nowrap">
                      Your Shop
                    </div>
                    {/* Pulse animation for active deliveries */}
                    <div className="absolute inset-0 rounded-full bg-blue-400 opacity-30 animate-ping" />
                  </div>
                </div>

                {/* Supplier Locations */}
                {filteredSuppliers.map((supplier) => (
                  <div
                    key={supplier.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
                    style={{ left: `${supplier.coordinates.x}%`, top: `${supplier.coordinates.y}%` }}
                  >
                    <div className="relative">
                      {/* Supplier Icon */}
                      <div
                        className={`p-2 rounded-lg shadow-md border-2 ${
                          supplier.status === "operational"
                            ? "bg-green-100 border-green-500"
                            : supplier.status === "delayed"
                              ? "bg-red-100 border-red-500"
                              : supplier.status === "maintenance"
                                ? "bg-yellow-100 border-yellow-500"
                                : "bg-gray-100 border-gray-500"
                        }`}
                      >
                        {supplier.type === "distribution_center" ? (
                          <Warehouse className={`h-6 w-6 ${getStatusColor(supplier.status)}`} />
                        ) : supplier.type === "manufacturer" ? (
                          <Package className={`h-6 w-6 ${getStatusColor(supplier.status)}`} />
                        ) : (
                          <Warehouse className={`h-5 w-5 ${getStatusColor(supplier.status)}`} />
                        )}
                      </div>

                      {/* Active Deliveries Indicator */}
                      {supplier.activeDeliveries > 0 && (
                        <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                          {supplier.activeDeliveries}
                        </div>
                      )}

                      {/* Detailed Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity z-30">
                        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-64">
                          <div className="space-y-2">
                            <div className="flex justify-between items-start">
                              <h4 className="font-semibold text-sm">{supplier.name}</h4>
                              <Badge variant={getStatusBadgeVariant(supplier.status)} className="text-xs">
                                {supplier.status}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-600">{supplier.location}</p>

                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span>Reliability:</span>
                                <span className="font-medium">{supplier.reliability}%</span>
                              </div>
                              <Progress value={supplier.reliability} className="h-1" />
                            </div>

                            <div className="space-y-1">
                              <p className="text-xs font-medium">Categories:</p>
                              <div className="flex flex-wrap gap-1">
                                {supplier.categories.map((cat) => (
                                  <Badge key={cat} variant="outline" className="text-xs">
                                    {cat}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {supplier.nextDelivery && (
                              <div className="pt-1 border-t">
                                <p className="text-xs">
                                  <Clock className="h-3 w-3 inline mr-1" />
                                  Next: {supplier.nextDelivery}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white" />
                      </div>
                    </div>
                  </div>
                ))}

                {/* Active Delivery Vehicles */}
                {filteredDeliveries.map((delivery) => (
                  <div
                    key={delivery.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-15"
                    style={{ left: `${delivery.coordinates.x}%`, top: `${delivery.coordinates.y}%` }}
                    onClick={() => setSelectedDelivery(selectedDelivery === delivery.id ? null : delivery.id)}
                  >
                    <div className="relative">
                      {/* Vehicle */}
                      <div className={`text-2xl ${delivery.status === "delayed" ? "animate-bounce" : ""}`}>
                        {getVehicleIcon(delivery.vehicleType)}
                      </div>

                      {/* Status Indicator */}
                      <div
                        className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
                          delivery.status === "in_transit"
                            ? "bg-blue-500 animate-pulse"
                            : delivery.status === "delayed"
                              ? "bg-red-500 animate-pulse"
                              : delivery.status === "dispatched"
                                ? "bg-purple-500"
                                : "bg-green-500"
                        }`}
                      />

                      {/* Delivery Details Popup */}
                      {selectedDelivery === delivery.id && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-40">
                          <div className="bg-white border border-gray-200 rounded-lg shadow-xl p-4 min-w-72">
                            <div className="space-y-3">
                              <div className="flex justify-between items-start">
                                <h4 className="font-semibold">{delivery.supplierName}</h4>
                                <Badge variant={delivery.status === "delayed" ? "destructive" : "default"}>
                                  {delivery.status.replace("_", " ")}
                                </Badge>
                              </div>

                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Progress:</span>
                                  <span>{delivery.progress}%</span>
                                </div>
                                <Progress value={delivery.progress} className="h-2" />
                                <div className="flex justify-between text-sm">
                                  <span>ETA:</span>
                                  <span className="font-medium">{delivery.eta}</span>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <p className="text-sm font-medium">Items:</p>
                                {delivery.items.map((item, idx) => (
                                  <div key={idx} className="flex justify-between text-xs">
                                    <span>
                                      {item.category} ({item.quantity})
                                    </span>
                                    <span>${item.value.toLocaleString()}</span>
                                  </div>
                                ))}
                                <div className="border-t pt-1 flex justify-between text-sm font-medium">
                                  <span>Total Value:</span>
                                  <span>${delivery.estimatedValue.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-lg shadow-lg p-3 space-y-2">
                  <h4 className="font-medium text-sm">Legend</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center space-x-2">
                      <Store className="h-4 w-4 text-blue-600" />
                      <span>Your Shop</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Warehouse className="h-4 w-4 text-green-600" />
                      <span>Supplier (Operational)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Warehouse className="h-4 w-4 text-red-600" />
                      <span>Supplier (Issues)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">🚛</span>
                      <span>Active Delivery</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-0.5 bg-blue-600" style={{ strokeDasharray: "2,2" }} />
                      <span>Delivery Route</span>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="absolute top-4 right-4 space-y-2">
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    {suppliers.filter((s) => s.status === "operational").length} Suppliers Online
                  </Badge>
                  <Badge variant="default" className="bg-blue-100 text-blue-800">
                    {deliveries.filter((d) => d.status === "in_transit").length} En Route
                  </Badge>
                  {deliveries.some((d) => d.status === "delayed") && (
                    <Badge variant="destructive">
                      {deliveries.filter((d) => d.status === "delayed").length} Delayed
                    </Badge>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="deliveries">
              <ScrollArea className="h-96">
                <div className="space-y-4">
                  {deliveries.map((delivery) => (
                    <div key={delivery.id} className={`border rounded-lg p-4 ${getPriorityColor(delivery.priority)}`}>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold flex items-center space-x-2">
                            <span className="text-lg">{getVehicleIcon(delivery.vehicleType)}</span>
                            <span>{delivery.supplierName}</span>
                          </h4>
                          <p className="text-sm text-gray-600">Delivery #{delivery.id}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={delivery.status === "delayed" ? "destructive" : "default"}>
                            {delivery.status.replace("_", " ")}
                          </Badge>
                          <p className="text-sm mt-1">ETA: {delivery.eta}</p>
                        </div>
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between text-sm">
                          <span>Progress:</span>
                          <span>{delivery.progress}%</span>
                        </div>
                        <Progress value={delivery.progress} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium mb-1">Items:</p>
                          {delivery.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between">
                              <span>{item.category}</span>
                              <span>{item.quantity} units</span>
                            </div>
                          ))}
                        </div>
                        <div>
                          <p className="font-medium mb-1">Value:</p>
                          <p className="text-lg font-bold">${delivery.estimatedValue.toLocaleString()}</p>
                          <Badge variant="outline" className="mt-1">
                            {delivery.priority} priority
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="suppliers">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {suppliers.map((supplier) => (
                  <Card key={supplier.id}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{supplier.name}</CardTitle>
                          <CardDescription>{supplier.location}</CardDescription>
                        </div>
                        <Badge variant={getStatusBadgeVariant(supplier.status)}>{supplier.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Reliability Score:</span>
                          <span className="font-medium">{supplier.reliability}%</span>
                        </div>
                        <Progress value={supplier.reliability} className="h-2" />
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">Product Categories:</p>
                        <div className="flex flex-wrap gap-1">
                          {supplier.categories.map((category) => (
                            <Badge key={category} variant="outline" className="text-xs">
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Active Deliveries:</span>
                          <p className="font-medium">{supplier.activeDeliveries}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Next Delivery:</span>
                          <p className="font-medium text-xs">{supplier.nextDelivery || "Not scheduled"}</p>
                        </div>
                      </div>

                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
