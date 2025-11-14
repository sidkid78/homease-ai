import { type NextRequest, NextResponse } from "next/server"

// Lead generation from AR assessment
export async function POST(request: NextRequest) {
  try {
    const { assessmentId, homeownerId, assessmentData, homeInfo } = await request.json()

    // Generate lead from assessment data
    const lead = {
      id: generateLeadId(),
      assessmentId,
      homeownerId,
      leadType: determineLeadType(assessmentData.roomScanned, assessmentData.hazardsDetected),
      description: generateLeadDescription(assessmentData, homeInfo),
      estimatedBudgetMin: assessmentData.estimatedBudget.min,
      estimatedBudgetMax: assessmentData.estimatedBudget.max,
      urgencyLevel: determineUrgencyLevel(assessmentData.urgencyScore, homeInfo.urgencyLevel),
      status: "open",
      leadScore: calculateLeadScore(assessmentData, homeInfo),
      location: extractLocation(homeInfo.address),
      hazards: assessmentData.hazardsDetected,
      recommendations: assessmentData.recommendations,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
    }

    // Calculate lead price based on score and urgency
    const leadPrice = calculateLeadPrice(lead.leadScore, lead.urgencyLevel, lead.estimatedBudgetMax)

    // Find matching contractors
    const matchingContractors = await findMatchingContractors(lead)

    // Store lead in database (simulated)
    console.log("[v0] Generated lead:", lead)
    console.log("[v0] Lead price:", leadPrice)
    console.log("[v0] Matching contractors:", matchingContractors.length)

    return NextResponse.json({
      success: true,
      lead: { ...lead, price: leadPrice },
      matchingContractors: matchingContractors.length,
    })
  } catch (error) {
    console.error("[v0] Lead generation error:", error)
    return NextResponse.json({ success: false, error: "Failed to generate lead" }, { status: 500 })
  }
}

function generateLeadId(): string {
  return `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

function determineLeadType(roomScanned: string, hazards: string[]): string {
  const typeMap: Record<string, string> = {
    bathroom: "bathroom_modification",
    bedroom: "bedroom_safety",
    kitchen: "kitchen_modification",
    "living-room": "living_room_safety",
    hallway: "hallway_safety",
    entryway: "entrance_modification",
    stairs: "stair_safety",
  }

  // Check for specific modifications based on hazards
  if (hazards.some((h) => h.toLowerCase().includes("grab bar"))) {
    return "grab_bar_installation"
  }
  if (hazards.some((h) => h.toLowerCase().includes("ramp") || h.toLowerCase().includes("step"))) {
    return "ramp_installation"
  }
  if (hazards.some((h) => h.toLowerCase().includes("stair") || h.toLowerCase().includes("lift"))) {
    return "stair_lift_installation"
  }

  return typeMap[roomScanned] || "general_modification"
}

function generateLeadDescription(assessmentData: any, homeInfo: any): string {
  const room = assessmentData.roomScanned
  const hazards = assessmentData.hazardsDetected
  const recommendations = assessmentData.recommendations

  let description = `${room.charAt(0).toUpperCase() + room.slice(1)} safety modification needed. `

  if (hazards.length > 0) {
    description += `Issues identified: ${hazards.slice(0, 3).join(", ")}. `
  }

  if (recommendations.length > 0) {
    description += `Recommended solutions: ${recommendations.slice(0, 2).join(", ")}. `
  }

  if (homeInfo.mobilityNeeds && homeInfo.mobilityNeeds.length > 0) {
    description += `Special considerations: ${homeInfo.mobilityNeeds.join(", ")}. `
  }

  description += `Urgency level: ${homeInfo.urgencyLevel}.`

  return description
}

function determineUrgencyLevel(urgencyScore: number, userUrgencyLevel: string): string {
  // Combine AI urgency score with user-reported urgency
  const urgencyMap: Record<string, number> = {
    low: 1,
    medium: 2,
    high: 3,
    urgent: 4,
  }

  const userScore = urgencyMap[userUrgencyLevel] || 2
  const aiScore = Math.ceil(urgencyScore / 25) // Convert 0-100 to 1-4

  const combinedScore = Math.max(userScore, aiScore)

  if (combinedScore >= 4) return "urgent"
  if (combinedScore >= 3) return "high"
  if (combinedScore >= 2) return "medium"
  return "low"
}

function calculateLeadScore(assessmentData: any, homeInfo: any): number {
  let score = 50 // Base score

  // Urgency factor
  const urgencyMultiplier = {
    low: 0.8,
    medium: 1.0,
    high: 1.2,
    urgent: 1.4,
  }
  score *= urgencyMultiplier[homeInfo.urgencyLevel as keyof typeof urgencyMultiplier] || 1.0

  // Budget factor (higher budget = higher score)
  if (assessmentData.estimatedBudget.max > 5000) score += 20
  else if (assessmentData.estimatedBudget.max > 2000) score += 10
  else if (assessmentData.estimatedBudget.max > 1000) score += 5

  // Hazard count factor
  score += Math.min(assessmentData.hazardsDetected.length * 5, 20)

  // Mobility needs factor
  if (homeInfo.mobilityNeeds && homeInfo.mobilityNeeds.length > 0) {
    score += homeInfo.mobilityNeeds.length * 3
  }

  return Math.min(Math.round(score), 100)
}

function calculateLeadPrice(leadScore: number, urgencyLevel: string, maxBudget: number): number {
  let basePrice = 40 // Base price

  // Score multiplier
  if (leadScore >= 90) basePrice *= 2.5
  else if (leadScore >= 80) basePrice *= 2.0
  else if (leadScore >= 70) basePrice *= 1.5
  else if (leadScore >= 60) basePrice *= 1.2

  // Urgency multiplier
  const urgencyMultiplier = {
    low: 1.0,
    medium: 1.2,
    high: 1.5,
    urgent: 2.0,
  }
  basePrice *= urgencyMultiplier[urgencyLevel as keyof typeof urgencyMultiplier] || 1.0

  // Budget factor
  if (maxBudget > 5000) basePrice *= 1.3
  else if (maxBudget > 2000) basePrice *= 1.1

  return Math.round(basePrice)
}

function extractLocation(address: string): string {
  // Extract city and state from address
  const parts = address.split(",")
  if (parts.length >= 2) {
    return `${parts[parts.length - 2].trim()}, ${parts[parts.length - 1].trim()}`
  }
  return address
}

async function findMatchingContractors(lead: any): Promise<any[]> {
  // Mock contractor matching logic
  // In real implementation, this would query the database
  const mockContractors = [
    {
      id: "contractor_1",
      businessName: "Mike's Accessibility Solutions",
      specializations: ["grab_bars", "bathroom_modifications", "ramps"],
      serviceAreas: ["Austin", "Round Rock", "Cedar Park"],
      rating: 4.8,
      responseTime: "2.3 hours",
    },
    {
      id: "contractor_2",
      businessName: "SafeHome Renovations",
      specializations: ["wheelchair_access", "doorway_widening", "flooring"],
      serviceAreas: ["Houston", "Sugar Land", "Katy"],
      rating: 4.9,
      responseTime: "1.8 hours",
    },
    {
      id: "contractor_3",
      businessName: "Universal Design Pro",
      specializations: ["stair_lifts", "lighting", "universal_design"],
      serviceAreas: ["Dallas", "Plano", "Richardson"],
      rating: 4.7,
      responseTime: "3.1 hours",
    },
  ]

  // Filter contractors based on location and specialization
  const matchingContractors = mockContractors.filter((contractor) => {
    // Check if contractor serves the lead location
    const leadCity = lead.location.split(",")[0].trim()
    const servesLocation = contractor.serviceAreas.some((area) => area.toLowerCase().includes(leadCity.toLowerCase()))

    // Check if contractor has relevant specializations
    const hasSpecialization = contractor.specializations.some((spec) =>
      lead.leadType.toLowerCase().includes(spec.replace("_", " ")),
    )

    return servesLocation && hasSpecialization
  })

  return matchingContractors
}
