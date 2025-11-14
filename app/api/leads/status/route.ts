import { type NextRequest, NextResponse } from "next/server"

// Update lead status throughout lifecycle
export async function PUT(request: NextRequest) {
  try {
    const { leadId, status, contractorId, notes } = await request.json()

    // Validate status transition
    const validStatuses = ["open", "assigned", "contacted", "quoted", "won", "lost", "expired"]
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ success: false, error: "Invalid status" }, { status: 400 })
    }

    // Get current lead
    const currentLead = await getLeadById(leadId)
    if (!currentLead) {
      return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 })
    }

    // Validate status transition logic
    const isValidTransition = validateStatusTransition(currentLead.status, status)
    if (!isValidTransition) {
      return NextResponse.json(
        { success: false, error: `Cannot transition from ${currentLead.status} to ${status}` },
        { status: 400 },
      )
    }

    // Update lead status
    const updatedLead = await updateLeadWithStatus({
      leadId,
      status,
      contractorId,
      notes,
      updatedAt: new Date().toISOString(),
    })

    // Handle status-specific actions
    await handleStatusActions(updatedLead, status)

    // Update contractor performance metrics
    if (contractorId && (status === "won" || status === "lost")) {
      await updateContractorMetrics(contractorId, status, updatedLead)
    }

    console.log("[v0] Lead status updated:", { leadId, oldStatus: currentLead.status, newStatus: status })

    return NextResponse.json({
      success: true,
      lead: updatedLead,
      message: `Lead status updated to ${status}`,
    })
  } catch (error) {
    console.error("[v0] Lead status update error:", error)
    return NextResponse.json({ success: false, error: "Failed to update lead status" }, { status: 500 })
  }
}

function validateStatusTransition(currentStatus: string, newStatus: string): boolean {
  const validTransitions: Record<string, string[]> = {
    open: ["assigned", "expired"],
    assigned: ["contacted", "lost", "expired"],
    contacted: ["quoted", "lost"],
    quoted: ["won", "lost"],
    won: [], // Terminal state
    lost: [], // Terminal state
    expired: [], // Terminal state
  }

  return validTransitions[currentStatus]?.includes(newStatus) || false
}

async function getLeadById(leadId: string): Promise<any> {
  // Mock lead retrieval
  return {
    id: leadId,
    status: "assigned",
    contractorId: "contractor_123",
    homeownerId: "homeowner_456",
    leadType: "bathroom_modification",
    estimatedBudgetMax: 2500,
  }
}

async function updateLeadWithStatus(updateData: any): Promise<any> {
  // Mock lead update
  console.log("[v0] Updating lead with status:", updateData)

  return {
    id: updateData.leadId,
    status: updateData.status,
    contractorId: updateData.contractorId,
    notes: updateData.notes,
    updatedAt: updateData.updatedAt,
  }
}

async function handleStatusActions(lead: any, status: string): Promise<void> {
  switch (status) {
    case "contacted":
      // Send notification to homeowner that contractor has made contact
      await notifyHomeownerOfContact(lead.homeownerId, lead.contractorId)
      break

    case "quoted":
      // Track quote provided
      await trackQuoteProvided(lead.id, lead.contractorId)
      break

    case "won":
      // Celebrate the win, update revenue tracking
      await trackConversion(lead.id, lead.contractorId, lead.estimatedBudgetMax)
      await sendConversionNotification(lead.contractorId)
      break

    case "lost":
      // Track lost lead for analytics
      await trackLostLead(lead.id, lead.contractorId)
      break

    case "expired":
      // Handle expired lead cleanup
      await handleExpiredLead(lead.id)
      break
  }
}

async function updateContractorMetrics(contractorId: string, status: string, lead: any): Promise<void> {
  console.log("[v0] Updating contractor metrics:", { contractorId, status, leadValue: lead.estimatedBudgetMax })

  // Mock metrics update
  const metrics = {
    totalLeads: 1,
    conversions: status === "won" ? 1 : 0,
    conversionRate: status === "won" ? 100 : 0,
    revenue: status === "won" ? lead.estimatedBudgetMax : 0,
  }

  console.log("[v0] Contractor metrics updated:", metrics)
}

async function notifyHomeownerOfContact(homeownerId: string, contractorId: string): Promise<void> {
  console.log("[v0] Notifying homeowner of contractor contact:", { homeownerId, contractorId })
}

async function trackQuoteProvided(leadId: string, contractorId: string): Promise<void> {
  console.log("[v0] Tracking quote provided:", { leadId, contractorId })
}

async function trackConversion(leadId: string, contractorId: string, revenue: number): Promise<void> {
  console.log("[v0] Tracking conversion:", { leadId, contractorId, revenue })
}

async function sendConversionNotification(contractorId: string): Promise<void> {
  console.log("[v0] Sending conversion notification to contractor:", contractorId)
}

async function trackLostLead(leadId: string, contractorId: string): Promise<void> {
  console.log("[v0] Tracking lost lead:", { leadId, contractorId })
}

async function handleExpiredLead(leadId: string): Promise<void> {
  console.log("[v0] Handling expired lead:", leadId)
}
