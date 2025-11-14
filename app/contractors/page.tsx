import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, Phone, Mail, Search, Filter } from "lucide-react"
import Link from "next/link"

export default function ContractorsPage() {
  const contractors = [
    {
      id: 1,
      name: "Mike's Accessibility Solutions",
      rating: 4.8,
      reviews: 47,
      location: "Austin, TX",
      specialties: ["Bathroom Modifications", "Ramp Installation", "Grab Bars"],
      phone: "(512) 555-0123",
      email: "mike@accessibilitysolutions.com",
      image: "/contractor-profile.png",
    },
    {
      id: 2,
      name: "SafeHome Contractors",
      rating: 4.9,
      reviews: 63,
      location: "Dallas, TX",
      specialties: ["Stair Lifts", "Doorway Widening", "Flooring"],
      phone: "(214) 555-0456",
      email: "info@safehomecontractors.com",
      image: "/contractor-profile.png",
    },
    {
      id: 3,
      name: "Aging in Place Pros",
      rating: 4.7,
      reviews: 38,
      location: "Houston, TX",
      specialties: ["Kitchen Modifications", "Lighting", "Smart Home"],
      phone: "(713) 555-0789",
      email: "contact@aginginplacepros.com",
      image: "/contractor-profile.png",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">H</span>
              </div>
              <span className="text-xl font-bold text-foreground">HOMEase AI</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/assessment" className="text-foreground hover:text-primary transition-colors">
                Start Assessment
              </Link>
              <Link href="/contractors" className="text-primary font-medium">
                Find Contractors
              </Link>
              <Link href="/about" className="text-foreground hover:text-primary transition-colors">
                About
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/contractor">Contractor Portal</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Find Qualified Contractors</h1>
          <p className="text-lg text-muted-foreground">
            Connect with vetted professionals who specialize in aging-in-place home modifications.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search by location, specialty, or contractor name..." className="pl-10" />
          </div>
          <Button variant="outline" className="sm:w-auto bg-transparent">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Contractors Grid */}
        <div className="grid gap-6">
          {contractors.map((contractor) => (
            <Card key={contractor.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={contractor.image || "/placeholder.svg"} alt={contractor.name} />
                      <AvatarFallback>
                        {contractor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-xl">{contractor.name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1 font-medium">{contractor.rating}</span>
                          <span className="text-muted-foreground ml-1">({contractor.reviews} reviews)</span>
                        </div>
                      </div>
                      <div className="flex items-center mt-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{contractor.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Button asChild>
                      <Link href={`/contractors/${contractor.id}`}>View Profile</Link>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {contractor.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>{contractor.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      <span>{contractor.email}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center bg-card rounded-lg p-8">
          <h2 className="text-2xl font-bold text-card-foreground mb-4">Are you a qualified contractor?</h2>
          <p className="text-muted-foreground mb-6">
            Join our network of trusted professionals and receive high-quality leads from homeowners.
          </p>
          <Button size="lg" asChild>
            <Link href="/contractor">Join as a Contractor</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
