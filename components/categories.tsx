"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import {
  ShoppingCart,
  Package,
  TrendingUp,
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  BarChart3,
  Download, // Add this import
} from "lucide-react"
import { categories, subcategoryDetails } from "@/data/categories"
import geminiApiRequest from "@/services/geminiApiRequest"

interface CategoriesPageProps {
  onViewDetailedAnalytics?: () => void
}

export default function CategoriesPage({ onViewDetailedAnalytics }: CategoriesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[0] | null>(null)
  const [showAIChat, setShowAIChat] = useState(false)
  const [isGeneratingReport, setIsGeneratingReport] = useState(false) // Add this state
  const router = useRouter()

  const handleViewDetailedAnalytics = () => {
    if (onViewDetailedAnalytics) {
      onViewDetailedAnalytics()
    } else {
      router.push("/analytics/detailed-analytics")
    }
  }

  // Add this function for generating PDF reports
  const generateAnalyticsReport = async () => {
    setIsGeneratingReport(true)
    
    try {
      // Prepare data for Gemini API
      const categoryData = categories.map(cat => ({
        name: cat.name,
        totalProducts: cat.totalProducts,
        totalValue: cat.totalValue,
        monthlyGrowth: cat.monthlyGrowth,
        performance: cat.performance,
        topSubcategories: cat.topSubcategories
      }))

      const prompt = `
        Generate a comprehensive analytics report based on the following category data:
        ${JSON.stringify(categoryData, null, 2)}

        Please create a detailed report that includes:
        1. Executive Summary
        2. Category Performance Analysis
        3. Growth Trends and Insights
        4. Top Performing Categories
        5. Areas for Improvement
        6. Strategic Recommendations
        7. Future Outlook

        Format the response as a structured report with clear sections and professional language suitable for business stakeholders.
      `

      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
      if (!apiKey) throw new Error('API key is not configured')
      const response = await geminiApiRequest({ prompt, apiKey })
      
      // Generate PDF from the AI response
      await downloadReportAsPDF(response)
      
    } catch (error) {
      console.error('Error generating report:', error)
      alert('Failed to generate report. Please try again.')
    } finally {
      setIsGeneratingReport(false)
    }
  }

  // Function to convert AI response to PDF
const downloadReportAsPDF = async (reportContent: string, fileNamePrefix = 'analytics-report') => {
 
};

  // Add this function after generateAnalyticsReport
  const generateCategoryReport = async (category: typeof categories[0]) => {
    setIsGeneratingReport(true)
    
    try {
      const subcategories = category.id === 'grocery' ? subcategoryDetails.grocery : []
      
      const prompt = `
        Generate a detailed analytics report for the "${category.name}" category with the following data:
        
        Category Overview:
        - Total Products: ${category.totalProducts}
        - Total Value: ${category.totalValue}
        - Monthly Growth: ${category.monthlyGrowth}
        - Performance Level: ${category.performance}
        - Top Subcategories: ${category.topSubcategories.join(', ')}
        
        ${subcategories.length > 0 ? `
        Subcategory Details:
        ${subcategories.map(sub => `
        - ${sub.name}: ${sub.products} products, ${sub.value} value, ${sub.trend} trend, ${sub.margin} margin
        `).join('')}
        ` : ''}
        
        Please provide:
        1. Category Performance Summary
        2. Strengths and Opportunities
        3. Subcategory Analysis (if available)
        4. Growth Predictions
        5. Strategic Recommendations
        6. Action Items
        
        Format as a professional business report.
      `

      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
      if (!apiKey) throw new Error('API key is not configured')
      const response = await geminiApiRequest({ prompt, apiKey })
      await downloadReportAsPDF(response, `${category.name.toLowerCase().replace(/\s+/g, '-')}-report`)
      
    } catch (error) {
      console.error('Error generating category report:', error)
      alert('Failed to generate category report. Please try again.')
    } finally {
      setIsGeneratingReport(false)
    }
  }

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Product Categories</h1>
          <p className="text-slate-600 mt-1">Manage and analyze product categories and subcategories performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter Categories
          </Button>
          <Button variant="outline" className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </Button>
          <Button 
            onClick={generateAnalyticsReport}
            disabled={isGeneratingReport}
            variant="outline" 
            className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            {isGeneratingReport ? (
      <>
        <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600" />
        Generating...
      </>
    ) : (
      <>
        <Download className="w-4 h-4 mr-2" />
        Download Report
      </>
    )}
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        </div>
      </div>

      {/* Search and Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3 bg-white border-0 shadow-sm ring-1 ring-slate-200">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search categories and subcategories..."
                className="pl-10 h-11 border-slate-300 focus:border-blue-500 focus:ring-blue-500 bg-slate-50"
              />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-sm ring-1 ring-slate-200">
          <CardContent className="p-6 text-center">
            <p className="text-2xl font-bold text-slate-900">{categories.length}</p>
            <p className="text-sm text-slate-600">Active Categories</p>
          </CardContent>
        </Card>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Card
            key={category.id}
            className="bg-white border-0 shadow-sm hover:shadow-xl ring-1 ring-slate-200/50 hover:ring-slate-300/50 transition-all duration-300 cursor-pointer group overflow-hidden relative"
            onClick={() => setSelectedCategory(category)}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            <CardHeader className="pb-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${category.iconColor} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-7 h-7" />
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={`${category.color} border-0 shadow-sm font-medium px-3 py-1`}>
                    {category.monthlyGrowth}
                  </Badge>
                  {category.aiInsight && (
                    <div className="relative group">
                      <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center cursor-help">
                        <span className="text-white text-xs font-bold">AI</span>
                      </div>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20">
                        {category.aiInsight}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
                      </div>
                    </div>
                  )}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-slate-100 rounded-xl"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-slate-900 mt-4 group-hover:text-slate-800 transition-colors">
                {category.name}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6 relative z-10">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Products</p>
                  <p className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {category.totalProducts.toLocaleString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Total Value</p>
                  <p className="text-2xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {category.totalValue}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Top Subcategories</p>
                <div className="space-y-3">
                  {category.topSubcategories.slice(0, 3).map((sub, index) => (
                    <div key={index} className="flex items-center justify-between group/sub py-1">
                      <span className="text-sm font-medium text-slate-700 group-hover/sub:text-slate-900 transition-colors">
                        {sub}
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-12 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                            style={{ width: `${70 + index * 10}%` }}
                          />
                        </div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full shadow-sm"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">30-Day Forecast</p>
                <div className="flex items-end space-x-1 h-8">
                  {category.forecastData?.map((value, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-sm opacity-70"
                      style={{ 
                        width: '4px', 
                        height: `${(value / Math.max(...category.forecastData)) * 100}%`,
                        minHeight: '2px'
                      }}
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-600">
                  Predicted growth: <span className="font-semibold text-emerald-600">+{category.predictedGrowth}</span>
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50/80 p-2 rounded-xl font-medium transition-all duration-200"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-600 hover:text-slate-700 hover:bg-slate-50 p-2 rounded-xl font-medium transition-all duration-200"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Manage
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Category Performance Overview */}
      <Card className="bg-gradient-to-br from-white to-slate-50/50 border-0 shadow-lg ring-1 ring-slate-200/50 overflow-hidden">
        <CardHeader className="pb-6 relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
          <CardTitle className="text-2xl font-bold text-slate-900 relative z-10">
            Category Performance Overview
          </CardTitle>
          <p className="text-slate-600 relative z-10">
            Comprehensive analytics across all product categories
          </p>
        </CardHeader>
        <CardContent className="relative">
          <div className="h-80 flex items-center justify-center bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200/50 shadow-inner">
            <div className="text-center space-y-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xl font-bold text-slate-900">
                  Category Performance Analytics
                </p>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Interactive visualization showing sales trends, growth rates, and performance metrics by category
                </p>
              </div>
              <Button 
                onClick={handleViewDetailedAnalytics} 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 rounded-xl font-medium"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                View Detailed Analytics
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Detail Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-200">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedCategory.iconColor}`}>
                  <selectedCategory.icon className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-slate-900">{selectedCategory.name}</CardTitle>
                  <p className="text-slate-600">Category Performance & Management</p>
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={() => setSelectedCategory(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </Button>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-blue-50 rounded-xl">
                  <Package className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-slate-900">{selectedCategory.totalProducts.toLocaleString()}</p>
                  <p className="text-sm text-slate-600">Total Products</p>
                </div>
                <div className="text-center p-6 bg-emerald-50 rounded-xl">
                  <TrendingUp className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-slate-900">{selectedCategory.totalValue}</p>
                  <p className="text-sm text-slate-600">Total Value</p>
                </div>
                <div className="text-center p-6 bg-amber-50 rounded-xl">
                  <ShoppingCart className="w-10 h-10 text-amber-600 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-slate-900">{selectedCategory.monthlyGrowth}</p>
                  <p className="text-sm text-slate-600">Monthly Growth</p>
                </div>
              </div>

              {selectedCategory.id === "grocery" && subcategoryDetails.grocery && (
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">Subcategory Performance</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {subcategoryDetails.grocery.map((sub, index) => (
                      <div
                        key={index}
                        className="p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-semibold text-slate-900">{sub.name}</h4>
                          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">{sub.trend}</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-sm">
                          <div>
                            <span className="text-slate-600">Products</span>
                            <p className="font-semibold text-slate-900">{sub.products}</p>
                          </div>
                          <div>
                            <span className="text-slate-600">Value</span>
                            <p className="font-semibold text-slate-900">{sub.value}</p>
                          </div>
                          <div>
                            <span className="text-slate-600">Margin</span>
                            <p className="font-semibold text-emerald-600">{sub.margin}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-6 border-t border-slate-200">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Eye className="w-4 h-4 mr-2" />
                  View All Products
                </Button>
                <Button 
                  onClick={() => generateCategoryReport(selectedCategory)}
                  variant="outline" 
                  className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
                <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics Report
                </Button>
                <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent">
                  <Edit className="w-4 h-4 mr-2" />
                  Manage Category
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* AI Chat Interface */}
      {showAIChat && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 flex flex-col">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">AI</span>
              </div>
              <span className="font-semibold text-slate-900">Analytics Assistant</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowAIChat(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              ✕
            </Button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-3">
              <div className="bg-slate-100 rounded-lg p-3 text-sm">
                <p className="text-slate-700">Ask me anything about your categories:</p>
                <ul className="mt-2 text-xs text-slate-600 space-y-1">
                  <li>• "Which category has the highest growth?"</li>
                  <li>• "Show me underperforming subcategories"</li>
                  <li>• "Predict next month's trends"</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-slate-200">
            <div className="flex space-x-2">
              <Input
                placeholder="Ask about your categories..."
                className="flex-1 text-sm border-slate-300 focus:border-blue-500"
              />
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Floating AI Chat Button */}
      <Button
        onClick={() => setShowAIChat(!showAIChat)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-2xl z-40 flex items-center justify-center"
      >
        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
          <span className="text-purple-600 text-sm font-bold">AI</span>
        </div>
      </Button>
    </div>
  )
}
