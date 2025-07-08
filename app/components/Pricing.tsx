import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Starter",
    price: "$49",
    features: ["Basic AI recommendations", "Walmart supply chain access", "Up to 500 SKUs", "Email support"],
  },
  {
    name: "Professional",
    price: "$149",
    features: [
      "Advanced AI analytics",
      "Unlimited SKUs",
      "Real-time inventory tracking",
      "Priority support",
      "Demographic insights",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "Custom AI models",
      "Multi-location management",
      "Dedicated account manager",
      "24/7 phone support",
      "Advanced supply chain analytics",
    ],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6">
                {plan.price}
                <span className="text-lg font-normal text-gray-600">/month</span>
              </p>
              <ul className="mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center mb-2">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full" variant={index === 1 ? "default" : "outline"}>
                {index === 2 ? "Contact Sales" : "Get Started"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
