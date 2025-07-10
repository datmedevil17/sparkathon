"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MapPin, Search } from "lucide-react"

interface LocationSelectorProps {
  value: string
  onChange: (address: string, placeDetails?: any) => void
  onConfirm: () => void
  placeholder?: string
}

export default function LocationSelector({ 
  value, 
  onChange, 
  onConfirm, 
  placeholder = "Search for your store location..." 
}: LocationSelectorProps) {
  const [selectedPlace, setSelectedPlace] = useState<any>(null)

  // Demo location data for Prayagraj
  const demoLocation = {
    name: "Prayagraj",
    formatted_address: "Prayagraj, Uttar Pradesh, India",
    place_id: "ChIJN_qOi4XKnzkRKNFj9H8X8aY",
    geometry: {
      location: {
        lat: () => 25.4484,
        lng: () => 81.8397
      }
    },
    address_components: [
      { long_name: "Prayagraj", short_name: "Prayagraj", types: ["locality", "political"] },
      { long_name: "Uttar Pradesh", short_name: "UP", types: ["administrative_area_level_1", "political"] },
      { long_name: "India", short_name: "IN", types: ["country", "political"] }
    ]
  }

  // Auto-select Prayagraj on component mount
  useEffect(() => {
    if (!value) {
      setSelectedPlace(demoLocation)
      onChange(demoLocation.formatted_address, demoLocation)
    }
  }, [])

  const handleManualInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
    if (e.target.value !== demoLocation.formatted_address) {
      setSelectedPlace(null)
    }
  }

  const handleDemoLocationSelect = () => {
    setSelectedPlace(demoLocation)
    onChange(demoLocation.formatted_address, demoLocation)
  }

  return (
    <div className="space-y-3">
      {/* Demo Notice */}
      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-700 text-sm font-medium">Demo Mode</p>
        <p className="text-blue-600 text-xs">Using Prayagraj as the demo location</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          value={value || demoLocation.formatted_address}
          onChange={handleManualInput}
          placeholder={placeholder}
          className="pl-10 pr-4"
        />
      </div>

      {/* Demo location suggestion */}
      {!selectedPlace && (
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
          <button 
            onClick={handleDemoLocationSelect}
            className="w-full text-left hover:bg-gray-100 p-2 rounded"
          >
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-sm text-gray-700">{demoLocation.name}</p>
                <p className="text-xs text-gray-500">{demoLocation.formatted_address}</p>
              </div>
            </div>
          </button>
        </div>
      )}

      {selectedPlace && (
        <div className="p-3 bg-walmart-squeeze/20 rounded-lg border border-walmart-blue/20">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-walmart-blue mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-medium text-sm">{selectedPlace.name}</p>
              <p className="text-xs text-gray-600">{selectedPlace.formatted_address}</p>
            </div>
          </div>
        </div>
      )}

      {(value || selectedPlace) && (
        <Button 
          onClick={onConfirm}
          className="w-full bg-walmart-blue hover:bg-walmart-lochmara"
          disabled={!value?.trim()}
        >
          Confirm Location & Continue
        </Button>
      )}
    </div>
  )
}