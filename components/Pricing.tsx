"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, Star, Zap } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "$99",
    period: "/month",
    description: "Perfect for new entrepreneurs testing the market",
    features: [
      "Basic location analysis",
      "AI product recommendations",
      "Walmart supply chain access",
      "Email support",
      "Basic analytics dashboard",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "$299",
    period: "/month",
    description: "Ideal for serious retailers ready to scale",
    features: [
      "Advanced market intelligence",
      "Real-time inventory optimization",
      "Priority Walmart partnerships",
      "24/7 phone & chat support",
      "Advanced analytics & reporting",
      "Multi-location management",
      "Custom AI training",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$599",
    period: "/month",
    description: "For established businesses with multiple locations",
    features: [
      "Everything in Professional",
      "Dedicated account manager",
      "Custom integrations",
      "White-label solutions",
      "Advanced API access",
      "Custom reporting",
      "Priority feature requests",
    ],
    popular: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32 bg-white">
      <div className="container">
        <div className="mx-auto max-w-[58rem] text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 bg-walmart-squeeze text-walmart-blue rounded-full text-sm font-medium mb-4"
          >
            Pricing
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl mb-4 text-walmart-shaft"
          >
            Choose Your Success Plan
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-walmart-tundora sm:text-lg leading-7"
          >
            Start with any plan and upgrade as your business grows. All plans include Walmart supply chain access.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl border-2 p-8 ${
                plan.popular
                  ? "border-walmart-yellow shadow-xl scale-105"
                  : "border-walmart-squeeze hover:border-walmart-sky"
              } transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-walmart-yellow text-walmart-shaft px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Star className="h-4 w-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-walmart-shaft mb-2">{plan.name}</h3>
                <p className="text-walmart-tundora mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-walmart-blue">{plan.price}</span>
                  <span className="text-walmart-tundora ml-1">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-walmart-squeeze rounded-full flex items-center justify-center mt-0.5">
                      <Check className="h-3 w-3 text-walmart-blue" />
                    </div>
                    <span className="text-walmart-tundora">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-walmart-blue hover:bg-walmart-lochmara text-white"
                    : "bg-walmart-squeeze hover:bg-walmart-sky text-walmart-blue"
                }`}
                size="lg"
              >
                {plan.popular && <Zap className="mr-2 h-4 w-4" />}
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-walmart-tundora mb-4">
            Need a custom solution?{" "}
            <a href="#contact" className="text-walmart-blue hover:underline">
              Contact our sales team
            </a>
          </p>
          <p className="text-sm text-walmart-tundora">
            All plans include 14-day free trial • No setup fees • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  )
}
