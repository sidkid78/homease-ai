"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ARScanner } from "@/components/ar-scanner"
import { AssessmentResults } from "@/components/assessment-results"
import { HomeInfoForm } from "@/components/home-info-form"

type AssessmentStep = "info" | "scanning" | "results"

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState<AssessmentStep>("info")
  const [assessmentData, setAssessmentData] = useState<any>(null)
  const [homeInfo, setHomeInfo] = useState<any>(null)

  const getStepProgress = () => {
    switch (currentStep) {
      case "info":
        return 33
      case "scanning":
        return 66
      case "results":
        return 100
      default:
        return 0
    }
  }

  const handleInfoComplete = (data: any) => {
    setHomeInfo(data)
    setCurrentStep("scanning")
  }

  const handleScanComplete = (data: any) => {
    setAssessmentData(data)
    setCurrentStep("results")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <div className="text-center">
              <h1 className="text-xl font-semibold text-foreground">Home Safety Assessment</h1>
              <p className="text-sm text-muted-foreground">
                Step {currentStep === "info" ? 1 : currentStep === "scanning" ? 2 : 3} of 3
              </p>
            </div>
            <div className="w-24" /> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="px-4 py-4 bg-card border-b border-border">
        <div className="container mx-auto max-w-2xl">
          <Progress value={getStepProgress()} className="h-2" />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span className={currentStep === "info" ? "text-primary font-medium" : ""}>Home Info</span>
            <span className={currentStep === "scanning" ? "text-primary font-medium" : ""}>AR Scan</span>
            <span className={currentStep === "results" ? "text-primary font-medium" : ""}>Results</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          {currentStep === "info" && <HomeInfoForm onComplete={handleInfoComplete} />}

          {currentStep === "scanning" && (
            <ARScanner homeInfo={homeInfo} onComplete={handleScanComplete} onBack={() => setCurrentStep("info")} />
          )}

          {currentStep === "results" && (
            <AssessmentResults
              assessmentData={assessmentData}
              homeInfo={homeInfo}
              onStartOver={() => {
                setCurrentStep("info")
                setAssessmentData(null)
                setHomeInfo(null)
              }}
            />
          )}
        </div>
      </main>
    </div>
  )
}
