"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import geminiApiRequest from "@/services/geminiApiRequest"
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
  Brain,
  X,
  ShoppingCart,
} from "lucide-react"

export default function StockManagementPage() {
  const [selectedProduct, setSelectedProduct] = useState<typeof stockItems[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "low" | "critical">("all")
  const [showAIInsights, setShowAIInsights] = useState(false)
  const [aiInsights, setAiInsights] = useState<string>("")
  const [isLoadingAI, setIsLoadingAI] = useState(false)
  const [showAIReorderSuggestion, setShowAIReorderSuggestion] = useState(false)
  const [aiReorderSuggestion, setAiReorderSuggestion] = useState<string>("")
  const [showBulkOrderModal, setShowBulkOrderModal] = useState(false)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [bulkOrderQuantities, setBulkOrderQuantities] = useState<{[key: string]: number}>({})
  const [isExporting, setIsExporting] = useState(false)

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

  // Filtered and searched stock items
  const filteredStockItems = useMemo(() => {
    let filtered = stockItems

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.id.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.supplier.toLowerCase().includes(query)
      )
    }

    // Apply status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter((item) => item.status === filterStatus)
    }

    return filtered
  }, [searchQuery, filterStatus])

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

  // Export functionality
  const handleExport = async (format: 'csv' | 'json' | 'pdf') => {
    setIsExporting(true)
    
    try {
      const dataToExport = filteredStockItems.map(item => ({
        SKU: item.id,
        Name: item.name,
        Category: item.category,
        'Current Stock': item.currentStock,
        'Min Stock': item.minStock,
        'Max Stock': item.maxStock,
        'Reorder Point': item.reorderPoint,
        Supplier: item.supplier,
        'Last Restock': item.lastRestock,
        'Daily Sales': item.avgDailySales,
        Status: item.status,
        'Cost Price': item.cost,
        'Sell Price': item.sellPrice,
        'Margin': item.margin,
        'Days Until Reorder': getDaysUntilReorder(item.currentStock, item.reorderPoint, item.avgDailySales)
      }))

      if (format === 'csv') {
        const csvContent = convertToCSV(dataToExport)
        downloadFile(csvContent, 'stock-inventory.csv', 'text/csv')
      } else if (format === 'json') {
        const jsonContent = JSON.stringify(dataToExport, null, 2)
        downloadFile(jsonContent, 'stock-inventory.json', 'application/json')
      } else if (format === 'pdf') {
        // For PDF, we'll create a simple HTML representation
        const htmlContent = createPDFContent(dataToExport)
        downloadFile(htmlContent, 'stock-inventory.html', 'text/html')
      }
      
      alert(`Stock data exported successfully as ${format.toUpperCase()}!`)
    } catch (error) {
      alert('Export failed. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  const convertToCSV = (data: any[]) => {
    if (data.length === 0) return ''
    
    const headers = Object.keys(data[0])
    const csvHeaders = headers.join(',')
    
    const csvRows = data.map(row => 
      headers.map(header => {
        const value = row[header]
        return typeof value === 'string' && value.includes(',') ? `"${value}"` : value
      }).join(',')
    )
    
    return [csvHeaders, ...csvRows].join('\n')
  }

  const createPDFContent = (data: any[]) => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Stock Inventory Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          .header { text-align: center; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Stock Inventory Report</h1>
          <p>Generated on ${new Date().toLocaleDateString()}</p>
        </div>
        <table>
          <thead>
            <tr>
              ${Object.keys(data[0] || {}).map(key => `<th>${key}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${data.map(row => `
              <tr>
                ${Object.values(row).map(value => `<td>${value}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
      </html>
    `
    return htmlContent
  }

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Bulk order functionality
  const handleBulkOrder = () => {
    // Auto-select items that need reordering (low or critical stock)
    const itemsNeedingReorder = stockItems
      .filter(item => item.status === 'low' || item.status === 'critical')
      .map(item => item.id)
    
    setSelectedItems(itemsNeedingReorder)
    
    // Set suggested quantities
    const suggestedQuantities: {[key: string]: number} = {}
    stockItems.forEach(item => {
      if (item.status === 'low' || item.status === 'critical') {
        // Suggest bringing stock to max level
        suggestedQuantities[item.id] = item.maxStock - item.currentStock
      }
    })
    setBulkOrderQuantities(suggestedQuantities)
    
    setShowBulkOrderModal(true)
  }

  const handleSelectItem = (itemId: string, checked: boolean) => {
    if (checked) {
      setSelectedItems(prev => [...prev, itemId])
      // Set default quantity if not already set
      if (!bulkOrderQuantities[itemId]) {
        const item = stockItems.find(i => i.id === itemId)
        if (item) {
          setBulkOrderQuantities(prev => ({
            ...prev,
            [itemId]: item.maxStock - item.currentStock
          }))
        }
      }
    } else {
      setSelectedItems(prev => prev.filter(id => id !== itemId))
    }
  }

  const handleQuantityChange = (itemId: string, quantity: number) => {
    setBulkOrderQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(0, quantity)
    }))
  }

  const calculateTotalCost = () => {
    return selectedItems.reduce((total, itemId) => {
      const item = stockItems.find(i => i.id === itemId)
      const quantity = bulkOrderQuantities[itemId] || 0
      if (item) {
        const costValue = parseFloat(item.cost.replace('$', ''))
        return total + (costValue * quantity)
      }
      return total
    }, 0)
  }

  const submitBulkOrder = async () => {
    if (selectedItems.length === 0) {
      alert('Please select at least one item to order.')
      return
    }

    setIsLoadingAI(true)
    
    try {
      const orderDetails = selectedItems.map(itemId => {
        const item = stockItems.find(i => i.id === itemId)
        const quantity = bulkOrderQuantities[itemId] || 0
        return {
          item: item?.name,
          sku: item?.id,
          supplier: item?.supplier,
          quantity,
          unitCost: item?.cost,
          totalCost: (parseFloat(item?.cost.replace('$', '') || '0') * quantity).toFixed(2)
        }
      })

      const prompt = `
        As a procurement AI assistant, create a professional bulk purchase order for the following items:
        
        Order Details: ${JSON.stringify(orderDetails, null, 2)}
        
        Total Order Value: $${calculateTotalCost().toFixed(2)}
        Order Date: ${new Date().toLocaleDateString()}
        
        Please generate:
        1. A professional purchase order summary
        2. Supplier breakdown (group by supplier)
        3. Delivery timeline recommendations
        4. Cost optimization suggestions
        5. Risk assessment for the order
        
        Format the response as a professional business document.
      `

      const response = await geminiApiRequest({ 
        prompt, 
        apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '' 
      })
      
      // Show success message and order details
      alert(`Bulk order processed successfully!\n\nTotal items: ${selectedItems.length}\nTotal cost: $${calculateTotalCost().toFixed(2)}\n\nOrder details have been generated and can be reviewed.`)
      
      // Reset and close modal
      setSelectedItems([])
      setBulkOrderQuantities({})
      setShowBulkOrderModal(false)
      
      // Show AI-generated order summary
      setAiInsights(response)
      setShowAIInsights(true)
      
    } catch (error) {
      alert('Failed to process bulk order. Please try again.')
    } finally {
      setIsLoadingAI(false)
    }
  }

  // AI Functions
  const generateAIInsights = async () => {
    setIsLoadingAI(true)
    setShowAIInsights(true)
    
    try {
      const stockData = stockItems.map(item => ({
        name: item.name,
        category: item.category,
        currentStock: item.currentStock,
        dailySales: item.avgDailySales,
        status: item.status,
        margin: item.margin,
        daysUntilReorder: getDaysUntilReorder(item.currentStock, item.reorderPoint, item.avgDailySales)
      }))

      const prompt = `
        As a retail inventory AI analyst, analyze this stock data and provide actionable insights:
        
        Stock Items: ${JSON.stringify(stockData, null, 2)}
        
        Please provide:
        1. Overall inventory health assessment
        2. Top 3 priority actions needed
        3. Revenue optimization opportunities
        4. Seasonal trends to consider
        5. Risk mitigation strategies
        
        Format your response in clear, actionable bullet points.
      `

      const response = await geminiApiRequest({ 
        prompt, 
        apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '' 
      })
      setAiInsights(response)
    } catch (error) {
      setAiInsights("Unable to generate insights at this time. Please try again later.")
    } finally {
      setIsLoadingAI(false)
    }
  }

  const generateAIReorderSuggestion = async (product: typeof stockItems[0]) => {
    setIsLoadingAI(true)
    setShowAIReorderSuggestion(true)
    
    try {
      const prompt = `
        As an inventory management AI, suggest optimal reorder quantities and timing for this product:
        
        Product: ${product.name}
        Category: ${product.category}
        Current Stock: ${product.currentStock}
        Daily Sales: ${product.avgDailySales}
        Min Stock: ${product.minStock}
        Max Stock: ${product.maxStock}
        Reorder Point: ${product.reorderPoint}
        Cost: ${product.cost}
        Sell Price: ${product.sellPrice}
        Supplier: ${product.supplier}
        Last Restock: ${product.lastRestock}
        
        Consider:
        - Seasonal factors for ${product.category}
        - Lead times from supplier
        - Storage costs
        - Cash flow optimization
        - Demand forecasting
        
        Provide specific recommendations for:
        1. Optimal reorder quantity
        2. Best timing for reorder
        3. Cost-benefit analysis
        4. Risk assessment
        5. Alternative strategies
      `

      const response = await geminiApiRequest({ 
        prompt, 
        apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '' 
      })
      setAiReorderSuggestion(response)
    } catch (error) {
      setAiReorderSuggestion("Unable to generate reorder suggestions at this time. Please try again later.")
    } finally {
      setIsLoadingAI(false)
    }
  }

  const handleSmartSearch = async () => {
    if (!searchQuery.trim()) return

    setIsLoadingAI(true)
    
    try {
      const prompt = `
        User is searching for: "${searchQuery}"
        
        Available inventory items: ${JSON.stringify(stockItems.map(item => ({
          id: item.id,
          name: item.name,
          category: item.category,
          supplier: item.supplier,
          status: item.status
        })), null, 2)}
        
        If this is a natural language query, help interpret what the user might be looking for and suggest:
        1. Matching products
        2. Related categories
        3. Potential alternatives
        4. Relevant actions they might want to take
        
        Provide a brief, helpful response.
      `

      const response = await geminiApiRequest({ 
        prompt, 
        apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '' 
      })
      alert(`AI Search Assistant: ${response}`)
    } catch (error) {
      console.error("Smart search failed:", error)
    } finally {
      setIsLoadingAI(false)
    }
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
          <Button 
            variant="outline" 
            className="bg-purple-50 border-purple-300 text-purple-700 hover:bg-purple-100"
            onClick={generateAIInsights}
            disabled={isLoadingAI}
          >
            <Brain className="w-4 h-4 mr-2" />
            {isLoadingAI ? "Analyzing..." : "AI Insights"}
          </Button>
          <Button variant="outline" className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter Stock
          </Button>
          <Button 
            variant="outline" 
            className="bg-orange-50 border-orange-300 text-orange-700 hover:bg-orange-100"
            onClick={handleBulkOrder}
          >
            <Truck className="w-4 h-4 mr-2" />
            Bulk Reorder
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* AI Insights Panel */}
      {showAIInsights && (
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                <CardTitle className="text-lg font-semibold text-purple-900">AI Inventory Insights</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAIInsights(false)}
                className="text-purple-600 hover:text-purple-800"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoadingAI ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                <span className="ml-3 text-purple-700">Analyzing inventory data...</span>
              </div>
            ) : (
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap text-purple-800 bg-white/50 p-4 rounded-lg">{aiInsights}</pre>
              </div>
            )}
          </CardContent>
        </Card>
      )}

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

      {/* Enhanced Search and Quick Actions */}
      <Card className="bg-white border-0 shadow-sm ring-1 ring-slate-200">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search products by name, SKU, category, or supplier... (Try: 'low stock dairy' or 'electronics under 20 units')"
                className="pl-10 h-11 border-slate-300 focus:border-blue-500 focus:ring-blue-500 bg-slate-50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.shiftKey) {
                    handleSmartSearch()
                  }
                }}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="bg-purple-50 border-purple-300 text-purple-700 hover:bg-purple-100 h-11"
                onClick={handleSmartSearch}
                disabled={!searchQuery.trim() || isLoadingAI}
              >
                <Brain className="w-4 h-4 mr-2" />
                {isLoadingAI ? "Searching..." : "Smart Search"}
              </Button>
              <Button variant="outline" className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50 h-11">
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filter
              </Button>
              <Button variant="outline" className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50 h-11">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Data
              </Button>
              <Select onValueChange={(value) => handleExport(value as 'csv' | 'json' | 'pdf')}>
                <SelectTrigger className="w-32 h-11 bg-white border-slate-300">
                  <div className="flex items-center">
                    <Download className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Export" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">Export CSV</SelectItem>
                  <SelectItem value="json">Export JSON</SelectItem>
                  <SelectItem value="pdf">Export HTML</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {searchQuery && (
            <div className="mt-3 text-sm text-slate-600">
              Showing {filteredStockItems.length} of {stockItems.length} products
              {searchQuery && (
                <span> for "{searchQuery}"</span>
              )}
              <span className="ml-2 text-purple-600 font-medium">
                💡 Tip: Press Shift+Enter for AI-powered search assistance
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stock Items Table */}
      <Card className="bg-white border-0 shadow-sm ring-1 ring-slate-200">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-slate-900">Current Stock Levels</CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                size="sm"
                className={filterStatus === "all" ? "" : "border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"}
                onClick={() => setFilterStatus("all")}
              >
                All Items ({stockItems.length})
              </Button>
              <Button
                variant={filterStatus === "low" ? "default" : "outline"}
                size="sm"
                className={filterStatus === "low" ? "" : "border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"}
                onClick={() => setFilterStatus("low")}
              >
                Low Stock ({stockItems.filter(item => item.status === "low").length})
              </Button>
              <Button
                variant={filterStatus === "critical" ? "default" : "outline"}
                size="sm"
                className={filterStatus === "critical" ? "" : "border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"}
                onClick={() => setFilterStatus("critical")}
              >
                Critical ({stockItems.filter(item => item.status === "critical").length})
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStockItems.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No products found</h3>
                <p className="text-slate-600 mb-4">
                  {searchQuery 
                    ? `No products match your search for "${searchQuery}"`
                    : "No products match the current filter"
                  }
                </p>
                {searchQuery && (
                  <Button 
                    variant="outline" 
                    onClick={() => setSearchQuery("")}
                    className="border-slate-300 text-slate-700 hover:bg-slate-50"
                  >
                    Clear search
                  </Button>
                )}
              </div>
            ) : (
              filteredStockItems.map((item, index) => (
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
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-purple-400 hover:text-purple-600"
                        onClick={(e) => {
                          e.stopPropagation()
                          generateAIReorderSuggestion(item)
                        }}
                      >
                        <Brain className="w-4 h-4" />
                      </Button>
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
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Bulk Order Modal */}
      {showBulkOrderModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-slate-900">Bulk Reorder Assistant</CardTitle>
                  <p className="text-sm text-slate-600">Select items and quantities for bulk ordering</p>
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={() => setShowBulkOrderModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </Button>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {stockItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-slate-900">{item.name}</h4>
                          <Badge className={`${getStatusColor(item.status)} border text-xs`}>
                            {item.status.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600">
                          Current: {item.currentStock} | Max: {item.maxStock} | Cost: {item.cost}
                        </p>
                      </div>
                    </div>
                    
                    {selectedItems.includes(item.id) && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-600">Qty:</span>
                        <Input
                          type="number"
                          min="0"
                          className="w-20 h-8"
                          value={bulkOrderQuantities[item.id] || 0}
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 0)}
                        />
                        <span className="text-sm text-slate-600">
                          = ${((parseFloat(item.cost.replace('$', '')) * (bulkOrderQuantities[item.id] || 0))).toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="border-t border-slate-200 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-slate-900">
                      Total Items: {selectedItems.length}
                    </span>
                    <span className="text-lg font-bold text-slate-900">
                      Total Cost: ${calculateTotalCost().toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      className="bg-orange-600 hover:bg-orange-700 text-white"
                      onClick={submitBulkOrder}
                      disabled={selectedItems.length === 0 || isLoadingAI}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {isLoadingAI ? "Processing..." : "Submit Bulk Order"}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-slate-300 text-slate-700 hover:bg-slate-50"
                      onClick={() => setShowBulkOrderModal(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* AI Reorder Suggestion Modal */}
      {showAIReorderSuggestion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="bg-white w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-slate-900">AI Reorder Assistant</CardTitle>
                  <p className="text-sm text-slate-600">Smart recommendations for optimal inventory management</p>
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={() => setShowAIReorderSuggestion(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </Button>
            </CardHeader>
            <CardContent className="p-6">
              {isLoadingAI ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                  <span className="ml-3 text-purple-700">Analyzing product data and generating recommendations...</span>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap text-slate-800 bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                      {aiReorderSuggestion}
                    </pre>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-slate-200">
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                      <Truck className="w-4 h-4 mr-2" />
                      Apply Recommendations
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-slate-300 text-slate-700 hover:bg-slate-50"
                      onClick={() => setShowAIReorderSuggestion(false)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

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
                <X className="w-5 h-5" />
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
                <Button 
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => generateAIReorderSuggestion(selectedProduct)}
                >
                  <Brain className="w-4 h-4 mr-2" />
                  AI Reorder Assistant
                </Button>
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
