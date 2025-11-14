import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, Zap, Heart, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">HOMEase AI</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/assessment" className="text-foreground hover:text-primary transition-colors">
                Start Assessment
              </Link>
              <Link href="/contractors" className="text-foreground hover:text-primary transition-colors">
                Find Contractors
              </Link>
              <Link href="/about" className="text-primary font-medium">
                About
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
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

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">About HOMEase AI</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're revolutionizing how homeowners prepare their homes for aging in place through cutting-edge AR
            technology and trusted contractor networks.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                To empower every homeowner to age safely and comfortably in their own home by making accessibility
                modifications simple, affordable, and accessible through innovative technology.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Why We Exist */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Why HOMEase AI Exists</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-primary" />
                  The Challenge
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">10,000+ Americans turn 65 daily</p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">90% prefer to age in their own homes</p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">Only 3.5% of homes meet basic accessibility standards</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-primary" />
                  Our Solution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">AR-powered home safety assessments</p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">AI-driven personalized recommendations</p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">Vetted contractor network for quality work</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Scan Your Home</h3>
              <p className="text-muted-foreground">
                Use your smartphone to scan rooms and identify potential safety hazards with our AR technology.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-secondary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Recommendations</h3>
              <p className="text-muted-foreground">
                Receive AI-powered safety recommendations and visualize how modifications will look.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-accent">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect with Pros</h3>
              <p className="text-muted-foreground">
                Get matched with qualified contractors who specialize in aging-in-place modifications.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-16 bg-card rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-card-foreground">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-muted-foreground">Homes Assessed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Trusted Contractors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">Customer Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">$2M+</div>
              <div className="text-muted-foreground">In Modifications</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make Your Home Safer?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of homeowners who have improved their home safety and independence with HOMEase AI.
          </p>
          <Button size="lg" className="text-lg px-8" asChild>
            <Link href="/assessment">Start Your Free Assessment</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
