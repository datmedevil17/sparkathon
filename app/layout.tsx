import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import type { Metadata } from "next"
import MouseMoveEffect from "@/components/mouse-move-effect"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Set Up Your Store - AI-Powered Retail Solutions",
  description:
    "Launch your retail business with Walmart's supply chain advantage. AI-powered inventory selection and store setup.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground antialiased bg-animated`}>
        <MouseMoveEffect />
        {children}
      </body>
    </html>
  )
}
