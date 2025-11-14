"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Home, User, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"

export function HomeownerRegistration() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",

    // Home Information
    address: "",
    city: "",
    state: "",
    zipCode: "",
    homeType: "",
    homeAge: "",

    // Accessibility Needs
    mobilityNeeds: [] as string[],
    urgencyLevel: "",
    additionalInfo: "",

    // Preferences
    communicationPreferences: [] as string[],
    agreeToTerms: false,
  })

  const mobilityOptions = [
    { id: "mobility_aid", label: "Uses mobility aid (walker, cane, etc.)" },
    { id: "wheelchair_access", label: "Wheelchair accessibility needed" },
    { id: "balance_issues", label: "Balance or stability concerns" },
    { id: "vision_impairment", label: "Vision impairment" },
    { id: "hearing_impairment", label: "Hearing impairment" },
    { id: "arthritis", label: "Arthritis or joint issues" },
  ]

  const communicationOptions = [
    { id: "email", label: "Email updates" },
    { id: "sms", label: "Text messages" },
    { id: "phone", label: "Phone calls" },
  ]

  const handleMobilityChange = (optionId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      mobilityNeeds: checked ? [...prev.mobilityNeeds, optionId] : prev.mobilityNeeds.filter((id) => id !== optionId),
    }))
  }

  const handleCommunicationChange = (optionId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      communicationPreferences: checked
        ? [...prev.communicationPreferences, optionId]
        : prev.communicationPreferences.filter((id) => id !== optionId),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match")
      return
    }

    // Here you would typically send the data to your API
    console.log("[v0] Homeowner registration data:", formData)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Redirect to assessment or dashboard
    router.push("/assessment")
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  const isStep1Valid = formData.firstName && formData.lastName && formData.email && formData.password && formData.phone
  const isStep2Valid = formData.address && formData.city && formData.state && formData.zipCode && formData.homeType
  const isStep3Valid = formData.urgencyLevel && formData.agreeToTerms

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
          <User className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-2xl">Create Your Homeowner Account</CardTitle>
        <CardDescription>
          Join HOMEase AI to get personalized safety assessments and connect with trusted contractors
        </CardDescription>
        <div className="flex justify-center mt-4">
          <div className="flex items-center space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`h-2 w-8 rounded-full ${i <= step ? "bg-primary" : "bg-muted"}`} />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <User className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Personal Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <Button type="button" onClick={nextStep} className="w-full" disabled={!isStep1Valid}>
                Continue to Home Information
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Step 2: Home Information */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Home className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Home Information</h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Select
                    value={formData.state}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, state: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TX">Texas</SelectItem>
                      <SelectItem value="FL">Florida</SelectItem>
                      <SelectItem value="CA">California</SelectItem>
                      <SelectItem value="NY">New York</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => setFormData((prev) => ({ ...prev, zipCode: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="homeType">Home Type</Label>
                  <Select
                    value={formData.homeType}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, homeType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select home type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single-family">Single Family Home</SelectItem>
                      <SelectItem value="condo">Condominium</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="mobile-home">Mobile Home</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="homeAge">Home Age</Label>
                  <Select
                    value={formData.homeAge}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, homeAge: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select age range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-10">0-10 years</SelectItem>
                      <SelectItem value="11-20">11-20 years</SelectItem>
                      <SelectItem value="21-30">21-30 years</SelectItem>
                      <SelectItem value="31-50">31-50 years</SelectItem>
                      <SelectItem value="50+">50+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button type="button" variant="outline" onClick={prevStep} className="flex-1 bg-transparent">
                  Back
                </Button>
                <Button type="button" onClick={nextStep} className="flex-1" disabled={!isStep2Valid}>
                  Continue to Preferences
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Accessibility Needs & Preferences */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Accessibility Needs & Preferences</h3>
              </div>

              <div className="space-y-3">
                <Label>Mobility and Accessibility Needs (Optional)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {mobilityOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={option.id}
                        checked={formData.mobilityNeeds.includes(option.id)}
                        onCheckedChange={(checked) => handleMobilityChange(option.id, checked as boolean)}
                      />
                      <Label htmlFor={option.id} className="text-sm font-normal">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="urgencyLevel">How urgent are potential modifications?</Label>
                <Select
                  value={formData.urgencyLevel}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, urgencyLevel: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select urgency level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - Planning for the future</SelectItem>
                    <SelectItem value="medium">Medium - Needed within 6 months</SelectItem>
                    <SelectItem value="high">High - Needed within 1-2 months</SelectItem>
                    <SelectItem value="urgent">Urgent - Needed immediately</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Communication Preferences</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {communicationOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={option.id}
                        checked={formData.communicationPreferences.includes(option.id)}
                        onCheckedChange={(checked) => handleCommunicationChange(option.id, checked as boolean)}
                      />
                      <Label htmlFor={option.id} className="text-sm font-normal">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
                <Textarea
                  id="additionalInfo"
                  placeholder="Any specific concerns or areas you'd like us to focus on..."
                  value={formData.additionalInfo}
                  onChange={(e) => setFormData((prev) => ({ ...prev, additionalInfo: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, agreeToTerms: checked as boolean }))}
                />
                <Label htmlFor="agreeToTerms" className="text-sm">
                  I agree to the{" "}
                  <a href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                </Label>
              </div>

              <div className="flex space-x-4">
                <Button type="button" variant="outline" onClick={prevStep} className="flex-1 bg-transparent">
                  Back
                </Button>
                <Button type="submit" className="flex-1" disabled={!isStep3Valid}>
                  Create Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
