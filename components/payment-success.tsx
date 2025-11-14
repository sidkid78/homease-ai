"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, MessageSquare, Calendar, Download } from "lucide-react"

interface PaymentSuccessProps {
  paymentData: any
  leadData: any
  onContinue: () => void
}

export function PaymentSuccess({ paymentData, leadData, onContinue }: PaymentSuccessProps) {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <CardTitle className="text-2xl text-green-900">Payment Successful!</CardTitle>
        <CardDescription>Your lead has been purchased and assigned to you</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Payment Summary */}
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-green-900">Purchase Summary</h3>
            <Badge variant="default" className="bg-green-600">
              Completed
            </Badge>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-green-700">Lead Type:</span>
              <span className="font-medium text-green-900">{leadData.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">Location:</span>
              <span className="font-medium text-green-900">{leadData.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">Lead Score:</span>
              <span className="font-medium text-green-900">{leadData.leadScore}/100</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">Amount Paid:</span>
              <span className="font-medium text-green-900">${leadData.price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">Transaction ID:</span>
              <span className="font-medium text-green-900 font-mono text-xs">
                {paymentData.purchase?.id || "TXN_123456789"}
              </span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="space-y-4">
          <h3 className="font-semibold">What happens next?</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <MessageSquare className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">Contact the Homeowner</p>
                <p className="text-xs text-blue-700">
                  The homeowner has been notified of your assignment. You can now message them directly.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
              <Calendar className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-900">Schedule Assessment</p>
                <p className="text-xs text-amber-700">
                  Reach out within 24 hours to schedule an in-home assessment for best results.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
              <Download className="h-5 w-5 text-purple-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-purple-900">Access Lead Details</p>
                <p className="text-xs text-purple-700">
                  Full assessment report and homeowner contact information are now available.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={onContinue} className="flex-1">
            <MessageSquare className="mr-2 h-4 w-4" />
            Contact Homeowner
          </Button>
          <Button variant="outline" className="flex-1 bg-transparent">
            <Download className="mr-2 h-4 w-4" />
            Download Receipt
          </Button>
        </div>

        {/* Support */}
        <div className="text-center pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            Need help? Contact our support team at{" "}
            <a href="mailto:support@homeease.ai" className="text-primary hover:underline">
              support@homeease.ai
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
