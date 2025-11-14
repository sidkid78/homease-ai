import { type NextRequest, NextResponse } from "next/server"

// Confirm payment and complete lead purchase
export async function POST(request: NextRequest) {
  try {
    const { paymentIntentId, leadId, contractorId } = await request.json()

    // Retrieve payment intent from Stripe (simulated)
    const paymentIntent = await retrieveStripePaymentIntent(paymentIntentId)

    if (!paymentIntent) {
      return NextResponse.json({ success: false, error: "Payment intent not found" }, { status: 404 })
    }

    if (paymentIntent.status !== "succeeded") {
      return NextResponse.json({ success: false, error: "Payment not completed" }, { status: 400 })
    }

    // Update lead status to assigned
    const updatedLead = await assignLeadToContractor(leadId, contractorId)

    // Create purchase record
    const purchase = await createPurchaseRecord({
      leadId,
      contractorId,
      paymentIntentId,
      amount: paymentIntent.amount / 100, // Convert from cents
      status: "completed",
    })

    // Send notifications
    await sendPurchaseConfirmation(contractorId, leadId)
    await notifyHomeownerOfAssignment(updatedLead.homeownerId, contractorId)

    // Update contractor metrics
    await updateContractorPurchaseMetrics(contractorId)

    console.log("[v0] Payment confirmed and lead assigned:", {
      paymentIntentId,
      leadId,
      contractorId,
      amount: paymentIntent.amount / 100,
    })

    return NextResponse.json({
      success: true,
      lead: updatedLead,
      purchase,
      message: "Payment successful! Lead has been assigned to you.",
    })
  } catch (error) {
    console.error("[v0] Payment confirmation error:", error)
    return NextResponse.json({ success: false, error: "Failed to confirm payment" }, { status: 500 })
  }
}

async function retrieveStripePaymentIntent(paymentIntentId: string): Promise<any> {
  // Mock Stripe Payment Intent retrieval
  console.log("[v0] Retrieving payment intent:", paymentIntentId)

  return {
    id: paymentIntentId,
    status: "succeeded",
    amount: 8500, // $85.00 in cents
    currency: "usd",
    metadata: {
      leadId: "lead_123",
      contractorId: "contractor_456",
    },
  }
}

async function assignLeadToContractor(leadId: string, contractorId: string): Promise<any> {
  console.log("[v0] Assigning lead to contractor:", { leadId, contractorId })

  return {
    id: leadId,
    status: "assigned",
    contractorId,
    homeownerId: "homeowner_123",
    assignedAt: new Date().toISOString(),
  }
}

async function createPurchaseRecord(purchaseData: any): Promise<any> {
  console.log("[v0] Creating purchase record:", purchaseData)

  return {
    id: `purchase_${Date.now()}`,
    ...purchaseData,
    createdAt: new Date().toISOString(),
  }
}

async function sendPurchaseConfirmation(contractorId: string, leadId: string): Promise<void> {
  console.log("[v0] Sending purchase confirmation:", { contractorId, leadId })
}

async function notifyHomeownerOfAssignment(homeownerId: string, contractorId: string): Promise<void> {
  console.log("[v0] Notifying homeowner of contractor assignment:", { homeownerId, contractorId })
}

async function updateContractorPurchaseMetrics(contractorId: string): Promise<void> {
  console.log("[v0] Updating contractor purchase metrics:", contractorId)
}
