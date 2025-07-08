const testimonials = [
  {
    quote:
      "Set Up Your Store helped me launch my retail business in just 2 weeks. The AI recommendations were spot-on!",
    author: "Sarah Martinez",
    company: "Martinez Corner Store",
  },
  {
    quote: "The Walmart supply chain integration saved me 30% on wholesale costs. Game-changer for small retailers!",
    author: "Mike Chen",
    company: "Chen's Market",
  },
  {
    quote:
      "The demographic insights helped me stock exactly what my community wanted. Sales increased 60% in month one!",
    author: "Jessica Thompson",
    company: "Thompson's General Store",
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Success Stories from Store Owners</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <p className="text-lg mb-4">"{testimonial.quote}"</p>
              <p className="font-semibold">{testimonial.author}</p>
              <p className="text-sm text-gray-600">{testimonial.company}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
