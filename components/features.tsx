import { Brain, Cloud, Shield, Zap } from "lucide-react"

const features = [
  {
    name: "AI-Powered Product Selection",
    description: "Smart recommendations based on local demographics, population preferences, and market trends.",
    icon: Brain,
  },
  {
    name: "Walmart Supply Chain Integration",
    description: "Access wholesale pricing and reliable supply chain network for competitive advantage.",
    icon: Cloud,
  },
  {
    name: "Interactive Drag & Drop Ordering",
    description: "Intuitive interface for booking wholesale items with real-time inventory management.",
    icon: Shield,
  },
  {
    name: "Real-Time Supply Chain Insights",
    description: "Immersive understanding of live operations, order tracking, and delivery optimization.",
    icon: Zap,
  },
]

export default function Features() {
  return (
    <section className="container space-y-16 py-24 md:py-32">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">AI-Powered Retail Solutions</h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          Everything you need to launch and scale your retail business with intelligent automation and supply chain
          advantages.
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
        {features.map((feature) => (
          <div key={feature.name} className="relative overflow-hidden rounded-lg border bg-background p-8">
            <div className="flex items-center gap-4">
              <feature.icon className="h-8 w-8" />
              <h3 className="font-bold">{feature.name}</h3>
            </div>
            <p className="mt-2 text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
