"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { LeadAnalytics } from "@/components/lead-analytics"
import { Search, Filter, Download, RefreshCw } from "lucide-react"

export default function AdminLeadsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  // Mock leads data for admin view
  const leads = [
    {
      id: "lead_001",
      type: "Bathroom Modification",
      homeowner: "John Smith",
      contractor: "Mike's Accessibility Solutions",
      status: "won",
      value: 2500,
      leadScore: 85,
      createdAt: "2024-01-15",
      convertedAt: "2024-01-20",
      location: "Austin, TX",
    },
    {
      id: "lead_002",
      type: "Ramp Installation",
      homeowner: "Mary Johnson",
      contractor: "SafeHome Renovations",
      status: "quoted",
      value: 3200,
      leadScore: 92,
      createdAt: "2024-01-18",
      convertedAt: null,
      location: "Houston, TX",
    },
    {
      id: "lead_003",
      type: "Grab Bar Installation",
      homeowner: "Robert Davis",
      contractor: null,
      status: "open",
      value: 650,
      leadScore: 78,
      createdAt: "2024-01-20",
      convertedAt: null,
      location: "Dallas, TX",
    },
  ]

  type BadgeVariant = "default" | "destructive" | "outline" | "secondary"

  const getStatusColor = (status: string): BadgeVariant => {
    const colors: Record<string, BadgeVariant> = {
      open: "default",
      assigned: "secondary",
      contacted: "outline",
      quoted: "default",
      won: "default",
      lost: "destructive",
      expired: "secondary",
    }
    return colors[status] || "default"
  }

  const filteredLeads = leads.filter((lead) => {
    if (searchTerm && !lead.homeowner.toLowerCase().includes(searchTerm.toLowerCase())) return false
    if (statusFilter !== "all" && lead.status !== statusFilter) return false
    if (typeFilter !== "all" && !lead.type.toLowerCase().includes(typeFilter.toLowerCase())) return false
    return true
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Lead Management</h1>
              <p className="text-muted-foreground">Monitor and analyze lead performance across the platform</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="management">Management</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Active Leads</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23</div>
                  <p className="text-xs text-muted-foreground">Awaiting contractor action</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">57.1%</div>
                  <p className="text-xs text-muted-foreground">Above platform average</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Avg Lead Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$2,850</div>
                  <p className="text-xs text-muted-foreground">Per converted lead</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Revenue This Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$19,950</div>
                  <p className="text-xs text-muted-foreground">From lead conversions</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Leads */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Lead Activity</CardTitle>
                <CardDescription>Latest leads and their current status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leads.slice(0, 5).map((lead) => (
                    <div key={lead.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium">{lead.homeowner}</p>
                          <p className="text-sm text-muted-foreground">{lead.type}</p>
                          <p className="text-xs text-muted-foreground">{lead.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-medium">${lead.value.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">Score: {lead.leadScore}</p>
                        </div>
                        <Badge variant={getStatusColor(lead.status)}>
                          {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <LeadAnalytics />
          </TabsContent>

          <TabsContent value="management" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="mr-2 h-5 w-5" />
                  Lead Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search homeowners..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All statuses</SelectItem>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="assigned">Assigned</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="quoted">Quoted</SelectItem>
                        <SelectItem value="won">Won</SelectItem>
                        <SelectItem value="lost">Lost</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Type</label>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All types</SelectItem>
                        <SelectItem value="bathroom">Bathroom</SelectItem>
                        <SelectItem value="ramp">Ramp</SelectItem>
                        <SelectItem value="grab">Grab Bar</SelectItem>
                        <SelectItem value="stair">Stair Lift</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button variant="outline" className="w-full bg-transparent">
                      Clear Filters
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Leads Table */}
            <Card>
              <CardHeader>
                <CardTitle>All Leads ({filteredLeads.length})</CardTitle>
                <CardDescription>Manage and monitor all leads in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredLeads.map((lead) => (
                    <div key={lead.id} className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{lead.homeowner}</p>
                        <p className="text-sm text-muted-foreground">{lead.location}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{lead.type}</p>
                        <p className="text-xs text-muted-foreground">Score: {lead.leadScore}</p>
                      </div>
                      <div>
                        <p className="text-sm">{lead.contractor || "Unassigned"}</p>
                        <p className="text-xs text-muted-foreground">Contractor</p>
                      </div>
                      <div>
                        <Badge variant={getStatusColor(lead.status)}>
                          {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                        </Badge>
                      </div>
                      <div>
                        <p className="font-medium">${lead.value.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Est. value</p>
                      </div>
                      <div>
                        <p className="text-sm">{lead.createdAt}</p>
                        <p className="text-xs text-muted-foreground">Created</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
