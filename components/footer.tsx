import Link from "next/link"
import { Twitter, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col gap-8 py-8 md:flex-row md:py-12">
        <div className="flex-1 space-y-4">
          <h2 className="font-bold">Set Up Your Store</h2>
          <p className="text-sm text-muted-foreground">
            AI-powered retail solutions with Walmart's supply chain advantage. Launch your store, grow your business.
          </p>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-12 sm:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Platform</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/ai-features" className="text-muted-foreground transition-colors hover:text-primary">
                  AI Recommendations
                </Link>
              </li>
              <li>
                <Link href="/supply-chain" className="text-muted-foreground transition-colors hover:text-primary">
                  Supply Chain Access
                </Link>
              </li>
              <li>
                <Link
                  href="/inventory-management"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Inventory Management
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/getting-started" className="text-muted-foreground transition-colors hover:text-primary">
                  Getting Started
                </Link>
              </li>
              <li>
                <Link href="/store-setup-guide" className="text-muted-foreground transition-colors hover:text-primary">
                  Store Setup Guide
                </Link>
              </li>
              <li>
                <Link href="/demographics-guide" className="text-muted-foreground transition-colors hover:text-primary">
                  Demographics Guide
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/help-center" className="text-muted-foreground transition-colors hover:text-primary">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground transition-colors hover:text-primary">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="text-muted-foreground transition-colors hover:text-primary">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Connect</h3>
            <div className="flex space-x-4">
              <Link
                href="mailto:support@setupyourstore.com"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
              <Link
                href="https://twitter.com/setupyourstore"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://linkedin.com/company/setupyourstore"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container border-t py-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Set Up Your Store, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary">
              Terms of Service
            </Link>
            <Link href="/walmart-partnership" className="hover:text-primary">
              Walmart Partnership
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
