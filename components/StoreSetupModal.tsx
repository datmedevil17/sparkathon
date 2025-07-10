"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Bot, User,  ArrowRight, Store } from "lucide-react"
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
    setTimeout(() => {
      addBotMessage("🎉 Congratulations! Your store has been successfully initialized. You're ready to start selling!")
      setIsInitializing(false)
      // Route to inventory page
      handleClose()
      router.push('/inventory')
    }, 3000)
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

          {/* Initialization Button */}
          {isComplete && !isInitializing && (
            <div className="p-4 border-t">
              <Button 
                onClick={handleInitialize}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                <Store className="mr-2 h-4 w-4" />
                Launch Store Builder
              </Button>
            </div>
          )}

          {/* Loading State */}
          {isInitializing && (
            <div className="p-4 border-t flex justify-center">
              <AnimatedLoader 
                variant="store" 
                text="Setting up your store..." 
                size="lg" 
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}