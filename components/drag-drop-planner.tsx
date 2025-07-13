"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, Truck, Plus, Save } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Item {
  id: string
  name: string
  quantity: number
  weight: number
  priority: "high" | "medium" | "low"
  category: string
}

interface Shipment {
  id: string
  name: string
  destination: string
  capacity: number
  currentWeight: number
  items: Item[]
}

const availableItems: Item[] = [
  { id: "item-1", name: "Electronics - TVs", quantity: 50, weight: 25, priority: "high", category: "Electronics" },
  {
    id: "item-2",
    name: "Groceries - Canned Goods",
    quantity: 200,
    weight: 10,
    priority: "medium",
    category: "Groceries",
  },
  { id: "item-3", name: "Clothing - Winter Jackets", quantity: 75, weight: 5, priority: "low", category: "Clothing" },
  {
    id: "item-4",
    name: "Home & Garden - Tools",
    quantity: 30,
    weight: 15,
    priority: "medium",
    category: "Home & Garden",
  },
  { id: "item-5", name: "Electronics - Laptops", quantity: 25, weight: 8, priority: "high", category: "Electronics" },
  {
    id: "item-6",
    name: "Groceries - Fresh Produce",
    quantity: 100,
    weight: 12,
    priority: "high",
    category: "Groceries",
  },
]

const initialShipments: Shipment[] = [
  {
    id: "shipment-1",
    name: "Shipment to Houston",
    destination: "Houston, TX",
    capacity: 1000,
    currentWeight: 0,
    items: [],
  },
  {
    id: "shipment-2",
    name: "Shipment to Miami",
    destination: "Miami, FL",
    capacity: 800,
    currentWeight: 0,
    items: [],
  },
  {
    id: "shipment-3",
    name: "Shipment to Denver",
    destination: "Denver, CO",
    capacity: 1200,
    currentWeight: 0,
    items: [],
  },
]

export function DragDropShipmentPlanner() {
  const [items, setItems] = useState(availableItems)
  const [shipments, setShipments] = useState(initialShipments)
  const [newShipmentName, setNewShipmentName] = useState("")
  const [newShipmentDestination, setNewShipmentDestination] = useState("")
  const [newShipmentCapacity, setNewShipmentCapacity] = useState("")

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    // Moving from available items to shipment
    if (source.droppableId === "available-items" && destination.droppableId.startsWith("shipment-")) {
      const item = items.find((item) => item.id === draggableId)
      if (!item) return

      const shipmentId = destination.droppableId
      const newShipments = shipments.map((shipment) => {
        if (shipment.id === shipmentId) {
          const newWeight = shipment.currentWeight + item.weight * item.quantity
          if (newWeight > shipment.capacity) {
            alert("Shipment capacity exceeded!")
            return shipment
          }
          return {
            ...shipment,
            currentWeight: newWeight,
            items: [...shipment.items, item],
          }
        }
        return shipment
      })

      setShipments(newShipments)
      setItems(items.filter((i) => i.id !== draggableId))
    }

    // Moving from shipment back to available items
    if (source.droppableId.startsWith("shipment-") && destination.droppableId === "available-items") {
      const sourceShipmentId = source.droppableId
      const sourceShipment = shipments.find((s) => s.id === sourceShipmentId)
      const item = sourceShipment?.items.find((item) => item.id === draggableId)

      if (!item || !sourceShipment) return

      const newShipments = shipments.map((shipment) => {
        if (shipment.id === sourceShipmentId) {
          return {
            ...shipment,
            currentWeight: shipment.currentWeight - item.weight * item.quantity,
            items: shipment.items.filter((i) => i.id !== draggableId),
          }
        }
        return shipment
      })

      setShipments(newShipments)
      setItems([...items, item])
    }

    // Moving between shipments
    if (source.droppableId.startsWith("shipment-") && destination.droppableId.startsWith("shipment-")) {
      const sourceShipmentId = source.droppableId
      const destShipmentId = destination.droppableId

      if (sourceShipmentId === destShipmentId) return

      const sourceShipment = shipments.find((s) => s.id === sourceShipmentId)
      const destShipment = shipments.find((s) => s.id === destShipmentId)
      const item = sourceShipment?.items.find((item) => item.id === draggableId)

      if (!item || !sourceShipment || !destShipment) return

      const newDestWeight = destShipment.currentWeight + item.weight * item.quantity
      if (newDestWeight > destShipment.capacity) {
        alert("Destination shipment capacity exceeded!")
        return
      }

      const newShipments = shipments.map((shipment) => {
        if (shipment.id === sourceShipmentId) {
          return {
            ...shipment,
            currentWeight: shipment.currentWeight - item.weight * item.quantity,
            items: shipment.items.filter((i) => i.id !== draggableId),
          }
        }
        if (shipment.id === destShipmentId) {
          return {
            ...shipment,
            currentWeight: newDestWeight,
            items: [...shipment.items, item],
          }
        }
        return shipment
      })

      setShipments(newShipments)
    }
  }

  const addNewShipment = () => {
    if (!newShipmentName || !newShipmentDestination || !newShipmentCapacity) return

    const newShipment: Shipment = {
      id: `shipment-${Date.now()}`,
      name: newShipmentName,
      destination: newShipmentDestination,
      capacity: Number.parseInt(newShipmentCapacity),
      currentWeight: 0,
      items: [],
    }

    setShipments([...shipments, newShipment])
    setNewShipmentName("")
    setNewShipmentDestination("")
    setNewShipmentCapacity("")
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Shipment Planning</h2>
          <p className="text-muted-foreground">Drag and drop items to plan your next shipments</p>
        </div>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Plan
        </Button>
      </div>

      {/* Add New Shipment */}
      <Card>
        <CardHeader>
          <CardTitle>Create New Shipment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="shipment-name">Shipment Name</Label>
              <Input
                id="shipment-name"
                value={newShipmentName}
                onChange={(e) => setNewShipmentName(e.target.value)}
                placeholder="Enter shipment name"
              />
            </div>
            <div>
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                value={newShipmentDestination}
                onChange={(e) => setNewShipmentDestination(e.target.value)}
                placeholder="Enter destination"
              />
            </div>
            <div>
              <Label htmlFor="capacity">Capacity (kg)</Label>
              <Input
                id="capacity"
                type="number"
                value={newShipmentCapacity}
                onChange={(e) => setNewShipmentCapacity(e.target.value)}
                placeholder="Enter capacity"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={addNewShipment} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Shipment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Available Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="h-5 w-5 mr-2" />
                Available Items
              </CardTitle>
              <CardDescription>{items.length} items ready for shipment</CardDescription>
            </CardHeader>
            <CardContent>
              <Droppable droppableId="available-items">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`space-y-2 min-h-[400px] p-2 rounded-lg border-2 border-dashed transition-colors ${
                      snapshot.isDraggingOver ? "border-blue-400 bg-blue-50" : "border-gray-200"
                    }`}
                  >
                    {items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`p-3 bg-white border rounded-lg shadow-sm cursor-move transition-shadow ${
                              snapshot.isDragging ? "shadow-lg" : "hover:shadow-md"
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium text-sm">{item.name}</h4>
                              <Badge className={getPriorityColor(item.priority)}>{item.priority}</Badge>
                            </div>
                            <div className="text-xs text-muted-foreground space-y-1">
                              <div>Qty: {item.quantity}</div>
                              <div>Weight: {item.weight}kg each</div>
                              <div>Total: {item.weight * item.quantity}kg</div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </CardContent>
          </Card>

          {/* Shipments */}
          {shipments.map((shipment) => (
            <Card key={shipment.id}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="h-5 w-5 mr-2" />
                  {shipment.name}
                </CardTitle>
                <CardDescription>{shipment.destination}</CardDescription>
                <div className="text-sm">
                  <div className="flex justify-between">
                    <span>Capacity:</span>
                    <span>
                      {shipment.currentWeight}/{shipment.capacity}kg
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${(shipment.currentWeight / shipment.capacity) * 100}%` }}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Droppable droppableId={shipment.id}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`space-y-2 min-h-[300px] p-2 rounded-lg border-2 border-dashed transition-colors ${
                        snapshot.isDraggingOver ? "border-green-400 bg-green-50" : "border-gray-200"
                      }`}
                    >
                      {shipment.items.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`p-3 bg-white border rounded-lg shadow-sm cursor-move transition-shadow ${
                                snapshot.isDragging ? "shadow-lg" : "hover:shadow-md"
                              }`}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium text-sm">{item.name}</h4>
                                <Badge className={getPriorityColor(item.priority)}>{item.priority}</Badge>
                              </div>
                              <div className="text-xs text-muted-foreground space-y-1">
                                <div>Qty: {item.quantity}</div>
                                <div>Total: {item.weight * item.quantity}kg</div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      {shipment.items.length === 0 && (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                          Drop items here to add to shipment
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </CardContent>
            </Card>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}
