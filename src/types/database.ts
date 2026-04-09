// Database types for Farmers Market Vendor Management System

export type WeekDay = "saturday" | "sunday";
export type UnitType = "lb" | "bunch" | "each" | "pint" | "dozen" | "quart" | "gallon";
export type DayType = "market" | "wholesale";
export type SnapshotType = "opening" | "closing";
export type SourceType = "target" | "whole_foods" | "trader_joes" | "manual" | "msrp" | "upc_database";
export type PricingStrategy = "competitor_minus_pct" | "fixed" | "specialty_premium";
export type TransactionType = "card" | "cash";
export type CustomerType = "grocery" | "restaurant" | "individual";
export type OrderStatus = "pending" | "delivered" | "paid";

export interface Vendor {
  id: string;
  user_id: string;
  business_name: string;
  contact_email: string;
  contact_phone: string | null;
  logo_url: string | null;
  primary_market_day: WeekDay;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  vendor_id: string;
  name: string;
  description: string | null;
  plu_code: string | null;
  category: string | null;
  unit_type: UnitType;
  is_specialty: boolean;
  is_active: boolean;
  photo_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface PLUReference {
  code: string;
  name: string;
  category: string;
  typical_unit: string | null;
  is_organic: boolean;
  keywords: string[];
}

export interface MarketDay {
  id: string;
  vendor_id: string;
  date: string;
  day_type: DayType;
  location: string | null;
  notes: string | null;
  weather_conditions: string | null;
  created_at: string;
}

export interface InventorySnapshot {
  id: string;
  market_day_id: string;
  product_id: string;
  snapshot_type: SnapshotType;
  quantity: number;
  unit_type: UnitType;
  photo_url: string | null;
  photo_taken_at: string | null;
  notes: string | null;
  created_at: string;
}

export interface PriceBaseline {
  id: string;
  product_id: string;
  source: SourceType;
  price_cents: number;
  unit_type: UnitType;
  collected_at: string;
  is_verified: boolean;
}

export interface VendorPricingRule {
  id: string;
  vendor_id: string;
  product_id: string;
  pricing_strategy: PricingStrategy;
  competitor_discount_pct: number;
  specialty_markup_pct: number;
  custom_price_cents: number | null;
  min_price_cents: number | null;
  max_price_cents: number | null;
  is_active: boolean;
}

export interface SalesTransaction {
  id: string;
  market_day_id: string;
  product_id: string;
  transaction_type: TransactionType;
  square_transaction_id: string | null;
  quantity: number;
  unit_price_cents: number;
  unit_type: UnitType;
  subtotal_cents: number;
  fee_cents: number;
  net_cents: number;
  recorded_at: string;
}

export interface DailyReconciliation {
  id: string;
  market_day_id: string;
  total_sales_cents: number;
  total_card_cents: number;
  total_cash_cents: number;
  total_fees_cents: number;
  total_units_sold: number;
  opening_inventory_value_cents: number | null;
  closing_inventory_value_cents: number | null;
  waste_units: number;
  notes: string | null;
}

export interface WholesaleOrder {
  id: string;
  vendor_id: string;
  customer_name: string;
  customer_type: CustomerType | null;
  order_date: string;
  items: WholesaleOrderItem[];
  subtotal_cents: number;
  delivery_fee_cents: number;
  total_cents: number;
  status: OrderStatus;
}

export interface WholesaleOrderItem {
  product_id: string;
  product_name: string;
  quantity: number;
  unit_type: UnitType;
  unit_price_cents: number;
  subtotal_cents: number;
}

// Extended types with relations
export interface MarketDayWithInventory extends MarketDay {
  inventory_snapshots: InventorySnapshot[];
  sales_transactions: SalesTransaction[];
  reconciliation: DailyReconciliation | null;
}

export interface ProductWithPricing extends Product {
  price_baselines: PriceBaseline[];
  pricing_rule: VendorPricingRule | null;
  suggested_price_cents: number | null;
}

// Analytics types
export interface DailySalesReport {
  market_day_id: string;
  date: string;
  total_sales_cents: number;
  total_units_sold: number;
  total_card_sales_cents: number;
  total_cash_sales_cents: number;
  total_fees_cents: number;
  top_products: { product_id: string; product_name: string; units_sold: number; revenue_cents: number }[];
  insights: string[];
}

export interface MonthlySummary {
  month: string;
  year: number;
  total_revenue_cents: number;
  total_units_sold: number;
  market_days_count: number;
  average_daily_revenue_cents: number;
  top_products: { product_id: string; product_name: string; units_sold: number; revenue_cents: number }[];
}
