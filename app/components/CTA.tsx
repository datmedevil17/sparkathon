import { Button } from "@/components/ui/button"

export default function CTA() {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Launch Your Retail Business?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join hundreds of entrepreneurs who've successfully launched their stores with our AI-powered platform and
          Walmart's supply chain.
        </p>
        <Button size="lg" variant="secondary">
          Start Your Free Trial
        </Button>
      </div>
    </section>
  )
}
