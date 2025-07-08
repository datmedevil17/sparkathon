import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">Set Up Your Store</span>
        </Link>
        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link href="/ai-features" className="transition-colors hover:text-primary">
            AI Features
          </Link>
          <Link href="/supply-chain" className="transition-colors hover:text-primary">
            Supply Chain
          </Link>
          <Link href="/success-stories" className="transition-colors hover:text-primary">
            Success Stories
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            Login
          </Button>
          <Button size="sm">Start Your Store</Button>
        </div>
      </div>
    </header>
  )
}
