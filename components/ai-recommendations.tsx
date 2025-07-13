"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/hooks/use-toast"
import {
  Zap,
  TrendingUp,
  Brain,
  Target,
  Lightbulb,
  Star,
  CheckCircle,
  Clock,
  Sparkles,
  BarChart3,
  Eye,
  RefreshCw,
} from "lucide-react"
import geminiApiRequest from "@/services/geminiApiRequest"

interface TrendingProduct {
  name: string
  category: string
  confidence: number
  reason: string
  potentialRevenue: string
  timeframe: string
  status: string
  priority: string
}

interface StockOptimization {
  product: string
  action: string
  currentStock: number
  recommendedStock: number
  reason: string
  priority: string
  impact: string
}

interface MarketInsight {
  title: string
  description: string
  impact: string
  actionable: string
  confidence: number
}

interface AIMetrics {
  successfulPredictions: number
  revenueGenerated: string
  recommendationsMade: number
  overallAccuracy: number
  lastUpdated: string
}

export default function AIRecommendationsPage() {
  const [trendingProducts, setTrendingProducts] = useState<TrendingProduct[]>([])
  const [stockOptimization, setStockOptimization] = useState<StockOptimization[]>([])
  const [marketInsights, setMarketInsights] = useState<MarketInsight[]>([])
  const [aiMetrics, setAiMetrics] = useState<AIMetrics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)

  // Initialize with sample data and load AI data
  useEffect(() => {
    loadInitialData()
    generateAIInsights()
  }, [])

  const loadInitialData = () => {
    // Sample data for immediate display
    setTrendingProducts([
      {
        name: "Organic Plant-Based Milk",
        category: "Dairy Alternatives",
        confidence: 92,
        reason: "35% increase in searches, seasonal health trends",
        potentialRevenue: "$15,000",
        timeframe: "Next 30 days",
        status: "new",
        priority: "high",
      },
      {
        name: "Smart Home Security Cameras",
        category: "Electronics",
        confidence: 88,
        reason: "Rising home security concerns, tech adoption",
        potentialRevenue: "$45,000",
        timeframe: "Next 45 days",
        status: "trending",
        priority: "high",
      },
    ])

    setStockOptimization([
      {
        product: "iPhone 15 Cases",
        action: "Increase Stock",
        currentStock: 45,
        recommendedStock: 120,
        reason: "New iPhone release driving accessory demand",
        priority: "high",
        impact: "High Revenue Impact",
      },
    ])

    setMarketInsights([
      {
        title: "Health & Wellness Surge",
        description: "30% increase in organic and health-focused product searches",
        impact: "High",
        actionable: "Stock more organic alternatives and health supplements",
        confidence: 94,
      },
    ])

    setAiMetrics({
      successfulPredictions: 87,
      revenueGenerated: "$2.1M",
      recommendationsMade: 156,
      overallAccuracy: 94,
      lastUpdated: new Date().toLocaleString(),
    })
  }

  const generateAIInsights = async () => {
    setIsLoading(true)
    try {
      const marketAnalysisPrompt = `
        As an AI market analyst for an e-commerce business, analyze current market trends and provide:
        
        1. 4 trending product opportunities with:
           - Product name and category
           - Confidence score (80-95%)
           - Specific reason for trend
           - Potential revenue estimate
           - Recommended timeframe
           - Status (new/trending/growing/hot)
           - Priority level (high/medium/low)
        
        2. 3 stock optimization recommendations with:
           - Product name
           - Action (Increase/Reduce/Prepare Stock)
           - Current and recommended stock levels
           - Detailed reasoning
           - Priority and business impact
        
        3. 3 market insights with:
           - Trend title
           - Description of market movement
           - Impact level and actionable advice
           - Confidence percentage
        
        Format as JSON with arrays: trendingProducts, stockOptimization, marketInsights.
        Focus on realistic, data-driven recommendations for July 2025.
      `

      const responseText = await geminiApiRequest({ 
        prompt: marketAnalysisPrompt, 
        apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '' 
      })
      
      if (responseText) {
        const aiAnalysis = JSON.parse(responseText)
        
        if (aiAnalysis.trendingProducts) {
          setTrendingProducts(aiAnalysis.trendingProducts)
        }
        
        if (aiAnalysis.stockOptimization) {
          setStockOptimization(aiAnalysis.stockOptimization)
        }
        
        if (aiAnalysis.marketInsights) {
          setMarketInsights(aiAnalysis.marketInsights)
        }

        toast({
          title: "AI Analysis Complete",
          description: "Generated new market insights and recommendations",
        })
      }
    } catch (error) {
      console.error("Error generating AI insights:", error)
      toast({
        title: "Analysis Failed",
        description: "Using cached recommendations. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const generateNewInsights = async () => {
    setIsGenerating(true)
    try {
      const refreshPrompt = `
        Generate fresh market analysis for e-commerce trends in July 2025:
        
        1. Identify 4 new emerging product opportunities
        2. Analyze inventory optimization needs
        3. Provide updated market intelligence
        
        Consider factors: seasonal trends, consumer behavior, economic indicators, 
        technology adoption, sustainability concerns, health consciousness.
        
        Format as JSON with detailed recommendations and high confidence scores.
      `

      const responseText = await geminiApiRequest({ 
        prompt: refreshPrompt, 
        apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '' 
      })
      
      if (responseText) {
        const newAnalysis = JSON.parse(responseText)
        
        if (newAnalysis.trendingProducts) {
          setTrendingProducts(newAnalysis.trendingProducts)
        }
        
        if (newAnalysis.stockOptimization) {
          setStockOptimization(newAnalysis.stockOptimization)
        }
        
        if (newAnalysis.marketInsights) {
          setMarketInsights(newAnalysis.marketInsights)
        }

        // Update metrics
        setAiMetrics(prev => prev ? {
          ...prev,
          recommendationsMade: prev.recommendationsMade + 1,
          lastUpdated: new Date().toLocaleString(),
        } : null)

        toast({
          title: "New Insights Generated",
          description: "Fresh AI recommendations are now available",
        })
      }
    } catch (error) {
      console.error("Error generating new insights:", error)
      toast({
        title: "Generation Failed",
        description: "Could not generate new insights. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const analyzeSpecificProduct = async (productName: string) => {
    try {
      const productAnalysisPrompt = `
        Provide detailed market analysis for "${productName}":
        
        1. Current market demand and trends
        2. Competitive landscape
        3. Pricing recommendations
        4. Target customer segments
        5. Marketing strategies
        6. Revenue potential and timeframe
        7. Risk factors and mitigation
        
        Provide actionable insights with confidence scores.
      `

      const responseText = await geminiApiRequest({ 
        prompt: productAnalysisPrompt, 
        apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '' 
      })
      
      if (responseText) {
        toast({
          title: `Analysis for ${productName}`,
          description: "Detailed product analysis generated successfully",
        })
        
        // You could display this in a modal or separate component
        console.log("Product Analysis:", responseText)
      }
    } catch (error) {
      console.error("Error analyzing product:", error)
      toast({
        title: "Analysis Failed",
        description: "Could not analyze the selected product",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "trending":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "growing":
        return "bg-amber-100 text-amber-700 border-amber-200"
      case "hot":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-slate-100 text-slate-700 border-slate-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200"
      case "medium":
        return "bg-amber-100 text-amber-700 border-amber-200"
      case "low":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      default:
        return "bg-slate-100 text-slate-700 border-slate-200"
    }
  }

  return (
    <div className="p-8 space-y-8 w-full mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            AI-Powered Insights
          </h1>
          <p className="text-slate-600 mt-1">
            Smart recommendations and market intelligence powered by advanced analytics
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            onClick={generateNewInsights}
            disabled={isGenerating}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-sm"
          >
            {isGenerating ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Brain className="w-4 h-4 mr-2" />
            )}
            {isGenerating ? "Generating..." : "Generate New Insights"}
          </Button>
          <Button variant="outline" className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50">
            <Eye className="w-4 h-4 mr-2" />
            View All Recommendations
          </Button>
        </div>
      </div>

      {/* AI Confidence Dashboard */}
      <Card className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-0 shadow-sm ring-1 ring-blue-200">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">AI Analysis Engine</h3>
                <p className="text-slate-600 mt-1">Real-time market intelligence and predictive analytics</p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-emerald-700">
                      {isLoading ? "Processing..." : "Live Processing"}
                    </span>
                  </div>
                  <div className="text-sm text-slate-500">
                    Last updated: {aiMetrics?.lastUpdated || "2 minutes ago"}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {aiMetrics?.overallAccuracy || 94}%
              </p>
              <p className="text-sm text-slate-600 mt-1">Prediction Accuracy</p>
              <div className="flex items-center gap-1 mt-2">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm text-slate-600">Gemini AI Model</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trending Product Opportunities */}
      <Card className="bg-white border-0 shadow-sm ring-1 ring-slate-200">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              Trending Product Opportunities
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              onClick={() => generateNewInsights()}
              disabled={isGenerating}
            >
              {isGenerating ? "Analyzing..." : "Refresh Analysis"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-6 border border-slate-200 rounded-xl">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <Skeleton className="h-20 w-full mb-4" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {trendingProducts.map((product, index) => (
                <div
                  key={index}
                  className="p-6 border border-slate-200 rounded-xl hover:shadow-md transition-all duration-200 bg-gradient-to-br from-white to-slate-50"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">{product.name}</h4>
                      <p className="text-sm text-slate-600 mt-1">{product.category}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge className={`${getStatusColor(product.status)} border`}>{product.status.toUpperCase()}</Badge>
                      <Badge className={`${getPriorityColor(product.priority)} border`}>
                        {product.priority.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">AI Confidence Score:</span>
                      <span className="font-bold text-slate-900">{product.confidence}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-green-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${product.confidence}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm mb-6">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">{product.reason}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-slate-600">Potential Revenue:</span>
                        <p className="font-bold text-emerald-600">{product.potentialRevenue}</p>
                      </div>
                      <div>
                        <span className="text-slate-600">Timeframe:</span>
                        <p className="font-bold text-slate-900">{product.timeframe}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => analyzeSpecificProduct(product.name)}
                    >
                      Add to Inventory Plan
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => analyzeSpecificProduct(product.name)}
                    >
                      Analyze
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stock Optimization Recommendations */}
      <Card className="bg-white border-0 shadow-sm ring-1 ring-slate-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-slate-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Smart Stock Optimization
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {stockOptimization.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-6 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-6">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        item.action === "Increase Stock"
                          ? "bg-emerald-100"
                          : item.action === "Reduce Stock"
                            ? "bg-red-100"
                            : "bg-blue-100"
                      }`}
                    >
                      {item.action === "Increase Stock" ? (
                        <TrendingUp className="w-6 h-6 text-emerald-600" />
                      ) : item.action === "Reduce Stock" ? (
                        <TrendingUp className="w-6 h-6 text-red-600 rotate-180" />
                      ) : (
                        <Clock className="w-6 h-6 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{item.product}</h4>
                      <p className="text-sm text-slate-600 mt-1">{item.reason}</p>
                      <Badge variant="outline" className="mt-2 text-xs text-slate-600 border-slate-300">
                        {item.impact}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={`${getPriorityColor(item.priority)} border`}>{item.priority.toUpperCase()}</Badge>
                    </div>
                    <p className="text-sm text-slate-600">
                      {item.currentStock} → {item.recommendedStock} units
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{item.action}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Market Insights */}
      <Card className="bg-white border-0 shadow-sm ring-1 ring-slate-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            Market Intelligence & Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-64 w-full" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {marketInsights.map((insight, index) => (
                <div key={index} className="p-6 border border-slate-200 rounded-xl hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="font-bold text-slate-900">{insight.title}</h4>
                    <Badge
                      className={`${insight.impact === "High" ? "bg-red-100 text-red-700 border-red-200" : "bg-amber-100 text-amber-700 border-amber-200"} border`}
                    >
                      {insight.impact} Impact
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">{insight.description}</p>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-slate-600">Confidence Level</span>
                      <span className="text-xs font-bold text-slate-900">{insight.confidence}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                        style={{ width: `${insight.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-blue-800">{insight.actionable}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Performance Metrics */}
      <Card className="bg-white border-0 shadow-sm ring-1 ring-slate-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-slate-900">AI Recommendation Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-emerald-50 rounded-xl">
              <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
              <p className="text-3xl font-bold text-slate-900">{aiMetrics?.successfulPredictions || 87}%</p>
              <p className="text-sm text-slate-600">Successful Predictions</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span className="text-xs text-emerald-600">+5% this month</span>
              </div>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <TrendingUp className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <p className="text-3xl font-bold text-slate-900">{aiMetrics?.revenueGenerated || "$2.1M"}</p>
              <p className="text-sm text-slate-600">Revenue Generated</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span className="text-xs text-emerald-600">+18% this quarter</span>
              </div>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <Target className="w-10 h-10 text-purple-600 mx-auto mb-3" />
              <p className="text-3xl font-bold text-slate-900">{aiMetrics?.recommendationsMade || 156}</p>
              <p className="text-sm text-slate-600">Recommendations Made</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <span className="text-xs text-slate-600">This month</span>
              </div>
            </div>
            <div className="text-center p-6 bg-yellow-50 rounded-xl">
              <Star className="w-10 h-10 text-yellow-600 mx-auto mb-3" />
              <p className="text-3xl font-bold text-slate-900">{aiMetrics?.overallAccuracy || 94}%</p>
              <p className="text-sm text-slate-600">Overall Accuracy</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span className="text-xs text-emerald-600">Industry leading</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
