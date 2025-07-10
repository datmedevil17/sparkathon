"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MapPin, Brain, Package, TrendingUp, Store, Play, Pause, ChevronRight } from "lucide-react"

const steps = [
  {
    id: 1,
    title: "Location Analysis",
    description: "AI analyzes your target location's demographics, competition, and market potential",
    icon: MapPin,
    stat: "98% Accuracy",
    color: "bg-walmart-blue",
  },
  {
    id: 2,
    title: "Smart Inventory Selection",
    description: "Get personalized product recommendations based on local preferences and trends",
    icon: Brain,
    stat: "40% Higher ROI",
    color: "bg-walmart-everyday",
  },
  {
    id: 3,
    title: "Wholesale Ordering",
    description: "Access Walmart's supply chain with drag-and-drop ordering interface",
    icon: Package,
    stat: "30% Cost Savings",
    color: "bg-walmart-tango",
  },
  {
    id: 4,
    title: "Performance Tracking",
    description: "Monitor your supply chain and inventory performance in real-time",
    icon: TrendingUp,
    stat: "Real-time Updates",
    color: "bg-walmart-sushi",
  },
  {
    id: 5,
    title: "Store Launch",
    description: "Launch your fully optimized retail store with ongoing AI support",
    icon: Store,
    stat: "2 Week Setup",
    color: "bg-walmart-blue",
  },
]

export default function AnimatedSection() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentStep((current) => (current + 1) % steps.length)
          return 0
        }
        return prev + 2
      })
    }, 60)

    return () => clearInterval(interval)
  }, [isPlaying])

  const handleStepClick = (index: number) => {
    setCurrentStep(index)
    setProgress(0)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const currentStepData = steps[currentStep]
  const IconComponent = currentStepData.icon

  return (
    <section className="py-20 bg-gradient-to-b from-white to-walmart-selago/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-walmart-blue text-walmart-blue">
            How It Works
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-walmart-shaft mb-4">
            From Idea to Store in 5 Simple Steps
          </h2>
          <p className="text-xl text-walmart-tundora max-w-2xl mx-auto">
            Our AI-powered platform guides you through every step of setting up your retail business
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Step visualization */}
            <div className="relative">
              <Card className="p-8 bg-white/80 backdrop-blur-sm border border-walmart-sky/20 shadow-xl">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-lg ${currentStepData.color} flex items-center justify-center`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-walmart-shaft">{currentStepData.title}</h3>
                        <Badge variant="secondary" className="text-xs">
                          Step {currentStep + 1} of {steps.length}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={togglePlayPause}
                      className="border-walmart-blue text-walmart-blue hover:bg-walmart-squeeze bg-transparent"
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                  </div>

                  <p className="text-walmart-tundora mb-6 text-lg">{currentStepData.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-walmart-shaft">Progress</span>
                    <Badge className="bg-walmart-yellow text-walmart-shaft">{currentStepData.stat}</Badge>
                  </div>

                  <Progress value={progress} className="h-2 mb-6" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-walmart-tundora">{Math.round(progress)}% Complete</span>
                    <Button variant="ghost" size="sm" className="text-walmart-blue hover:bg-walmart-squeeze">
                      Learn More <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right side - Step indicators */}
            <div className="space-y-4">
              {steps.map((step, index) => {
                const StepIcon = step.icon
                const isActive = index === currentStep
                const isCompleted = index < currentStep

                return (
                  <div
                    key={step.id}
                    onClick={() => handleStepClick(index)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                      isActive
                        ? "bg-walmart-squeeze border-walmart-blue shadow-md"
                        : "bg-white/60 border-walmart-sky/20 hover:bg-white/80"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                          isActive || isCompleted ? `${step.color} text-white` : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <StepIcon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-medium ${isActive ? "text-walmart-blue" : "text-walmart-shaft"}`}>
                          {step.title}
                        </h4>
                        <p className="text-sm text-walmart-tundora">{step.description}</p>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={isActive ? "default" : "secondary"}
                          className={isActive ? "bg-walmart-yellow text-walmart-shaft" : ""}
                        >
                          {step.stat}
                        </Badge>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
