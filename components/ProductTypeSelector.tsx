"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"

interface ProductTypeSelectorProps {
  selectedTypes: string[]
  onSelectionChange: (types: string[]) => void
  onConfirm: () => void
}

const productCategories = [
  { id: "general", label: "General merchandise", emoji: "🏪", color: "bg-blue-100 text-blue-800" },
  { id: "electronics", label: "Electronics", emoji: "📱", color: "bg-purple-100 text-purple-800" },
  { id: "fashion", label: "Fashion", emoji: "👕", color: "bg-pink-100 text-pink-800" },
  { id: "groceries", label: "Groceries", emoji: "🥬", color: "bg-green-100 text-green-800" },
  { id: "home", label: "Home & Living", emoji: "🏠", color: "bg-orange-100 text-orange-800" },
  { id: "beauty", label: "Beauty & Personal Care", emoji: "💄", color: "bg-rose-100 text-rose-800" },
  { id: "sports", label: "Sports & Outdoors", emoji: "⚽", color: "bg-emerald-100 text-emerald-800" },
  { id: "books", label: "Books & Media", emoji: "📚", color: "bg-amber-100 text-amber-800" },
  { id: "toys", label: "Toys & Games", emoji: "🧸", color: "bg-indigo-100 text-indigo-800" },
  { id: "automotive", label: "Automotive", emoji: "🚗", color: "bg-gray-100 text-gray-800" },
  { id: "health", label: "Health & Wellness", emoji: "🏥", color: "bg-red-100 text-red-800" },
  { id: "custom", label: "Custom/Other", emoji: "⚙️", color: "bg-slate-100 text-slate-800" }
]

export default function ProductTypeSelector({ selectedTypes, onSelectionChange, onConfirm }: ProductTypeSelectorProps) {
  const toggleSelection = (categoryId: string) => {
    if (selectedTypes.includes(categoryId)) {
      onSelectionChange(selectedTypes.filter(type => type !== categoryId))
    } else {
      onSelectionChange([...selectedTypes, categoryId])
    }
  }

  const removeSelection = (categoryId: string) => {
    onSelectionChange(selectedTypes.filter(type => type !== categoryId))
  }

  return (
    <div className="space-y-4">
      {/* Selected Types Display */}
      {selectedTypes.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Selected Categories:</p>
          <div className="flex flex-wrap gap-2">
            {selectedTypes.map(typeId => {
              const category = productCategories.find(cat => cat.id === typeId)
              return category ? (
                <Badge
                  key={typeId}
                  className={`${category.color} flex items-center gap-1 px-3 py-1`}
                >
                  <span>{category.emoji}</span>
                  <span>{category.label}</span>
                  <button
                    onClick={() => removeSelection(typeId)}
                    className="ml-1 hover:bg-black/10 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ) : null
            })}
          </div>
        </div>
      )}

      {/* Category Selection Grid */}
      <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
        {productCategories.map((category) => {
          const isSelected = selectedTypes.includes(category.id)
          return (
            <Button
              key={category.id}
              variant="outline"
              className={`flex items-center gap-2 p-3 h-auto text-left justify-start transition-all ${
                isSelected 
                  ? "border-walmart-blue bg-walmart-blue/10 text-walmart-blue" 
                  : "hover:border-walmart-blue/50 hover:bg-walmart-squeeze/30"
              }`}
              onClick={() => toggleSelection(category.id)}
            >
              <span className="text-lg">{category.emoji}</span>
              <span className="text-sm font-medium flex-1">{category.label}</span>
              {isSelected && <Check className="h-4 w-4 text-walmart-blue" />}
            </Button>
          )
        })}
      </div>

      {/* Confirm Button */}
      {selectedTypes.length > 0 && (
        <Button 
          onClick={onConfirm}
          className="w-full bg-walmart-blue hover:bg-walmart-lochmara"
        >
          Confirm Selection ({selectedTypes.length} selected)
        </Button>
      )}
    </div>
  )
}