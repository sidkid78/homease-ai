"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Lock } from "lucide-react"

interface PaymentFormProps {
  leadData: any
  onPaymentSuccess: (result: any) => void
  onPaymentError: (error: string) => void
}

export function PaymentForm({ leadData, onPaymentSuccess, onPaymentError }: PaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("new")
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  })
  const [billingAddress, setBillingAddress] = useState({
    line1: "",
    city: "",
    state: "",
    postal_code: "",
  })
  const [saveCard, setSaveCard] = useState(false)

  // Mock saved payment methods
  const savedPaymentMethods = [
    {
      id: "pm_1",
      brand: "visa",
      last4: "4242",
      exp_month: 12,
      exp_year: 2025,
    },
    {
      id: "pm_2",
      brand: "mastercard",
      last4: "5555",
      exp_month: 8,
      exp_year: 2026,
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Create payment intent
      const intentResponse = await fetch("/api/payments/create-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId: leadData.id,
          contractorId: "contractor_123", // Would come from auth context
          amount: leadData.price,
        }),
      })

      const intentData = await intentResponse.json()
      if (!intentData.success) {
        throw new Error(intentData.error)
      }

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Confirm payment
      const confirmResponse = await fetch("/api/payments/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentIntentId: intentData.paymentIntentId,
          leadId: leadData.id,
          contractorId: "contractor_123",
        }),
      })

      const confirmData = await confirmResponse.json()
      if (!confirmData.success) {
        throw new Error(confirmData.error)
      }

      onPaymentSuccess(confirmData)
    } catch (error) {
      console.error("[v0] Payment error:", error)
      onPaymentError(error instanceof Error ? error.message : "Payment failed")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCard className="mr-2 h-5 w-5" />
          Purchase Lead
        </CardTitle>
        <CardDescription>Complete your payment to access this lead</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Lead Summary */}
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">{leadData.type}</h3>
              <Badge variant="secondary">Score: {leadData.leadScore}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{leadData.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{leadData.location}</span>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">${leadData.price}</div>
                <div className="text-xs text-muted-foreground">Lead price</div>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-4">
            <Label>Payment Method</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="new-card"
                  name="payment-method"
                  value="new"
                  checked={paymentMethod === "new"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <Label htmlFor="new-card">New Credit Card</Label>
              </div>

              {savedPaymentMethods.map((method) => (
                <div key={method.id} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={method.id}
                    name="payment-method"
                    value={method.id}
                    checked={paymentMethod === method.id}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <Label htmlFor={method.id} className="flex items-center space-x-2">
                    <CreditCard className="h-4 w-4" />
                    <span>
                      {method.brand.toUpperCase()} •••• {method.last4} ({method.exp_month}/{method.exp_year})
                    </span>
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* New Card Form */}
          {paymentMethod === "new" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input
                  id="card-number"
                  placeholder="1234 5678 9012 3456"
                  value={cardData.number}
                  onChange={(e) => setCardData((prev) => ({ ...prev, number: e.target.value }))}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={cardData.expiry}
                    onChange={(e) => setCardData((prev) => ({ ...prev, expiry: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    id="cvc"
                    placeholder="123"
                    value={cardData.cvc}
                    onChange={(e) => setCardData((prev) => ({ ...prev, cvc: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="card-name">Cardholder Name</Label>
                <Input
                  id="card-name"
                  placeholder="John Doe"
                  value={cardData.name}
                  onChange={(e) => setCardData((prev) => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              {/* Billing Address */}
              <div className="space-y-4">
                <Label>Billing Address</Label>
                <div className="space-y-3">
                  <Input
                    placeholder="Address Line 1"
                    value={billingAddress.line1}
                    onChange={(e) => setBillingAddress((prev) => ({ ...prev, line1: e.target.value }))}
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="City"
                      value={billingAddress.city}
                      onChange={(e) => setBillingAddress((prev) => ({ ...prev, city: e.target.value }))}
                      required
                    />
                    <Select
                      value={billingAddress.state}
                      onValueChange={(value) => setBillingAddress((prev) => ({ ...prev, state: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="State" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="TX">Texas</SelectItem>
                        <SelectItem value="FL">Florida</SelectItem>
                        <SelectItem value="CA">California</SelectItem>
                        <SelectItem value="NY">New York</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Input
                    placeholder="ZIP Code"
                    value={billingAddress.postal_code}
                    onChange={(e) => setBillingAddress((prev) => ({ ...prev, postal_code: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="save-card"
                  checked={saveCard}
                  onCheckedChange={(checked) => setSaveCard(checked as boolean)}
                />
                <Label htmlFor="save-card" className="text-sm">
                  Save this card for future purchases
                </Label>
              </div>
            </div>
          )}

          {/* Security Notice */}
          <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
            <Lock className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-900">Secure Payment</p>
              <p className="text-xs text-green-700">
                Your payment information is encrypted and secure. We use industry-standard security measures.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Processing Payment...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-4 w-4" />
                Pay ${leadData.price} - Purchase Lead
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
