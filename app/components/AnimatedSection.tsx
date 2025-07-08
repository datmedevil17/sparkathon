"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Brain, TrendingUp, Truck, Store, ChevronRight, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"

const steps = [
  {
    id: 1,
    title: "Location Analysis",
    description:
      "AI analyzes your target location's demographics, foot traffic patterns, and market potential to identify optimal store placement opportunities.",
    icon: MapPin,
    stats: "98% accuracy rate",
  },
  {
    id: 2,
    title: "Market Intelligence",
    description:
      "Advanced algorithms process consumer behavior data, competitor analysis, and economic indicators to build comprehensive market insights.",
    icon: Brain,
    stats: "50+ data sources",
  },
  {
    id: 3,
    title: "Product Optimization",
    description:
      "Machine learning models recommend high-performing inventory based on local preferences, seasonal trends, and profit margins.",
    icon: TrendingUp,
    stats: "40% higher ROI",
  },
  {
    id: 4,
    title: "Supply Chain Integration",
    description:
      "Seamless connection to Walmart's distribution network ensures competitive wholesale pricing and reliable inventory management.",
    icon: Truck,
    stats: "30% cost savings",
  },
  {
    id: 5,
    title: "Store Launch",
    description:
      "Complete business setup with ongoing AI support, real-time analytics, and continuous optimization for sustained growth.",
    icon: Store,
    stats: "2-week setup",
  },
]

export default function AnimatedSection() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPlaying])

  return (
    <section className="py-24 md:py-32 bg-background border-t">
      <div className="container space-y-16">
        {/* Header */}
        <div className="mx-auto max-w-[58rem] text-center">
          <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl mb-4">
            AI-Powered Store Setup Process
          </h2>
          <p className="text-muted-foreground sm:text-lg leading-7">
            Our intelligent platform guides you through every step of launching your retail business with data-driven
            insights and automated processes.
          </p>
        </div>

        {/* Process Flow */}
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-12 left-0 right-0 h-px bg-border hidden md:block">
            <motion.div
              className="h-full bg-foreground origin-left"
              animate={{ scaleX: (currentStep + 1) / steps.length }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            {steps.map((step, index) => {
              const StepIcon = step.icon
              const isActive = index === currentStep
              const isCompleted = index < currentStep

              return (
                <motion.div
                  key={step.id}
                  className={`relative cursor-pointer group ${isActive ? "z-10" : ""}`}
                  onClick={() => {
                    setCurrentStep(index)
                    setIsPlaying(false)
                  }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Step Number */}
                  <div className="flex items-center justify-center mb-6">
                    <motion.div
                      className={`relative w-24 h-24 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-foreground border-foreground text-background shadow-lg"
                          : isCompleted
                            ? "bg-muted border-muted-foreground text-muted-foreground"
                            : "bg-background border-border text-muted-foreground group-hover:border-foreground/50"
                      }`}
                      animate={isActive ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                      transition={{ duration: 2, repeat: isActive ? Number.POSITIVE_INFINITY : 0 }}
                    >
                      <StepIcon className="w-8 h-8" />

                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-foreground"
                          animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        />
                      )}
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="text-center space-y-2">
                    <h3
                      className={`font-semibold text-lg transition-colors ${
                        isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <div
                      className={`text-sm font-medium transition-colors ${
                        isActive ? "text-foreground" : "text-muted-foreground/70"
                      }`}
                    >
                      {step.stats}
                    </div>
                  </div>

                  {/* Connection Arrow */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 -right-4 z-20">
                      <ChevronRight
                        className={`w-4 h-4 transition-colors ${
                          isCompleted ? "text-foreground" : "text-muted-foreground/30"
                        }`}
                      />
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Active Step Details */}
        <div className="mx-auto max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-muted/30 rounded-lg border p-8 md:p-12"
            >
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <span>
                    Step {currentStep + 1} of {steps.length}
                  </span>
                  <span>•</span>
                  <span>{steps[currentStep].stats}</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold">{steps[currentStep].title}</h3>

                <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">
                  {steps[currentStep].description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button
            onClick={() => setIsPlaying(!isPlaying)}
            variant="outline"
            size="lg"
            className="flex items-center space-x-2"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? "Pause Demo" : "Play Demo"}</span>
          </Button>

          {/* Progress Dots */}
          <div className="flex items-center space-x-2">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentStep(index)
                  setIsPlaying(false)
                }}
                className={`transition-all duration-300 ${
                  index === currentStep
                    ? "w-8 h-2 bg-foreground rounded-full"
                    : "w-2 h-2 bg-muted-foreground/30 rounded-full hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Ready to start your retail journey?</p>
          <Button size="lg">
            Begin Setup Process
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
