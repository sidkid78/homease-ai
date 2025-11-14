import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, TrendingUp, DollarSign, AlertTriangle, CheckCircle, Clock, Star, MapPin } from "lucide-react"

export default function AdminDashboard() {
  // Mock data for demonstration
  const metrics = {
    totalUsers: 2847,
    activeContractors: 156,
    monthlyRevenue: 89420,
    conversionRate: 23.4,
    avgLeadPrice: 87,
    pendingApprovals: 12,
  }

  const recentActivity = [
    { id: 1, type: "contractor_signup", contractor: "ABC Home Modifications", time: "2 hours ago" },
    { id: 2, type: "lead_purchased", contractor: "SafeHome Solutions", amount: 95, time: "4 hours ago" },
    { id: 3, type: "assessment_completed", homeowner: "Sarah Johnson", location: "Austin, TX", time: "6 hours ago" },
    { id: 4, type: "dispute_resolved", case: "#2847", time: "1 day ago" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-slate-600 mt-1">HOMEase AI Platform Management</p>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="w-4 h-4 mr-1" />
            System Healthy
          </Badge>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-amber-600" />
                <span className="text-2xl font-bold text-slate-900">{metrics.totalUsers.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Active Contractors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-2xl font-bold text-slate-900">{metrics.activeContractors}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="text-2xl font-bold text-slate-900">${metrics.monthlyRevenue.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-amber-600" />
                <span className="text-2xl font-bold text-slate-900">{metrics.conversionRate}%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Avg Lead Price</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-amber-600" />
                <span className="text-2xl font-bold text-slate-900">${metrics.avgLeadPrice}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-orange-600" />
                <span className="text-2xl font-bold text-slate-900">{metrics.pendingApprovals}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="contractors">Contractors</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="financials">Financials</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest platform events and transactions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {activity.type === "contractor_signup" && <Users className="w-4 h-4 text-blue-600" />}
                        {activity.type === "lead_purchased" && <DollarSign className="w-4 h-4 text-green-600" />}
                        {activity.type === "assessment_completed" && <CheckCircle className="w-4 h-4 text-amber-600" />}
                        {activity.type === "dispute_resolved" && <AlertTriangle className="w-4 h-4 text-orange-600" />}
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            {activity.type === "contractor_signup" && `New contractor: ${activity.contractor}`}
                            {activity.type === "lead_purchased" && `Lead purchased by ${activity.contractor}`}
                            {activity.type === "assessment_completed" && `Assessment by ${activity.homeowner}`}
                            {activity.type === "dispute_resolved" && `Dispute resolved: ${activity.case}`}
                          </p>
                          <p className="text-xs text-slate-500">{activity.time}</p>
                        </div>
                      </div>
                      {activity.amount && (
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          ${activity.amount}
                        </Badge>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* System Health */}
              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                  <CardDescription>Platform performance and status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">API Response Time</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      142ms
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Database Health</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      Optimal
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Payment Processing</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">AR Service</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      Running
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contractors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contractor Management</CardTitle>
                <CardDescription>Manage contractor applications and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Pending Approvals */}
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold text-slate-900 mb-3">
                      Pending Approvals ({metrics.pendingApprovals})
                    </h3>
                    <div className="space-y-3">
                      {[
                        {
                          name: "Accessible Living Solutions",
                          location: "Dallas, TX",
                          rating: 4.8,
                          experience: "8 years",
                        },
                        { name: "Senior Safe Homes", location: "Houston, TX", rating: 4.6, experience: "12 years" },
                        { name: "Mobility Masters", location: "Austin, TX", rating: 4.9, experience: "6 years" },
                      ].map((contractor, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div>
                              <p className="font-medium text-slate-900">{contractor.name}</p>
                              <div className="flex items-center space-x-2 text-sm text-slate-600">
                                <MapPin className="w-3 h-3" />
                                <span>{contractor.location}</span>
                                <Star className="w-3 h-3 text-amber-500" />
                                <span>{contractor.rating}</span>
                                <span>• {contractor.experience}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              Review
                            </Button>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 border-red-200 bg-transparent">
                              Reject
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leads" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Lead Quality Control</CardTitle>
                <CardDescription>Monitor lead generation and conversion metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">847</p>
                    <p className="text-sm text-slate-600">Leads Generated Today</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">623</p>
                    <p className="text-sm text-slate-600">Leads Purchased</p>
                  </div>
                  <div className="text-center p-4 bg-amber-50 rounded-lg">
                    <p className="text-2xl font-bold text-amber-600">73.6%</p>
                    <p className="text-sm text-slate-600">Purchase Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financials" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Financial Overview</CardTitle>
                <CardDescription>Revenue tracking and financial metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">$89,420</p>
                    <p className="text-sm text-slate-600">This Month</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">$267,840</p>
                    <p className="text-sm text-slate-600">This Quarter</p>
                  </div>
                  <div className="text-center p-4 bg-amber-50 rounded-lg">
                    <p className="text-2xl font-bold text-amber-600">$1,024,560</p>
                    <p className="text-sm text-slate-600">This Year</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">$87</p>
                    <p className="text-sm text-slate-600">Avg Lead Value</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>Configure platform parameters and policies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-900">Lead Pricing</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Base Lead Price</span>
                        <span className="font-medium">$40</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Urgent Lead Multiplier</span>
                        <span className="font-medium">2.5x</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Premium Location Multiplier</span>
                        <span className="font-medium">1.8x</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-900">Quality Thresholds</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Min Contractor Rating</span>
                        <span className="font-medium">4.0</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Lead Expiry (hours)</span>
                        <span className="font-medium">72</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Max Leads per Contractor</span>
                        <span className="font-medium">25</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
