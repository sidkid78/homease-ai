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
import { ArrowRight, Building, Award, MapPin, Upload } from "lucide-react"
import { useRouter } from "next/navigation"

export function ContractorRegistration() {
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

    // Business Information
    businessName: "",
    businessType: "",
    licenseNumber: "",
    insuranceProvider: "",
    yearsExperience: "",
    website: "",
    businessDescription: "",

    // Service Information
    serviceAreas: [] as string[],
    specializations: [] as string[],
    maxProjectValue: "",

    // Documents & Verification
    licenseDocument: null as File | null,
    insuranceDocument: null as File | null,

    // Preferences
    communicationPreferences: [] as string[],
    agreeToTerms: false,
  })

  const businessTypes = [
    { value: "sole-proprietorship", label: "Sole Proprietorship" },
    { value: "llc", label: "LLC" },
    { value: "corporation", label: "Corporation" },
    { value: "partnership", label: "Partnership" },
  ]

  const serviceAreaOptions = [
    "Austin, TX",
    "Dallas, TX",
    "Houston, TX",
    "San Antonio, TX",
    "Miami, FL",
    "Tampa, FL",
    "Orlando, FL",
    "Jacksonville, FL",
  ]

  const specializationOptions = [
    "Grab Bars",
    "Bathroom Modifications",
    "Ramps",
    "Stair Lifts",
    "Doorway Widening",
    "Flooring",
    "Lighting",
    "Universal Design",
    "Wheelchair Access",
    "Kitchen Modifications",
  ]

  const communicationOptions = [
    { id: "email", label: "Email notifications" },
    { id: "sms", label: "Text message alerts" },
    { id: "phone", label: "Phone call notifications" },
  ]

  const handleServiceAreaChange = (area: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      serviceAreas: checked ? [...prev.serviceAreas, area] : prev.serviceAreas.filter((a) => a !== area),
    }))
  }

  const handleSpecializationChange = (spec: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      specializations: checked ? [...prev.specializations, spec] : prev.specializations.filter((s) => s !== spec),
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

  const handleFileUpload = (field: "licenseDocument" | "insuranceDocument", file: File | null) => {
    setFormData((prev) => ({ ...prev, [field]: file }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match")
      return
    }

    // Here you would typically send the data to your API
    console.log("[v0] Contractor registration data:", formData)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Redirect to contractor dashboard
    router.push("/contractor")
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  const isStep1Valid = formData.firstName && formData.lastName && formData.email && formData.password && formData.phone
  const isStep2Valid =
    formData.businessName && formData.businessType && formData.licenseNumber && formData.yearsExperience
  const isStep3Valid = formData.serviceAreas.length > 0 && formData.specializations.length > 0
  const isStep4Valid = formData.agreeToTerms

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
          <Building className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-2xl">Create Your Contractor Account</CardTitle>
        <CardDescription>
          Join HOMEase AI to access high-quality leads and grow your accessibility modification business
        </CardDescription>
        <div className="flex justify-center mt-4">
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4].map((i) => (
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
                <Building className="h-5 w-5 text-primary" />
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
                Continue to Business Information
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Step 2: Business Information */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Award className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Business Information</h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, businessName: e.target.value }))}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <Select
                    value={formData.businessType}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, businessType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yearsExperience">Years of Experience</Label>
                  <Input
                    id="yearsExperience"
                    type="number"
                    min="0"
                    value={formData.yearsExperience}
                    onChange={(e) => setFormData((prev) => ({ ...prev, yearsExperience: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="licenseNumber">License Number</Label>
                  <Input
                    id="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={(e) => setFormData((prev) => ({ ...prev, licenseNumber: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                  <Input
                    id="insuranceProvider"
                    value={formData.insuranceProvider}
                    onChange={(e) => setFormData((prev) => ({ ...prev, insuranceProvider: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website (Optional)</Label>
                <Input
                  id="website"
                  type="url"
                  placeholder="https://www.yourwebsite.com"
                  value={formData.website}
                  onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessDescription">Business Description</Label>
                <Textarea
                  id="businessDescription"
                  placeholder="Describe your business, experience, and what sets you apart..."
                  value={formData.businessDescription}
                  onChange={(e) => setFormData((prev) => ({ ...prev, businessDescription: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="flex space-x-4">
                <Button type="button" variant="outline" onClick={prevStep} className="flex-1 bg-transparent">
                  Back
                </Button>
                <Button type="button" onClick={nextStep} className="flex-1" disabled={!isStep2Valid}>
                  Continue to Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Service Areas & Specializations */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Service Areas & Specializations</h3>
              </div>

              <div className="space-y-3">
                <Label>Service Areas (Select all that apply)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {serviceAreaOptions.map((area) => (
                    <div key={area} className="flex items-center space-x-2">
                      <Checkbox
                        id={area}
                        checked={formData.serviceAreas.includes(area)}
                        onCheckedChange={(checked) => handleServiceAreaChange(area, checked as boolean)}
                      />
                      <Label htmlFor={area} className="text-sm font-normal">
                        {area}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Specializations (Select all that apply)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {specializationOptions.map((spec) => (
                    <div key={spec} className="flex items-center space-x-2">
                      <Checkbox
                        id={spec}
                        checked={formData.specializations.includes(spec)}
                        onCheckedChange={(checked) => handleSpecializationChange(spec, checked as boolean)}
                      />
                      <Label htmlFor={spec} className="text-sm font-normal">
                        {spec}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxProjectValue">Maximum Project Value</Label>
                <Select
                  value={formData.maxProjectValue}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, maxProjectValue: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select maximum project value" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5000">Up to $5,000</SelectItem>
                    <SelectItem value="10000">Up to $10,000</SelectItem>
                    <SelectItem value="25000">Up to $25,000</SelectItem>
                    <SelectItem value="50000">Up to $50,000</SelectItem>
                    <SelectItem value="unlimited">No limit</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex space-x-4">
                <Button type="button" variant="outline" onClick={prevStep} className="flex-1 bg-transparent">
                  Back
                </Button>
                <Button type="button" onClick={nextStep} className="flex-1" disabled={!isStep3Valid}>
                  Continue to Verification
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Documents & Final Steps */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Upload className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Verification & Preferences</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="licenseDocument">License Document (Optional)</Label>
                  <Input
                    id="licenseDocument"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload("licenseDocument", e.target.files?.[0] || null)}
                  />
                  <p className="text-xs text-muted-foreground">Upload a copy of your contractor license</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="insuranceDocument">Insurance Certificate (Optional)</Label>
                  <Input
                    id="insuranceDocument"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload("insuranceDocument", e.target.files?.[0] || null)}
                  />
                  <p className="text-xs text-muted-foreground">Upload your insurance certificate</p>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Communication Preferences</Label>
                <div className="grid grid-cols-1 gap-3">
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
                  </a>
                  ,{" "}
                  <a href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                  , and{" "}
                  <a href="/contractor-agreement" className="text-primary hover:underline">
                    Contractor Agreement
                  </a>
                </Label>
              </div>

              <div className="flex space-x-4">
                <Button type="button" variant="outline" onClick={prevStep} className="flex-1 bg-transparent">
                  Back
                </Button>
                <Button type="submit" className="flex-1" disabled={!isStep4Valid}>
                  Create Contractor Account
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
