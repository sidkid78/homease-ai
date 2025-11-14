"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, AlertTriangle, DollarSign, Clock, Users, ArrowRight, RotateCcw } from "lucide-react"

interface AssessmentResultsProps {
  assessmentData: any
  homeInfo: any
  onStartOver: () => void
}

export function AssessmentResults({ assessmentData, homeInfo, onStartOver }: AssessmentResultsProps) {
  const [showContractors, setShowContractors] = useState(false)

  const getUrgencyColor = (score: number) => {
    if (score >= 80) return "destructive"
    if (score >= 60) return "secondary"
    if (score >= 40) return "default"
    return "outline"
  }

  const getUrgencyText = (score: number) => {
    if (score >= 80) return "High Priority"
    if (score >= 60) return "Medium Priority"
    if (score >= 40) return "Low Priority"
    return "Future Planning"
  }

  return (
    <div className="space-y-6">
      {/* Results Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Assessment Results</CardTitle>
              <CardDescription>
                {assessmentData.roomScanned.charAt(0).toUpperCase() + assessmentData.roomScanned.slice(1)} Safety
                Analysis
              </CardDescription>
            </div>
            <Badge variant={getUrgencyColor(assessmentData.urgencyScore)} className="text-sm">
              {getUrgencyText(assessmentData.urgencyScore)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-amber-50 rounded-lg border border-amber-200">
              <AlertTriangle className="h-8 w-8 text-amber-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-amber-900">{assessmentData.hazardsDetected.length}</div>
              <div className="text-sm text-amber-700">Hazards Found</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <CheckCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-900">{assessmentData.recommendations.length}</div>
              <div className="text-sm text-blue-700">Recommendations</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-900">
                ${assessmentData.estimatedBudget.min.toLocaleString()}-$
                {assessmentData.estimatedBudget.max.toLocaleString()}
              </div>
              <div className="text-sm text-green-700">Estimated Cost</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hazards Detected */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
            Safety Hazards Detected
          </CardTitle>
          <CardDescription>These areas need attention to improve safety and accessibility.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {assessmentData.hazardsDetected.map((hazard: string, index: number) => (
              <div key={index} className="flex items-start p-4 bg-amber-50 rounded-lg border border-amber-200">
                <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-amber-900">{hazard}</div>
                  <div className="text-sm text-amber-700 mt-1">
                    This could pose a safety risk, especially for individuals with mobility concerns.
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            Recommended Modifications
          </CardTitle>
          <CardDescription>Professional solutions to address the identified safety concerns.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {assessmentData.recommendations.map((recommendation: string, index: number) => (
              <div key={index} className="flex items-start p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-green-900">{recommendation}</div>
                  <div className="text-sm text-green-700 mt-1">
                    This modification will improve safety and accessibility in your {assessmentData.roomScanned}.
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Ready to Get Started?</CardTitle>
          <CardDescription>
            Connect with qualified contractors who specialize in aging-in-place modifications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-primary mr-3" />
                <div>
                  <div className="font-medium">Get Matched with Contractors</div>
                  <div className="text-sm text-muted-foreground">
                    We'll connect you with 3-5 qualified professionals in your area
                  </div>
                </div>
              </div>
              <Button>
                Find Contractors
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <Separator />

            <div className="flex gap-4">
              <Button variant="outline" onClick={onStartOver} className="flex-1 bg-transparent">
                <RotateCcw className="mr-2 h-4 w-4" />
                Scan Another Room
              </Button>
              <Button className="flex-1">
                <Clock className="mr-2 h-4 w-4" />
                Schedule Consultation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
