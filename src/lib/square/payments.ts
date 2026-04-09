/**
 * Square Payment Integration
 *
 * Handles credit card processing via Square Connect API.
 * Transaction fees: 2.6% + $0.10 per in-person transaction
 *
 * For more info: https://developer.squareup.com/docs/payments-api/overview
 */

import { Client, Environment, ApiError } from "square";
import { randomUUID } from "crypto";

const squareClient = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN!,
  environment: process.env.SQUARE_ENVIRONMENT === "production"
    ? Environment.Production
    : Environment.Sandbox,
});

export interface PaymentInput {
  amountCents: number;
  currency?: string;
  sourceId: string; // Card nonce from Square SDK
  customerId?: string;
  note?: string;
}

export interface PaymentOutput {
  success: boolean;
  transactionId?: string;
  error?: string;
  feeCents?: number;
  netCents?: number;
}

/**
 * Process a card payment via Square
 *
 * Fee structure: 2.6% + $0.10 per transaction
 */
export async function processPayment(input: PaymentInput): Promise<PaymentOutput> {
  const { amountCents, currency = "USD", sourceId, customerId, note } = input;

  // Calculate fee (2.6% + $0.10)
  const feeCents = Math.round(amountCents * 0.026 + 10);
  const netCents = amountCents - feeCents;

  try {
    const idempotencyKey = randomUUID();

    const response = await squareClient.paymentsApi.createPayment({
      sourceId,
      idempotencyKey,
      amountMoney: {
        amount: BigInt(amountCents),
        currency,
      },
      customerId,
      note: note ?? `Farmers Market Sale - ${new Date().toLocaleDateString()}`,
      locationId: process.env.SQUARE_LOCATION_ID,
    });

    if (response.result.payment) {
      return {
        success: true,
        transactionId: response.result.payment.id ?? undefined,
        feeCents,
        netCents,
      };
    }

    return {
      success: false,
      error: "Payment processing failed - no payment returned",
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.errors?.[0]?.detail ?? "Payment failed",
      };
    }
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}

/**
 * Refund a payment via Square
 */
export async function refundPayment(
  transactionId: string,
  amountCents: number,
  reason?: string
): Promise<{ success: boolean; refundId?: string; error?: string }> {
  try {
    const idempotencyKey = randomUUID();

    const response = await squareClient.refundsApi.refundPayment({
      idempotencyKey,
      paymentId: transactionId,
      amountMoney: {
        amount: BigInt(amountCents),
        currency: "USD",
      },
      reason,
    });

    if (response.result.refund) {
      return {
        success: true,
        refundId: response.result.refund.id ?? undefined,
      };
    }

    return {
      success: false,
      error: "Refund processing failed",
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.errors?.[0]?.detail ?? "Refund failed",
      };
    }
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}

/**
 * Calculate fee for a given amount
 */
export function calculateFee(amountCents: number): {
  feeCents: number;
  netCents: number;
  feePercentage: number;
} {
  const feeCents = Math.round(amountCents * 0.026 + 10);
  const netCents = amountCents - feeCents;

  return {
    feeCents,
    netCents,
    feePercentage: 2.6,
  };
}

/**
 * Verify Square webhook signature
 */
export function verifyWebhookSignature(
  body: string,
  signature: string,
  signatureKey: string
): boolean {
  // In production, verify HMAC-SHA256 signature
  // For now, return true for development
  return process.env.NODE_ENV === "development";
}
