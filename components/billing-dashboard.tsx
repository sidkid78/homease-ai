"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Download, Search, Calendar, DollarSign, Receipt } from "lucide-react"

export function BillingDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  // Mock billing data
  const billingStats = {
    totalSpent: 1250,
    leadsThisMonth: 15,
    averageLeadCost: 83,
    conversionRate: 67,
  }

  const transactions = [
    {
      id: "txn_001",
      date: "2024-01-20",
      description: "Bathroom Modification Lead - Austin, TX",
      amount: 85,
      status: "completed",
      leadId: "lead_001",
      leadStatus: "won",
    },
    {
      id: "txn_002",
      date: "2024-01-18",
      description: "Ramp Installation Lead - Round Rock, TX",
      amount: 120,
      status: "completed",
      leadId: "lead_002",
      leadStatus: "quoted",
    },
    {
      id: "txn_003",
      date: "2024-01-15",
      description: "Grab Bar Installation Lead - Cedar Park, TX",
      amount: 65,
      status: "completed",
      leadId: "lead_003",
      leadStatus: "won",
    },
    {
      id: "txn_004",
      date: "2024-01-12",
      description: "Stair Lift Installation Lead - Austin, TX",
      amount: 150,
      status: "completed",
      leadId: "lead_004",
      leadStatus: "lost",
    },
    {
      id: "txn_005",
      date: "2024-01-10",
      description: "Kitchen Modification Lead - Houston, TX",
      amount: 95,
      status: "completed",
      leadId: "lead_005",
      leadStatus: "won",
    },
  ]

  const paymentMethods = [
    {
      id: "pm_1",
      type: "card",
      brand: "visa",
      last4: "4242",
      exp_month: 12,
      exp_year: 2025,
      isDefault: true,
    },
    {
      id: "pm_2",
      type: "card",
      brand: "mastercard",
      last4: "5555",
      exp_month: 8,
      exp_year: 2026,
      isDefault: false,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "won":
        return "default"
      case "quoted":
        return "secondary"
      case "lost":
        return "destructive"
      default:
        return "outline"
    }
  }

  const filteredTransactions = transactions.filter((transaction) => {
    if (searchTerm && !transaction.description.toLowerCase().includes(searchTerm.toLowerCase())) return false
    if (statusFilter !== "all" && transaction.leadStatus !== statusFilter) return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Billing Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${billingStats.totalSpent}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leads Purchased</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{billingStats.leadsThisMonth}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Cost per Lead</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${billingStats.averageLeadCost}</div>
            <p className="text-xs text-muted-foreground">Average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{billingStats.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">Conversion rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your saved payment methods</CardDescription>
            </div>
            <Button variant="outline">
              <CreditCard className="mr-2 h-4 w-4" />
              Add New Card
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">
                      {method.brand.toUpperCase()} •••• {method.last4}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Expires {method.exp_month}/{method.exp_year}
                    </p>
                  </div>
                  {method.isDefault && <Badge variant="secondary">Default</Badge>}
                </div>
                <div className="flex items-center space-x-2">
                  {!method.isDefault && (
                    <Button variant="outline" size="sm">
                      Set Default
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>Your lead purchase history and receipts</CardDescription>
            </div>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="won">Won</SelectItem>
                <SelectItem value="quoted">Quoted</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Transactions List */}
          <div className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    <p className="font-medium">{transaction.description}</p>
                    <Badge variant={getStatusColor(transaction.leadStatus)}>
                      {transaction.leadStatus.charAt(0).toUpperCase() + transaction.leadStatus.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{transaction.date}</span>
                    <span>ID: {transaction.id}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium">${transaction.amount}</p>
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
