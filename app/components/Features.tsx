import { CheckCircle, Zap, Users, TrendingUp } from "lucide-react"

const features = [
  {
    icon: <CheckCircle className="h-8 w-8 text-primary" />,
    title: "AI-Powered Inventory Selection",
    description: "Get smart product recommendations based on local demographics and market preferences.",
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Walmart Supply Chain Access",
    description: "Leverage Walmart's extensive supply chain network for competitive wholesale pricing.",
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Interactive Drag & Drop Interface",
    description: "Easily book wholesale items with our intuitive drag and drop ordering system.",
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    title: "Real-Time Supply Chain Insights",
    description: "Get immersive understanding of live supply chain operations and order tracking.",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Set Up Your Store</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
