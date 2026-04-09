import type {
  Product,
  PriceBaseline,
  VendorPricingRule,
  PricingStrategy,
  SourceType,
} from "@/types/database";

/**
 * Pricing Engine
 *
 * Calculates suggested prices based on:
 * 1. Competitor baselines (Target, Whole Foods, etc.)
 * 2. Vendor pricing rules (discount %, markup %, custom prices)
 * 3. Product specialty status
 */

export interface PricingInput {
  product: Product;
  baselines: PriceBaseline[];
  rule: VendorPricingRule | null;
}

export interface PricingOutput {
  suggestedPriceCents: number;
  competitorPriceCents: number | null;
  source: SourceType | null;
  strategy: PricingStrategy;
  isSpecialty: boolean;
}

/**
 * Get the lowest competitor price from baselines
 */
export function getLowestCompetitorPrice(
  baselines: PriceBaseline[]
): { price: number; source: SourceType } | null {
  const competitorSources: SourceType[] = ["target", "whole_foods", "trader_joes"];

  const competitorPrices = baselines.filter((b) =>
    competitorSources.includes(b.source)
  );

  if (competitorPrices.length === 0) return null;

  const lowest = competitorPrices.reduce((min, current) =>
    current.price_cents < min.price_cents ? current : min
  );

  return { price: lowest.price_cents, source: lowest.source };
}

/**
 * Calculate suggested price based on pricing rule
 */
export function calculatePrice(input: PricingInput): PricingOutput {
  const { product, baselines, rule } = input;

  // Default strategy if no rule exists
  const strategy = rule?.pricing_strategy ?? "competitor_minus_pct";
  const discountPct = rule?.competitor_discount_pct ?? 7; // Default 7% below
  const specialtyMarkupPct = rule?.specialty_markup_pct ?? 25; // Default 25% premium

  // Get lowest competitor price
  const competitorInfo = getLowestCompetitorPrice(baselines);
  const competitorPrice = competitorInfo?.price ?? null;

  let suggestedPrice: number;

  switch (strategy) {
    case "fixed":
      // Use custom price from rule
      suggestedPrice = rule?.custom_price_cents ?? competitorPrice ?? 0;
      break;

    case "specialty_premium":
      // Specialty items get premium pricing
      if (competitorPrice !== null) {
        suggestedPrice = competitorPrice * (1 + specialtyMarkupPct / 100);
      } else {
        suggestedPrice = rule?.custom_price_cents ?? 0;
      }
      break;

    case "competitor_minus_pct":
    default:
      if (competitorPrice !== null) {
        suggestedPrice = competitorPrice * (1 - discountPct / 100);
        // Apply specialty markup if applicable
        if (product.is_specialty) {
          suggestedPrice = suggestedPrice * (1 + specialtyMarkupPct / 100);
        }
      } else {
        // Fall back to MSRP or manual price
        const msrpBaseline = baselines.find((b) => b.source === "msrp");
        suggestedPrice = msrpBaseline?.price_cents ?? rule?.custom_price_cents ?? 0;
      }
      break;
  }

  // Apply min/max constraints from rule
  if (rule && rule.min_price_cents !== null && suggestedPrice < rule.min_price_cents) {
    suggestedPrice = rule.min_price_cents;
  }
  if (rule && rule.max_price_cents !== null && suggestedPrice > rule.max_price_cents) {
    suggestedPrice = rule.max_price_cents;
  }

  return {
    suggestedPriceCents: Math.round(suggestedPrice),
    competitorPriceCents: competitorPrice,
    source: competitorInfo?.source ?? null,
    strategy,
    isSpecialty: product.is_specialty,
  };
}

/**
 * Batch calculate prices for multiple products
 */
export function calculateBatchPrices(
  products: PricingInput[]
): Map<string, PricingOutput> {
  const results = new Map<string, PricingOutput>();

  for (const input of products) {
    results.set(input.product.id, calculatePrice(input));
  }

  return results;
}

/**
 * Format price for display
 */
export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}
