"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Shield } from "lucide-react"
import Link from "next/link"
import { HomeownerRegistration } from "@/components/homeowner-registration"
import { ContractorRegistration } from "@/components/contractor-registration"

function RegistrationContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get("type")

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">HOMEase AI</span>
          </Link>
        </div>

        {type === "homeowner" && <HomeownerRegistration />}
        {type === "contractor" && <ContractorRegistration />}

        {!type && (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Choose Registration Type</h1>
            <div className="space-y-4">
              <Link
                href="/register?type=homeowner"
                className="block p-4 border rounded-lg hover:bg-accent transition-colors"
              >
                <h3 className="font-semibold">Register as Homeowner</h3>
                <p className="text-sm text-muted-foreground">Get safety assessments and connect with contractors</p>
              </Link>
              <Link
                href="/register?type=contractor"
                className="block p-4 border rounded-lg hover:bg-accent transition-colors"
              >
                <h3 className="font-semibold">Register as Contractor</h3>
                <p className="text-sm text-muted-foreground">Access high-quality leads and grow your business</p>
              </Link>
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link href="/login" className="text-sm text-muted-foreground hover:text-primary">
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegistrationContent />
    </Suspense>
  )
}
