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
import { ArrowRight, Home } from "lucide-react"

interface HomeInfoFormProps {
  onComplete: (data: any) => void
}

export function HomeInfoForm({ onComplete }: HomeInfoFormProps) {
  const [formData, setFormData] = useState({
    address: "",
    homeType: "",
    homeAge: "",
    mobilityNeeds: [] as string[],
    urgencyLevel: "",
    roomToScan: "",
    additionalInfo: "",
  })

  const mobilityOptions = [
    { id: "mobility_aid", label: "Uses mobility aid (walker, cane, etc.)" },
    { id: "wheelchair_access", label: "Wheelchair accessibility needed" },
    { id: "balance_issues", label: "Balance or stability concerns" },
    { id: "vision_impairment", label: "Vision impairment" },
    { id: "hearing_impairment", label: "Hearing impairment" },
    { id: "arthritis", label: "Arthritis or joint issues" },
  ]

  const handleMobilityChange = (optionId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      mobilityNeeds: checked ? [...prev.mobilityNeeds, optionId] : prev.mobilityNeeds.filter((id) => id !== optionId),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onComplete(formData)
  }

  const isFormValid = formData.address && formData.homeType && formData.urgencyLevel && formData.roomToScan

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
          <Home className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-2xl">Tell Us About Your Home</CardTitle>
        <CardDescription>This information helps us provide more accurate safety recommendations.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="address">Home Address</Label>
            <Input
              id="address"
              placeholder="123 Main Street, City, State"
              value={formData.address}
              onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
              required
            />
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
              <Label htmlFor="homeAge">Approximate Home Age</Label>
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

          <div className="space-y-3">
            <Label>Mobility and Accessibility Needs</Label>
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
            <Label htmlFor="urgencyLevel">How urgent are these modifications?</Label>
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

          <div className="space-y-2">
            <Label htmlFor="roomToScan">Which room would you like to scan first?</Label>
            <Select
              value={formData.roomToScan}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, roomToScan: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select room to scan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bathroom">Bathroom</SelectItem>
                <SelectItem value="bedroom">Bedroom</SelectItem>
                <SelectItem value="kitchen">Kitchen</SelectItem>
                <SelectItem value="living-room">Living Room</SelectItem>
                <SelectItem value="hallway">Hallway</SelectItem>
                <SelectItem value="entryway">Entryway</SelectItem>
                <SelectItem value="stairs">Stairs</SelectItem>
              </SelectContent>
            </Select>
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

          <Button type="submit" className="w-full" size="lg" disabled={!isFormValid}>
            Continue to AR Scan
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
