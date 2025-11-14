"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, TrendingDown, DollarSign, Users, Clock, Target } from "lucide-react"

export function LeadAnalytics() {
  // Mock analytics data
  const leadMetrics = {
    totalLeads: 156,
    activeLeads: 23,
    convertedLeads: 89,
    conversionRate: 57.1,
    averageLeadValue: 2850,
    totalRevenue: 253650,
    averageTimeToConversion: 4.2,
  }

  const leadsByStatus = [
    { status: "Open", count: 23, color: "#3b82f6" },
    { status: "Assigned", count: 18, color: "#f59e0b" },
    { status: "Contacted", count: 12, color: "#8b5cf6" },
    { status: "Quoted", count: 8, color: "#06b6d4" },
    { status: "Won", count: 89, color: "#10b981" },
    { status: "Lost", count: 6, color: "#ef4444" },
  ]

  const leadsByType = [
    { type: "Bathroom Modification", count: 45, revenue: 112500 },
    { type: "Grab Bar Installation", count: 38, revenue: 30400 },
    { type: "Ramp Installation", count: 28, revenue: 84000 },
    { type: "Stair Lift Installation", count: 15, revenue: 120000 },
    { type: "Kitchen Modification", count: 18, revenue: 54000 },
    { type: "General Safety", count: 12, revenue: 24000 },
  ]

  const monthlyTrends = [
    { month: "Jan", leads: 18, conversions: 12, revenue: 34200 },
    { month: "Feb", leads: 22, conversions: 14, revenue: 39900 },
    { month: "Mar", leads: 28, conversions: 16, revenue: 45600 },
    { month: "Apr", leads: 31, conversions: 19, revenue: 54150 },
    { month: "May", leads: 35, conversions: 21, revenue: 59850 },
    { month: "Jun", leads: 22, conversions: 7, revenue: 19950 },
  ]

  const urgencyDistribution = [
    { urgency: "Low", count: 28, percentage: 18 },
    { urgency: "Medium", count: 62, percentage: 40 },
    { urgency: "High", count: 51, percentage: 33 },
    { urgency: "Urgent", count: 15, percentage: 9 },
  ]

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leadMetrics.totalLeads}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leadMetrics.conversionRate}%</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +3.2% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${leadMetrics.totalRevenue.toLocaleString()}</div>
            <div className="flex items-center text-xs text-red-600">
              <TrendingDown className="h-3 w-3 mr-1" />
              -8% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Time to Convert</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leadMetrics.averageTimeToConversion} days</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              15% faster
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Status Distribution</CardTitle>
            <CardDescription>Current status of all leads in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leadsByStatus.map((item) => (
                <div key={item.status} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm font-medium">{item.status}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{item.count}</span>
                    <Badge variant="outline">{((item.count / leadMetrics.totalLeads) * 100).toFixed(1)}%</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Lead Trends</CardTitle>
            <CardDescription>Lead generation and conversion trends over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="leads" fill="#3b82f6" name="Total Leads" />
                <Bar dataKey="conversions" fill="#10b981" name="Conversions" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Lead Types Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Lead Types Performance</CardTitle>
          <CardDescription>Performance breakdown by modification type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leadsByType.map((type) => (
              <div key={type.type} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{type.type}</span>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{type.count} leads</span>
                    <span>${type.revenue.toLocaleString()}</span>
                  </div>
                </div>
                <Progress value={(type.count / leadMetrics.totalLeads) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Urgency Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Lead Urgency Distribution</CardTitle>
          <CardDescription>Breakdown of leads by urgency level</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {urgencyDistribution.map((item) => (
              <div key={item.urgency} className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">{item.count}</div>
                <div className="text-sm text-muted-foreground">{item.urgency} Priority</div>
                <div className="text-xs text-muted-foreground mt-1">{item.percentage}% of total</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
