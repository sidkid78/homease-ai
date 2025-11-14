"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Camera, MapPin, Star, Award, Save } from "lucide-react"

interface ContractorProfileProps {
  contractorData: any
}

export function ContractorProfile({ contractorData }: ContractorProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    businessName: contractorData.businessName,
    bio: "Specializing in bathroom safety modifications and grab bar installations for over 12 years. Licensed and insured with a focus on helping seniors age safely in their homes.",
    phone: "(555) 123-4567",
    email: "mike@accessibilitysolutions.com",
    website: "www.accessibilitysolutions.com",
    licenseNumber: "TX-LIC-12345",
    insuranceVerified: true,
    yearsExperience: 12,
    serviceAreas: contractorData.serviceAreas,
    specializations: contractorData.specializations,
  })

  const allSpecializations = [
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

  const handleSpecializationChange = (specialization: string, checked: boolean) => {
    setProfileData((prev) => ({
      ...prev,
      specializations: checked
        ? [...prev.specializations, specialization]
        : prev.specializations.filter((s) => s !== specialization),
    }))
  }

  const handleSave = () => {
    // Here you would save the profile data
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Business Profile</CardTitle>
            <Button variant={isEditing ? "default" : "outline"} onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              ) : (
                "Edit Profile"
              )}
            </Button>
          </div>
          <CardDescription>Manage your business information and specializations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder.svg?height=80&width=80" />
              <AvatarFallback>MB</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{contractorData.rating}</span>
                <span className="text-muted-foreground">({contractorData.totalReviews} reviews)</span>
              </div>
              <Button variant="outline" size="sm">
                <Camera className="mr-2 h-4 w-4" />
                Change Photo
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={profileData.businessName}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, businessName: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={profileData.website}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, website: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="licenseNumber">License Number</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="licenseNumber"
                    value={profileData.licenseNumber}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, licenseNumber: e.target.value }))}
                    disabled={!isEditing}
                  />
                  <Award className="h-5 w-5 text-green-500" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="yearsExperience">Years of Experience</Label>
                <Input
                  id="yearsExperience"
                  type="number"
                  value={profileData.yearsExperience}
                  onChange={(e) =>
                    setProfileData((prev) => ({ ...prev, yearsExperience: Number.parseInt(e.target.value) }))
                  }
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label>Insurance Status</Label>
                <div className="flex items-center space-x-2">
                  <Badge variant={profileData.insuranceVerified ? "default" : "destructive"}>
                    {profileData.insuranceVerified ? "Verified" : "Not Verified"}
                  </Badge>
                  {profileData.insuranceVerified && <Award className="h-4 w-4 text-green-500" />}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Service Areas</Label>
                <div className="flex flex-wrap gap-2">
                  {profileData.serviceAreas.map((area, index) => (
                    <Badge key={index} variant="outline">
                      <MapPin className="mr-1 h-3 w-3" />
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Business Description</Label>
            <Textarea
              id="bio"
              value={profileData.bio}
              onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
              disabled={!isEditing}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Specializations */}
      <Card>
        <CardHeader>
          <CardTitle>Specializations</CardTitle>
          <CardDescription>Select the types of modifications you specialize in</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {allSpecializations.map((specialization) => (
              <div key={specialization} className="flex items-center space-x-2">
                <Checkbox
                  id={specialization}
                  checked={profileData.specializations.includes(specialization)}
                  onCheckedChange={(checked) => handleSpecializationChange(specialization, checked as boolean)}
                  disabled={!isEditing}
                />
                <Label htmlFor={specialization} className="text-sm">
                  {specialization}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Statistics</CardTitle>
          <CardDescription>Your performance metrics on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-900">62.5%</div>
              <div className="text-sm text-green-700">Conversion Rate</div>
              <div className="text-xs text-green-600 mt-1">Above platform average</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-900">2.3 hrs</div>
              <div className="text-sm text-blue-700">Avg Response Time</div>
              <div className="text-xs text-blue-600 mt-1">Excellent response speed</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="text-2xl font-bold text-purple-900">$3,200</div>
              <div className="text-sm text-purple-700">Avg Project Value</div>
              <div className="text-xs text-purple-600 mt-1">Higher than average</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {isEditing && (
        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      )}
    </div>
  )
}
