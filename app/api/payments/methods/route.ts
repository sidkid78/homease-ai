import { type NextRequest, NextResponse } from "next/server"

// Get contractor's payment methods
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const contractorId = searchParams.get("contractorId")

    if (!contractorId) {
      return NextResponse.json({ success: false, error: "Contractor ID required" }, { status: 400 })
    }

    // Get contractor's Stripe customer ID
    const contractor = await getContractorById(contractorId)
    if (!contractor?.stripeCustomerId) {
      return NextResponse.json({ success: false, error: "No payment methods found" }, { status: 404 })
    }

    // Retrieve payment methods from Stripe (simulated)
    const paymentMethods = await getStripePaymentMethods(contractor.stripeCustomerId)

    return NextResponse.json({
      success: true,
      paymentMethods,
    })
  } catch (error) {
    console.error("[v0] Payment methods retrieval error:", error)
    return NextResponse.json({ success: false, error: "Failed to retrieve payment methods" }, { status: 500 })
  }
}

// Add new payment method
export async function POST(request: NextRequest) {
  try {
    const { contractorId, paymentMethodId } = await request.json()

    // Get contractor
    const contractor = await getContractorById(contractorId)
    if (!contractor) {
      return NextResponse.json({ success: false, error: "Contractor not found" }, { status: 404 })
    }

    // Attach payment method to customer (simulated)
    const attachedPaymentMethod = await attachPaymentMethodToCustomer(paymentMethodId, contractor.stripeCustomerId)

    console.log("[v0] Payment method added:", { contractorId, paymentMethodId })

    return NextResponse.json({
      success: true,
      paymentMethod: attachedPaymentMethod,
      message: "Payment method added successfully",
    })
  } catch (error) {
    console.error("[v0] Payment method addition error:", error)
    return NextResponse.json({ success: false, error: "Failed to add payment method" }, { status: 500 })
  }
}

async function getContractorById(contractorId: string): Promise<any> {
  // Mock contractor retrieval
  return {
    id: contractorId,
    businessName: "Mike's Accessibility Solutions",
    stripeCustomerId: "cus_mock_customer_id",
  }
}

async function getStripePaymentMethods(customerId: string): Promise<any[]> {
  // Mock Stripe payment methods retrieval
  console.log("[v0] Retrieving payment methods for customer:", customerId)

  return [
    {
      id: "pm_mock_card_1",
      type: "card",
      card: {
        brand: "visa",
        last4: "4242",
        exp_month: 12,
        exp_year: 2025,
      },
      created: Date.now() / 1000,
    },
    {
      id: "pm_mock_card_2",
      type: "card",
      card: {
        brand: "mastercard",
        last4: "5555",
        exp_month: 8,
        exp_year: 2026,
      },
      created: Date.now() / 1000,
    },
  ]
}

async function attachPaymentMethodToCustomer(paymentMethodId: string, customerId: string): Promise<any> {
  // Mock payment method attachment
  console.log("[v0] Attaching payment method to customer:", { paymentMethodId, customerId })

  return {
    id: paymentMethodId,
    type: "card",
    card: {
      brand: "visa",
      last4: "1234",
      exp_month: 10,
      exp_year: 2027,
    },
  }
}
