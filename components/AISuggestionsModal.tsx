"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Product } from "@/data/products"
import { Lightbulb, TrendingDown, Loader2, Sparkles, RefreshCw } from "lucide-react"

interface AISuggestionsModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product | null
}

// AI-powered suggestion generator based on product characteristics
const generateIntelligentSuggestions = (product: Product): string[] => {
  const suggestions: string[] = []
  
  // Category-specific suggestions
  const categoryStrategies: Record<string, string[]> = {
    "Dairy": [
      "Partner with local coffee shops to promote milk-based beverages",
      "Create bundle deals with cereal and baking products",
      "Implement temperature-controlled display optimization",
      "Launch 'Farm Fresh' marketing campaign highlighting quality"
    ],
    "Produce": [
      "Relocate to high-visibility entrance area for impulse purchases",
      "Create seasonal recipe cards featuring the product",
      "Implement dynamic pricing based on freshness levels",
      "Partner with health/wellness influencers for promotion"
    ],
    "Bakery": [
      "Introduce fresh-baked aroma systems near product display",
      "Create combo deals with spreads, jams, and sandwich ingredients",
      "Offer 'Buy 2, Get 1 Free' promotions before expiration",
      "Launch artisanal/premium line extensions"
    ],
    "Electronics": [
      "Create demonstration stations for hands-on experience",
      "Offer extended warranty packages to increase value perception",
      "Bundle with complementary accessories and cases",
      "Implement trade-in programs for older models"
    ],
    "Household": [
      "Create seasonal cleaning bundles with complementary products",
      "Offer subscription-based delivery for repeat purchases",
      "Partner with home organization influencers for content marketing",
      "Implement bulk purchase discounts for families"
    ],
    "Beverages": [
      "Create eye-level cooler placement for maximum visibility",
      "Launch limited-time flavor variations or seasonal editions",
      "Implement cross-merchandising with snack products",
      "Offer multi-pack discounts to increase volume sales"
    ],
    "Meat": [
      "Partner with recipe apps to suggest meal ideas",
      "Create pre-marinated or seasoned variants for convenience",
      "Implement family pack sizing with cost savings",
      "Launch 'Protein of the Month' featured promotions"
    ],
    "Pharmacy": [
      "Create health and wellness education displays",
      "Offer loyalty program with health tracking benefits",
      "Bundle with related health products (vitamins, supplements)",
      "Implement professional consultation services"
    ],
    "Frozen Foods": [
      "Optimize freezer placement at eye level in frozen section",
      "Create 'Quick Meal Solutions' themed displays",
      "Offer family meal bundle deals with sides and drinks",
      "Launch convenience-focused marketing for busy families"
    ]
  }

  // Stock level-based suggestions
  if (product.stock > 200) {
    suggestions.push("Implement volume discounts to move excess inventory faster")
    suggestions.push("Create bulk purchase incentives for businesses or large families")
  } else if (product.stock < 100) {
    suggestions.push("Optimize reorder levels to prevent stockouts during promotional periods")
    suggestions.push("Consider limited-time scarcity marketing to drive urgency")
  }

  // Revenue and margin-based suggestions
  const revenueNum = parseFloat(product.revenue.replace(/[$,]/g, ''))
  const marginNum = parseFloat(product.margin.replace('%', ''))

  if (marginNum < 20) {
    suggestions.push("Renegotiate supplier terms or explore alternative sourcing options")
    suggestions.push("Consider premium positioning with value-added features")
  } else if (marginNum > 30) {
    suggestions.push("Test strategic price reductions to boost volume while maintaining profitability")
  }

  if (revenueNum < 2000) {
    suggestions.push("Increase marketing spend with targeted digital campaigns")
    suggestions.push("Implement customer feedback collection to identify improvement areas")
  }

  // Sales velocity suggestions
  const salesVelocity = product.sold / 30 // Assuming monthly data
  if (salesVelocity < 10) {
    suggestions.push("Relocate product to high-traffic areas within the store")
    suggestions.push("Create educational content about product benefits and usage")
  }

  // Add category-specific suggestions
  const categorySuggestions = categoryStrategies[product.category] || [
    "Analyze competitor strategies and implement differentiation tactics",
    "Create customer loyalty programs with repeat purchase incentives",
    "Implement seasonal promotional calendars aligned with demand patterns",
    "Optimize product packaging and presentation for better shelf appeal"
  ]

  // Mix category suggestions with general suggestions
  suggestions.push(...categorySuggestions.slice(0, 2))

  // Add trending down specific suggestions
  suggestions.push("Conduct customer surveys to understand preference shifts")
  suggestions.push("Test new marketing channels and messaging strategies")

  // Return 5 most relevant suggestions
  return suggestions.slice(0, 5)
}

export default function AISuggestionsModal({ isOpen, onClose, product }: AISuggestionsModalProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const generateSuggestions = async () => {
    if (!product) return
    
    setLoading(true)
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const intelligentSuggestions = generateIntelligentSuggestions(product)
    setSuggestions(intelligentSuggestions)
    
    setLoading(false)
  }

  useEffect(() => {
    if (isOpen && product && suggestions.length === 0) {
      generateSuggestions()
    }
  }, [isOpen, product])

  const handleRegenerate = () => {
    setSuggestions([])
    generateSuggestions()
  }

  if (!product) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            AI-Powered Improvement Suggestions
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Product Overview */}
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-5 h-5 text-red-600" />
              <h3 className="font-semibold text-red-900">{product.name}</h3>
            </div>
            <div className="flex gap-2 mb-2">
              <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
                {product.category}
              </Badge>
              <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
                Trending Down
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
              <div>
                <span className="text-red-600 font-medium">Stock:</span> {product.stock} units
              </div>
              <div>
                <span className="text-red-600 font-medium">Sold:</span> {product.sold} units
              </div>
              <div>
                <span className="text-red-600 font-medium">Revenue:</span> {product.revenue}
              </div>
              <div>
                <span className="text-red-600 font-medium">Margin:</span> {product.margin}
              </div>
            </div>
            <p className="text-sm text-red-700 mt-2">
              AI analysis indicates declining performance. Strategic intervention recommended.
            </p>
          </div>

          {/* AI Analysis Insights */}
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">AI Analysis Complete</span>
            </div>
            <p className="text-xs text-blue-700">
              Analyzed category trends, inventory levels, pricing strategy, and customer behavior patterns
            </p>
          </div>

          {/* Suggestions Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-yellow-600" />
                Strategic Recommendations
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRegenerate}
                disabled={loading}
                className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
              >
                <RefreshCw className={`w-4 h-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
                Regenerate
              </Button>
            </div>
            
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                <span className="ml-2 text-slate-600">AI analyzing product data and market trends...</span>
              </div>
            ) : (
              <div className="space-y-3">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:border-blue-300 transition-colors group">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                        {index + 1}
                      </div>
                      <p className="text-sm text-blue-900 leading-relaxed font-medium">{suggestion}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Implementation Priority */}
          {!loading && suggestions.length > 0 && (
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-900">Implementation Priority</span>
              </div>
              <p className="text-xs text-green-700">
                Recommendations are ordered by potential impact. Start with items 1-2 for quick wins.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button 
              onClick={handleRegenerate} 
              disabled={loading}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 mr-2" />
              )}
              Generate New Suggestions
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}