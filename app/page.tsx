import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import AnimatedSection from "./components/AnimatedSection"
import Features from "./components/Features"
import Pricing from "./components/Pricing"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Background gradients */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-walmart-selago/30 to-white" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-walmart-sky/20 blur-[100px] animate-pulse" />
        <div
          className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-walmart-yellow/15 blur-[100px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] bg-walmart-everyday/10 blur-[120px] animate-pulse"
          style={{ animationDelay: "4s" }}
        />
        <div
          className="absolute top-1/4 right-1/4 h-[300px] w-[300px] bg-walmart-squeeze/40 blur-[80px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 h-[350px] w-[350px] bg-walmart-seagull/15 blur-[90px] animate-pulse"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <AnimatedSection />
        <Features />
        <Pricing />
        <Footer />
      </div>
    </div>
  )
}
