import { type NextRequest, NextResponse } from "next/server"

interface Lead {
  id: string
  leadType: string
  status: string
  price: number
  homeownerId: string
  expiresAt: string
  contractorId?: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { leadId, contractorId, paymentMethodId } = body

    // Validate required fields
    if (!leadId || !contractorId || !paymentMethodId) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Get lead details
    const lead = await getLeadById(leadId)
    if (!lead) {
      return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 })
    }

    if (lead.status !== "open") {
      return NextResponse.json({ success: false, error: "Lead no longer available" }, { status: 400 })
    }

    // Check expiration
    if (new Date(lead.expiresAt) < new Date()) {
      return NextResponse.json({ success: false, error: "Lead has expired" }, { status: 400 })
    }

    // Process payment
    console.log("[v0] Processing payment:", { amount: lead.price })
    const paymentIntentId = `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Update lead status
    console.log("[v0] Updating lead status:", { status: "assigned" })
    const updatedLead = {
      ...lead,
      status: "assigned",
      contractorId,
    }

    // Create purchase record
    console.log("[v0] Creating lead purchase record:", {
      amountPaid: lead.price,
      paymentIntentId,
      paymentStatus: "completed",
    })

    const purchase = {
      id: `purchase_${Date.now()}`,
      leadId,
      contractorId,
      amountPaid: lead.price,
      paymentIntentId,
      paymentStatus: "completed",
      createdAt: new Date().toISOString(),
    }

    // Notify homeowner
    console.log("[v0] Notifying homeowner:", { homeownerId: lead.homeownerId })

    console.log("[v0] Lead purchased successfully:", { amount: lead.price })

    return NextResponse.json({
      success: true,
      lead: updatedLead,
      purchase,
      message: "Lead purchased successfully",
    })
  } catch (error) {
    console.error("[v0] Lead purchase error:", error)
    return NextResponse.json({ success: false, error: "Failed to purchase lead" }, { status: 500 })
  }
}

async function getLeadById(leadId: string): Promise<Lead | null> {
  // Mock lead data
  return {
    id: leadId,
    leadType: "bathroom_modification",
    status: "open",
    price: 85,
    homeownerId: "homeowner_123",
    expiresAt: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
  }
}
