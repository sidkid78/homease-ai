"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MapPin, Clock, DollarSign, AlertTriangle, Eye, CreditCard, Filter } from "lucide-react"

export function ContractorLeads() {
  const [selectedLead, setSelectedLead] = useState<any>(null)
  const [filterLocation, setFilterLocation] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterUrgency, setFilterUrgency] = useState("all")

  // Mock leads data
  const leads = [
    {
      id: 1,
      type: "Bathroom Modification",
      description: "Install grab bars, improve lighting, and add non-slip surfaces in master bathroom",
      location: "Austin, TX",
      urgency: "high",
      budget: { min: 800, max: 2500 },
      leadScore: 85,
      timePosted: "2 hours ago",
      hazards: ["No grab bars near toilet", "Slippery shower floor", "Poor lighting"],
      homeInfo: {
        homeType: "Single Family",
        homeAge: "25 years",
        mobilityNeeds: ["Balance issues", "Mobility aid use"],
      },
      price: 85,
    },
    {
      id: 2,
      type: "Ramp Installation",
      description: "Install wheelchair ramp at front entrance with handrails",
      location: "Round Rock, TX",
      urgency: "urgent",
      budget: { min: 1200, max: 3500 },
      leadScore: 92,
      timePosted: "4 hours ago",
      hazards: ["High threshold", "No handrail", "Steep approach"],
      homeInfo: {
        homeType: "Single Family",
        homeAge: "15 years",
        mobilityNeeds: ["Wheelchair access"],
      },
      price: 120,
    },
    {
      id: 3,
      type: "Grab Bar Installation",
      description: "Install grab bars in shower and near toilet in guest bathroom",
      location: "Cedar Park, TX",
      urgency: "medium",
      budget: { min: 400, max: 800 },
      leadScore: 78,
      timePosted: "6 hours ago",
      hazards: ["No grab bars", "Slippery surfaces"],
      homeInfo: {
        homeType: "Townhouse",
        homeAge: "10 years",
        mobilityNeeds: ["Balance issues"],
      },
      price: 65,
    },
    {
      id: 4,
      type: "Stair Lift Installation",
      description: "Install stair lift for access to second floor",
      location: "Austin, TX",
      urgency: "high",
      budget: { min: 3000, max: 8000 },
      leadScore: 88,
      timePosted: "8 hours ago",
      hazards: ["No handrails", "Steep stairs", "Poor lighting"],
      homeInfo: {
        homeType: "Two-story home",
        homeAge: "30 years",
        mobilityNeeds: ["Mobility aid use", "Balance issues"],
      },
      price: 150,
    },
  ]

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "urgent":
        return "destructive"
      case "high":
        return "secondary"
      case "medium":
        return "default"
      default:
        return "outline"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600"
    if (score >= 70) return "text-blue-600"
    return "text-amber-600"
  }

  const filteredLeads = leads.filter((lead) => {
    if (filterLocation && !lead.location.toLowerCase().includes(filterLocation.toLowerCase())) return false
    if (filterType !== "all" && !lead.type.toLowerCase().includes(filterType.toLowerCase())) return false
    if (filterUrgency !== "all" && lead.urgency !== filterUrgency) return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="mr-2 h-5 w-5" />
            Filter Leads
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Input
                placeholder="Enter city..."
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Modification Type</label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All types</SelectItem>
                  <SelectItem value="bathroom">Bathroom Modification</SelectItem>
                  <SelectItem value="ramp">Ramp Installation</SelectItem>
                  <SelectItem value="grab">Grab Bar Installation</SelectItem>
                  <SelectItem value="stair">Stair Lift Installation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Urgency</label>
              <Select value={filterUrgency} onValueChange={setFilterUrgency}>
                <SelectTrigger>
                  <SelectValue placeholder="All urgency levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All urgency levels</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leads List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Available Leads ({filteredLeads.length})</h2>
          <p className="text-sm text-muted-foreground">Showing leads in your service areas</p>
        </div>

        {filteredLeads.map((lead) => (
          <Card key={lead.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold">{lead.type}</h3>
                    <Badge variant={getUrgencyColor(lead.urgency)}>
                      {lead.urgency.charAt(0).toUpperCase() + lead.urgency.slice(1)} Priority
                    </Badge>
                    <div className={`text-sm font-medium ${getScoreColor(lead.leadScore)}`}>
                      Score: {lead.leadScore}
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">{lead.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-2 h-4 w-4" />
                      {lead.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-2 h-4 w-4" />
                      {lead.timePosted}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <DollarSign className="mr-2 h-4 w-4" />${lead.budget.min.toLocaleString()} - $
                      {lead.budget.max.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {lead.hazards.slice(0, 3).map((hazard, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        {hazard}
                      </Badge>
                    ))}
                    {lead.hazards.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{lead.hazards.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-2 ml-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">${lead.price}</div>
                    <div className="text-xs text-muted-foreground">Lead price</div>
                  </div>

                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedLead(lead)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{selectedLead?.type}</DialogTitle>
                          <DialogDescription>{selectedLead?.location}</DialogDescription>
                        </DialogHeader>
                        {selectedLead && (
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold mb-2">Project Description</h4>
                              <p className="text-sm text-muted-foreground">{selectedLead.description}</p>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-2">Hazards Detected</h4>
                              <div className="space-y-2">
                                {selectedLead.hazards.map((hazard: string, index: number) => (
                                  <div key={index} className="flex items-center p-2 bg-amber-50 rounded border">
                                    <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                                    <span className="text-sm">{hazard}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-2">Home Information</h4>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="font-medium">Home Type:</span> {selectedLead.homeInfo.homeType}
                                </div>
                                <div>
                                  <span className="font-medium">Age:</span> {selectedLead.homeInfo.homeAge}
                                </div>
                                <div className="col-span-2">
                                  <span className="font-medium">Mobility Needs:</span>{" "}
                                  {selectedLead.homeInfo.mobilityNeeds.join(", ")}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
                              <div>
                                <div className="font-semibold">Estimated Budget</div>
                                <div className="text-sm text-muted-foreground">
                                  ${selectedLead.budget.min.toLocaleString()} - $
                                  {selectedLead.budget.max.toLocaleString()}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold">Lead Score</div>
                                <div className={`text-sm ${getScoreColor(selectedLead.leadScore)}`}>
                                  {selectedLead.leadScore}/100
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        <DialogFooter>
                          <Button variant="outline">Close</Button>
                          <Button>
                            <CreditCard className="mr-2 h-4 w-4" />
                            Purchase Lead - ${selectedLead?.price}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Button size="sm">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Buy ${lead.price}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
