"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart3, DollarSign, Eye, MessageSquare, Settings, Star, TrendingUp, Users } from "lucide-react"
import { ContractorLeads } from "@/components/contractor-leads"
import { ContractorProfile } from "@/components/contractor-profile"
import { ContractorMessages } from "@/components/contractor-messages"

export default function ContractorDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

  // Mock contractor data
  const contractorData = {
    name: "Mike Builder",
    businessName: "Mike's Accessibility Solutions",
    rating: 4.8,
    totalReviews: 47,
    specializations: ["Grab Bars", "Bathroom Modifications", "Ramps"],
    serviceAreas: ["Austin", "Round Rock", "Cedar Park"],
    monthlyStats: {
      leadsViewed: 23,
      leadsPurchased: 8,
      conversions: 5,
      revenue: 12500,
    },
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>MB</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-semibold text-foreground">{contractorData.businessName}</h1>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{contractorData.rating}</span>
                  <span>({contractorData.totalReviews} reviews)</span>
                </div>
              </div>
            </div>
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="leads">Available Leads</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Leads Viewed</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{contractorData.monthlyStats.leadsViewed}</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Leads Purchased</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{contractorData.monthlyStats.leadsPurchased}</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Conversions</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{contractorData.monthlyStats.conversions}</div>
                  <p className="text-xs text-muted-foreground">62.5% conversion rate</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${contractorData.monthlyStats.revenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Lead Activity</CardTitle>
                  <CardDescription>Your latest lead interactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        id: 1,
                        type: "purchased",
                        description: "Bathroom modification in Austin",
                        time: "2 hours ago",
                        amount: "$85",
                      },
                      {
                        id: 2,
                        type: "viewed",
                        description: "Grab bar installation in Round Rock",
                        time: "4 hours ago",
                        amount: null,
                      },
                      {
                        id: 3,
                        type: "converted",
                        description: "Ramp installation in Cedar Park",
                        time: "1 day ago",
                        amount: "$3,200",
                      },
                    ].map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`h-2 w-2 rounded-full ${
                              activity.type === "purchased"
                                ? "bg-blue-500"
                                : activity.type === "converted"
                                  ? "bg-green-500"
                                  : "bg-gray-400"
                            }`}
                          />
                          <div>
                            <p className="text-sm font-medium">{activity.description}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                        {activity.amount && (
                          <Badge variant={activity.type === "converted" ? "default" : "secondary"}>
                            {activity.amount}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Insights</CardTitle>
                  <CardDescription>Tips to improve your success rate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-start space-x-3">
                        <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-green-900">Great Conversion Rate!</p>
                          <p className="text-xs text-green-700">
                            Your 62.5% conversion rate is above the platform average of 45%.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-start space-x-3">
                        <MessageSquare className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-900">Quick Response Tip</p>
                          <p className="text-xs text-blue-700">
                            Responding to leads within 1 hour increases conversion by 35%.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <div className="flex items-start space-x-3">
                        <Users className="h-5 w-5 text-amber-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-amber-900">Profile Optimization</p>
                          <p className="text-xs text-amber-700">
                            Add more photos to your profile to increase lead interest by 25%.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="leads">
            <ContractorLeads />
          </TabsContent>

          <TabsContent value="messages">
            <ContractorMessages />
          </TabsContent>

          <TabsContent value="profile">
            <ContractorProfile contractorData={contractorData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
