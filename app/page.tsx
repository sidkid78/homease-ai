import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowRight, Camera, Shield, Users, Zap } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">HOMEase AI</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/assessment" className="text-foreground hover:text-primary transition-colors">
                Start Assessment
              </Link>
              <Link href="/contractors" className="text-foreground hover:text-primary transition-colors">
                Find Contractors
              </Link>
              <Link href="/about" className="text-foreground hover:text-primary transition-colors">
                About
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="outline" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/assessment">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Make Your Home Safe for Aging in Place
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Use AR technology to scan your home, identify safety hazards, and connect with qualified contractors for
            accessibility modifications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/assessment">
                <Camera className="mr-2 h-5 w-5" />
                Start AR Assessment
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent" asChild>
              <Link href="/contractors">
                Find Contractors
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-card-foreground mb-4">How HOMEase AI Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AR-powered platform makes home safety assessments simple and connects you with trusted professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Camera className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Scan Your Home</CardTitle>
                <CardDescription>
                  Use your phone's camera to scan rooms and identify potential safety hazards with AI-powered analysis.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>Get Recommendations</CardTitle>
                <CardDescription>
                  Receive personalized safety recommendations and visualize how modifications will look in your space.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Connect with Pros</CardTitle>
                <CardDescription>
                  Get matched with qualified, vetted contractors who specialize in aging-in-place modifications.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Make Your Home Safer?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of homeowners who have improved their home safety with HOMEase AI.
          </p>
          <Button size="lg" className="text-lg px-8" asChild>
            <Link href="/assessment">
              Start Your Free Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">© 2025 HOMEase AI. Making homes safer for aging in place.</p>
        </div>
      </footer>
    </div>
  )
}
