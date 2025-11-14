"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Camera, Scan, CheckCircle, AlertTriangle, ArrowLeft, ArrowRight } from "lucide-react"

interface ARScannerProps {
  homeInfo: any
  onComplete: (data: any) => void
  onBack: () => void
}

export function ARScanner({ homeInfo, onComplete, onBack }: ARScannerProps) {
  const [scanProgress, setScanProgress] = useState(0)
  const [isScanning, setIsScanning] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)
  const [detectedHazards, setDetectedHazards] = useState<string[]>([])

  // Simulate AR scanning process
  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setScanComplete(true)
            // Simulate hazard detection based on room type
            const hazards = generateMockHazards(homeInfo.roomToScan)
            setDetectedHazards(hazards)
            return 100
          }
          return prev + 2
        })
      }, 100)

      return () => clearInterval(interval)
    }
  }, [isScanning, homeInfo.roomToScan])

  const generateMockHazards = (room: string) => {
    const hazardsByRoom: Record<string, string[]> = {
      bathroom: ["No grab bars near toilet", "Slippery shower floor", "Poor lighting", "High step into shower"],
      bedroom: ["Low lighting", "Loose carpet edges", "High bed height", "Narrow walkways"],
      kitchen: ["High cabinet storage", "Slippery floor", "Poor counter lighting", "Hard-to-reach items"],
      "living-room": ["Loose rugs", "Low seating", "Poor lighting", "Cluttered walkways"],
      hallway: ["Narrow width", "Poor lighting", "No handrails", "Uneven flooring"],
      entryway: ["High threshold", "No handrail", "Poor lighting", "Slippery surface"],
      stairs: ["No handrails", "Poor lighting", "Uneven steps", "No contrast marking"],
    }
    return hazardsByRoom[room] || ["General safety concerns detected"]
  }

  const startScan = () => {
    setIsScanning(true)
    setScanProgress(0)
    setScanComplete(false)
  }

  const handleComplete = () => {
    const assessmentData = {
      roomScanned: homeInfo.roomToScan,
      hazardsDetected: detectedHazards,
      scanData: {
        measurements: { width: 72, height: 96, depth: 84 },
        lightingLevel: "poor",
        obstacles: ["step", "narrow_space"],
        surfaceTypes: ["tile", "carpet"],
      },
      recommendations: generateRecommendations(detectedHazards),
      urgencyScore: calculateUrgencyScore(detectedHazards, homeInfo.urgencyLevel),
      estimatedBudget: calculateBudgetRange(detectedHazards),
    }
    onComplete(assessmentData)
  }

  const generateRecommendations = (hazards: string[]) => {
    const recommendations: string[] = []
    hazards.forEach((hazard) => {
      if (hazard.includes("grab bars")) recommendations.push("Install grab bars near toilet and shower")
      if (hazard.includes("lighting")) recommendations.push("Improve lighting with LED fixtures")
      if (hazard.includes("slippery")) recommendations.push("Add non-slip surfaces or mats")
      if (hazard.includes("step")) recommendations.push("Install ramp or reduce step height")
      if (hazard.includes("narrow")) recommendations.push("Widen doorways or clear pathways")
      if (hazard.includes("handrail")) recommendations.push("Install handrails for support")
    })
    return recommendations.length > 0 ? recommendations : ["General safety improvements recommended"]
  }

  const calculateUrgencyScore = (hazards: string[], urgencyLevel: string) => {
    const baseScore = hazards.length * 10
    const urgencyMultiplier = {
      low: 0.5,
      medium: 0.75,
      high: 1.0,
      urgent: 1.25,
    }
    return Math.min(
      Math.round(baseScore * (urgencyMultiplier[urgencyLevel as keyof typeof urgencyMultiplier] || 1)),
      100,
    )
  }

  const calculateBudgetRange = (hazards: string[]) => {
    const baseCost = hazards.length * 300
    return {
      min: Math.max(baseCost, 500),
      max: baseCost * 3,
    }
  }

  if (!isScanning && !scanComplete) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
            <Camera className="h-6 w-6 text-secondary" />
          </div>
          <CardTitle className="text-2xl">AR Room Scanner</CardTitle>
          <CardDescription>
            We'll use your device's camera to scan your {homeInfo.roomToScan} and identify potential safety hazards.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted rounded-lg p-6 text-center">
            <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">
              Position your device to capture the entire {homeInfo.roomToScan}. Our AI will analyze the space for safety
              concerns.
            </p>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Ensure good lighting in the room</p>
              <p>• Hold your device steady while scanning</p>
              <p>• Scan will take approximately 30-60 seconds</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" onClick={onBack} className="flex-1 bg-transparent">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button onClick={startScan} className="flex-1">
              <Scan className="mr-2 h-4 w-4" />
              Start Scanning
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isScanning && !scanComplete) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 animate-pulse">
            <Scan className="h-6 w-6 text-secondary" />
          </div>
          <CardTitle className="text-2xl">Scanning Your {homeInfo.roomToScan}</CardTitle>
          <CardDescription>AI is analyzing your space for safety hazards...</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Progress value={scanProgress} className="h-3" />
            <p className="text-center text-sm text-muted-foreground">
              {scanProgress < 30 && "Capturing room dimensions..."}
              {scanProgress >= 30 && scanProgress < 60 && "Analyzing lighting and surfaces..."}
              {scanProgress >= 60 && scanProgress < 90 && "Detecting potential hazards..."}
              {scanProgress >= 90 && "Generating recommendations..."}
            </p>
          </div>

          <div className="bg-muted rounded-lg p-6">
            <div className="aspect-video bg-background rounded border-2 border-dashed border-border flex items-center justify-center">
              <div className="text-center">
                <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Camera View</p>
                <p className="text-xs text-muted-foreground">Scanning in progress...</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
        <CardTitle className="text-2xl">Scan Complete!</CardTitle>
        <CardDescription>
          We've analyzed your {homeInfo.roomToScan} and detected {detectedHazards.length} potential safety concerns.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h3 className="font-semibold flex items-center">
            <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
            Hazards Detected
          </h3>
          <div className="space-y-2">
            {detectedHazards.map((hazard, index) => (
              <div key={index} className="flex items-center p-3 bg-amber-50 rounded-lg border border-amber-200">
                <AlertTriangle className="h-4 w-4 text-amber-500 mr-3 flex-shrink-0" />
                <span className="text-sm">{hazard}</span>
              </div>
            ))}
          </div>
        </div>

        <Button onClick={handleComplete} className="w-full" size="lg">
          View Detailed Results
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}
