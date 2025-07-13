"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Bot, User, ArrowRight, Store, BarChart3, Users, MapPin, TrendingUp, Package } from "lucide-react"
import ProductTypeSelector from "./ProductTypeSelector"
import LocationSelector from "./LocationSelector"
import AnimatedLoader from "./AnimatedLoader"

// Import types and config
import type { StoreSetupModalProps, ChatMessage, StoreData } from "@/types/store"
import { setupSteps } from "@/config/setupSteps"
import { productCategories } from "@/config/productCategories"

export default function StoreSetupModal({ open, onOpenChange }: StoreSetupModalProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [userInput, setUserInput] = useState("")
  const [selectedOption, setSelectedOption] = useState("")
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([])
  const [locationInput, setLocationInput] = useState("")
  const [storeData, setStoreData] = useState<StoreData>({
    storeName: "",
    productTypes: [],
    location: "",
    experience: "",
    goal: "",
    storeSize: "",
    layoutHelp: "",
    inventoryHelp: "",
    budget: "",
    supplyChain: ""
  })
  const [isComplete, setIsComplete] = useState(false)
  const [isInitializing, setIsInitializing] = useState(false)
  const [showLocationInsight, setShowLocationInsight] = useState(false)
  const [analysisPhase, setAnalysisPhase] = useState<'demographics' | 'preferences' | 'setup' | 'complete'>('demographics')

  useEffect(() => {
    if (open && chatMessages.length === 0) {
      setTimeout(() => {
        addBotMessage(setupSteps[0].botMessage)
      }, 500)
    }
  }, [open])

  const addBotMessage = (message: string) => {
    setIsTyping(true)
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        id: prev.length + 1,
        type: "bot",
        message,
        timestamp: new Date()
      }])
      setIsTyping(false)
    }, 1500)
  }

  const addUserMessage = (message: string) => {
    setChatMessages(prev => [...prev, {
      id: prev.length + 1,
      type: "user",
      message,
      timestamp: new Date()
    }])
  }

  const handleLocationChange = (address: string, placeDetails?: any) => {
    setLocationInput(address)
    if (placeDetails) {
      setStoreData(prev => ({ ...prev, locationDetails: placeDetails }))
    }
  }

  const handleNext = () => {
    const currentStepData = setupSteps[currentStep]
    let response = ""

    if (currentStepData.inputType === "continue") {
      // Just continue to next step
    } else if (currentStepData.inputType === "select") {
      if (!selectedOption) return
      response = selectedOption
    } else if (currentStepData.inputType === "multiselect") {
      if (selectedProductTypes.length === 0) return
      const categoryLabels = selectedProductTypes.map(typeId => 
        productCategories.find(cat => cat.id === typeId)?.label || typeId
      )
      response = categoryLabels.join(", ")
    } else if (currentStepData.inputType === "location") {
      if (!locationInput.trim()) return
      response = locationInput
    } else {
      if (!userInput.trim()) return
      response = userInput
    }

    // Add user message if there's a response
    if (response) {
      addUserMessage(response)
      
      // Update store data
      if (currentStepData.field) {
        const field = currentStepData.field as keyof StoreData
        if (field === "productTypes") {
          setStoreData(prev => ({ ...prev, [field]: selectedProductTypes }))
        } else if (field === "location") {
          setStoreData(prev => ({ ...prev, [field]: locationInput }))
        } else {
          setStoreData(prev => ({ ...prev, [field]: response }))
        }
      }
    }

    // Special handling for location step
    if (currentStep === 3 && response) {
      setTimeout(() => {
        addBotMessage("🔍 Let me pull up your regional insights (population, income, competitors)... done! 🎯")
        setShowLocationInsight(true)
      }, 1000)
      
      setTimeout(() => {
        if (currentStep < setupSteps.length - 1) {
          const nextStep = currentStep + 1
          setCurrentStep(nextStep)
          addBotMessage(setupSteps[nextStep].botMessage)
        }
      }, 3000)
    } else if (currentStep < setupSteps.length - 1) {
      // Move to next step
      setTimeout(() => {
        const nextStep = currentStep + 1
        setCurrentStep(nextStep)
        addBotMessage(setupSteps[nextStep].botMessage)
      }, 1000)
    } else {
      // All steps complete - show summary
      setTimeout(() => {
        const categoryLabels = storeData.productTypes.map(typeId => 
          productCategories.find(cat => cat.id === typeId)?.label || typeId
        )
        
        const summary = `🚀 You're all set!

Here's what I've set up:
• Store: "${storeData.storeName}"
• Location: ${storeData.location}
• Categories: ${categoryLabels.join(", ")}
• Size: ${storeData.storeSize}
• AI Inventory: ${storeData.inventoryHelp === "Yes, use AI recommendations" ? "Enabled" : "Disabled"}
• Supply Chain: ${storeData.supplyChain === "Yes" ? "Connected" : "Not Connected"}

🔧 You can fine-tune this anytime in your dashboard. Ready to build your store layout?`
        
        addBotMessage(summary)
        setIsComplete(true)
      }, 1000)
    }

    setUserInput("")
    setSelectedOption("")
    setSelectedProductTypes([])
    setLocationInput("")
  }

  const handleInitialize = () => {
    setIsInitializing(true)
    setAnalysisPhase('demographics')
    
    // Phase 1: Analyzing Demographics
    setTimeout(() => {
      addBotMessage("🔍 Analyzing location demographics and market potential...")
      setAnalysisPhase('preferences')
    }, 1000)

    // Phase 2: Setting up customer preferences
    setTimeout(() => {
      addBotMessage("👥 Setting up store layout based on customer preferences and foot traffic patterns...")
      setAnalysisPhase('setup')
    }, 3000)

    // Phase 3: Final setup
    setTimeout(() => {
      addBotMessage("🏪 Initializing your store systems and inventory management...")
      setAnalysisPhase('complete')
    }, 5000)

    // Phase 4: Complete and redirect
    setTimeout(() => {
      addBotMessage("✅ Store setup complete! Redirecting to your analytics dashboard...")
      setTimeout(() => {
        handleClose()
        router.push('/analytics')
      }, 2000)
    }, 7000)
  }

  const resetModal = () => {
    setCurrentStep(0)
    setChatMessages([])
    setUserInput("")
    setSelectedOption("")
    setSelectedProductTypes([])
    setLocationInput("")
    setStoreData({
      storeName: "",
      productTypes: [],
      location: "",
      experience: "",
      goal: "",
      storeSize: "",
      layoutHelp: "",
      inventoryHelp: "",
      budget: "",
      supplyChain: ""
    })
    setIsComplete(false)
    setIsInitializing(false)
    setShowLocationInsight(false)
  }

  const handleClose = () => {
    onOpenChange(false)
    setTimeout(resetModal, 300)
  }

  const currentStepData = setupSteps[currentStep]
  const progress = ((currentStep + 1) / setupSteps.length) * 100

  function getAnalysisIcon(): import("react").ReactNode {
    throw new Error("Function not implemented.")
  }

  function getAnalysisText(): import("react").ReactNode {
    throw new Error("Function not implemented.")
  }

  function getAnalysisProgress(): number {
    switch (analysisPhase) {
      case 'demographics': return 25;
      case 'preferences': return 50;
      case 'setup': return 75;
      case 'complete': return 100;
      default: return 0;
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl text-walmart-blue">AI Store Setup Assistant</DialogTitle>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-walmart-blue h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Step {currentStep + 1} of {setupSteps.length} - {currentStepData?.category}
          </p>
        </DialogHeader>
        
        <div className="flex flex-col h-[65vh]">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-lg">
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-[85%] ${
                    message.type === "user" ? "flex-row-reverse space-x-reverse" : ""
                  }`}
                >
                  <div
                    className={`p-2 rounded-full ${
                      message.type === "bot" 
                        ? "bg-walmart-blue text-white" 
                        : "bg-walmart-squeeze text-walmart-blue"
                    }`}
                  >
                    {message.type === "bot" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      message.type === "bot"
                        ? "bg-white border border-gray-200"
                        : "bg-walmart-blue text-white"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.message}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="p-2 rounded-full bg-walmart-blue text-white">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <AnimatedLoader variant="dots" text="" size="sm" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          {!isComplete && !isTyping && currentStep < setupSteps.length && (
            <div className="p-4 border-t space-y-4">
              <div>
                <Label htmlFor="userInput" className="text-sm font-medium flex items-center gap-2">
                  <span>{currentStepData.icon}</span>
                  Your Response:
                </Label>
                
                {currentStepData.inputType === "continue" ? (
                  <Button 
                    onClick={handleNext} 
                    className="w-full mt-2 bg-walmart-blue hover:bg-walmart-lochmara"
                  >
                    Let's Get Started!
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : currentStepData.inputType === "multiselect" ? (
                  <div className="mt-2">
                    <ProductTypeSelector
                      selectedTypes={selectedProductTypes}
                      onSelectionChange={setSelectedProductTypes}
                      onConfirm={handleNext}
                    />
                  </div>
                ) : currentStepData.inputType === "location" ? (
                  <div className="mt-2">
                    <LocationSelector
                      value={locationInput}
                      onChange={handleLocationChange}
                      onConfirm={handleNext}
                      placeholder={currentStepData.placeholder}
                    />
                  </div>
                ) : currentStepData.inputType === "select" ? (
                  <div className="mt-2 space-y-2">
                    {currentStepData.options?.map((option) => (
                      <Button
                        key={option}
                        variant={selectedOption === option ? "default" : "outline"}
                        className={`w-full text-left justify-start ${
                          selectedOption === option 
                            ? "bg-walmart-blue text-white" 
                            : "hover:bg-walmart-squeeze hover:text-walmart-blue"
                        }`}
                        onClick={() => setSelectedOption(option)}
                      >
                        {option}
                      </Button>
                    ))}
                    {selectedOption && (
                      <Button 
                        onClick={handleNext} 
                        className="w-full mt-2 bg-walmart-blue hover:bg-walmart-lochmara"
                      >
                        Next
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ) : currentStepData.inputType === "textarea" ? (
                  <>
                    <Textarea
                      id="userInput"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder={currentStepData.placeholder}
                      className="mt-1"
                      rows={3}
                    />
                    <Button 
                      onClick={handleNext} 
                      className="w-full bg-walmart-blue hover:bg-walmart-lochmara"
                      disabled={!userInput.trim()}
                    >
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Input
                      id="userInput"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder={currentStepData.placeholder}
                      className="mt-1"
                      onKeyPress={(e) => e.key === "Enter" && handleNext()}
                    />
                    <Button 
                      onClick={handleNext} 
                      className="w-full bg-walmart-blue hover:bg-walmart-lochmara"
                      disabled={!userInput.trim()}
                    >
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Enhanced Initialization Section */}
          {isComplete && !isInitializing && (
            <div className="p-4 border-t">
              <Button 
                onClick={handleInitialize}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Launch Store & View Analytics
              </Button>
            </div>
          )}

          {/* Enhanced Loading State with Analysis Phases */}
          {isInitializing && (
            <div className="p-6 border-t bg-gradient-to-br from-blue-50 to-purple-50">
              <div className="space-y-4">
                {/* Analysis Phase Header */}
                <div className="flex items-center justify-center space-x-3">
                  <div className="animate-pulse">
                    {getAnalysisIcon()}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {getAnalysisText()}
                  </h3>
                </div>

                {/* Enhanced Progress Bar */}
                <div className="space-y-2">
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ease-out"
                      style={{ width: `${getAnalysisProgress()}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 text-center">
                    {getAnalysisProgress()}% Complete
                  </p>
                </div>

                {/* Analysis Details */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className={`p-3 rounded-lg border-2 transition-all duration-500 ${
                    analysisPhase === 'demographics' ? 'border-blue-400 bg-blue-50' : 'border-gray-200 bg-white'
                  }`}>
                    <div className="flex items-center space-x-2">
                      <MapPin className={`h-4 w-4 ${analysisPhase === 'demographics' ? 'text-blue-600' : 'text-gray-400'}`} />
                      <span className="text-sm font-medium">Demographics</span>
                    </div>
                  </div>
                  
                  <div className={`p-3 rounded-lg border-2 transition-all duration-500 ${
                    analysisPhase === 'preferences' ? 'border-green-400 bg-green-50' : 'border-gray-200 bg-white'
                  }`}>
                    <div className="flex items-center space-x-2">
                      <Users className={`h-4 w-4 ${analysisPhase === 'preferences' ? 'text-green-600' : 'text-gray-400'}`} />
                      <span className="text-sm font-medium">Preferences</span>
                    </div>
                  </div>
                  
                  <div className={`p-3 rounded-lg border-2 transition-all duration-500 ${
                    analysisPhase === 'setup' ? 'border-orange-400 bg-orange-50' : 'border-gray-200 bg-white'
                  }`}>
                    <div className="flex items-center space-x-2">
                      <Package className={`h-4 w-4 ${analysisPhase === 'setup' ? 'text-orange-600' : 'text-gray-400'}`} />
                      <span className="text-sm font-medium">Store Setup</span>
                    </div>
                  </div>
                  
                  <div className={`p-3 rounded-lg border-2 transition-all duration-500 ${
                    analysisPhase === 'complete' ? 'border-purple-400 bg-purple-50' : 'border-gray-200 bg-white'
                  }`}>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className={`h-4 w-4 ${analysisPhase === 'complete' ? 'text-purple-600' : 'text-gray-400'}`} />
                      <span className="text-sm font-medium">Analytics</span>
                    </div>
                  </div>
                </div>

                {/* Animated Loader */}
                <div className="flex justify-center mt-4">
                  <AnimatedLoader 
                    variant="store" 
                    text="" 
                    size="lg" 
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}