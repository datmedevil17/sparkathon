"use client"

import { motion } from "framer-motion"
import { Brain, MapPin, TrendingUp, Truck, BarChart3, Shield } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analytics",
    description:
      "Advanced machine learning algorithms analyze market data, demographics, and consumer behavior to optimize your store's success.",
    color: "walmart-blue",
  },
  {
    icon: MapPin,
    title: "Location Intelligence",
    description:
      "Get detailed insights about foot traffic, competition, and market potential for any location you're considering.",
    color: "walmart-everyday",
  },
  {
    icon: TrendingUp,
    title: "Smart Inventory Selection",
    description:
      "AI recommends the best products for your area based on local preferences, seasonal trends, and profit margins.",
    color: "walmart-sushi",
  },
  {
    icon: Truck,
    title: "Walmart Supply Chain",
    description:
      "Access Walmart's distribution network for competitive wholesale pricing and reliable inventory management.",
    color: "walmart-tango",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description:
      "Monitor your store's performance with comprehensive dashboards and actionable insights for continuous growth.",
    color: "walmart-blue",
  },
  {
    icon: Shield,
    title: "Risk Assessment",
    description:
      "Minimize business risks with AI-powered market analysis and predictive modeling for informed decision-making.",
    color: "walmart-everyday",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 md:py-32 bg-gradient-to-b from-white to-walmart-selago/30">
      <div className="container">
        <div className="mx-auto max-w-[58rem] text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 bg-walmart-squeeze text-walmart-blue rounded-full text-sm font-medium mb-4"
          >
            Features
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl mb-4 text-walmart-shaft"
          >
            Everything You Need to Launch Your Store
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-walmart-tundora sm:text-lg leading-7"
          >
            Our comprehensive platform combines AI intelligence with Walmart's supply chain to give you every advantage
            in retail.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-walmart-squeeze hover:border-walmart-sky transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-walmart-squeeze rounded-lg mb-6 group-hover:bg-walmart-sky/30 transition-colors">
                  <Icon className="h-6 w-6 text-walmart-blue" />
                </div>
                <h3 className="text-xl font-semibold text-walmart-shaft mb-3">{feature.title}</h3>
                <p className="text-walmart-tundora leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Additional Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div>
            <div className="text-3xl font-bold text-walmart-blue mb-2">98%</div>
            <div className="text-sm text-walmart-tundora">Accuracy Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-walmart-blue mb-2">50+</div>
            <div className="text-sm text-walmart-tundora">Data Sources</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-walmart-blue mb-2">30%</div>
            <div className="text-sm text-walmart-tundora">Cost Savings</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-walmart-blue mb-2">24/7</div>
            <div className="text-sm text-walmart-tundora">AI Support</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
