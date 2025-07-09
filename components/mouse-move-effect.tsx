"use client"

import { useEffect, useState } from "react"

export default function MouseMoveEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-all duration-700 ease-out"
      style={{
        background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(169, 221, 247, 0.06), rgba(255, 194, 32, 0.03), transparent 60%)`,
      }}
    />
  )
}
