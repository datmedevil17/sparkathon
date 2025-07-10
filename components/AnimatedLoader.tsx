"use client"

import { Loader2 } from "lucide-react"

interface AnimatedLoaderProps {
  text?: string
  size?: "sm" | "md" | "lg"
  variant?: "default" | "dots" | "pulse" | "store"
}

export default function AnimatedLoader({ 
  text = "Loading...", 
  size = "md", 
  variant = "default" 
}: AnimatedLoaderProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  }

  if (variant === "dots") {
    return (
      <div className="flex items-center gap-2">
        <div className="flex space-x-1">
          <div className={`${size === "sm" ? "w-2 h-2" : size === "lg" ? "w-3 h-3" : "w-2.5 h-2.5"} bg-walmart-blue rounded-full animate-bounce`}></div>
          <div className={`${size === "sm" ? "w-2 h-2" : size === "lg" ? "w-3 h-3" : "w-2.5 h-2.5"} bg-walmart-blue rounded-full animate-bounce`} style={{ animationDelay: "0.1s" }}></div>
          <div className={`${size === "sm" ? "w-2 h-2" : size === "lg" ? "w-3 h-3" : "w-2.5 h-2.5"} bg-walmart-blue rounded-full animate-bounce`} style={{ animationDelay: "0.2s" }}></div>
        </div>
        {text && <span className="text-sm text-gray-600">{text}</span>}
      </div>
    )
  }

  if (variant === "pulse") {
    return (
      <div className="flex items-center gap-2">
        <div className={`${sizeClasses[size]} bg-walmart-blue rounded-full animate-pulse`}></div>
        {text && <span className="text-sm text-gray-600 animate-pulse">{text}</span>}
      </div>
    )
  }

  if (variant === "store") {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-walmart-squeeze rounded-full animate-spin border-t-walmart-blue"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg">🏪</span>
          </div>
        </div>
        {text && <span className="text-sm text-gray-600 font-medium">{text}</span>}
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-walmart-blue`} />
      {text && <span className="text-sm text-gray-600">{text}</span>}
    </div>
  )
}