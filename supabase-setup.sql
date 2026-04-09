-- FarmVend Database Setup Script
-- Run this in Supabase SQL Editor to initialize the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ENUMS
-- ============================================

CREATE TYPE week_day_enum AS ENUM ('saturday', 'sunday');
CREATE TYPE unit_type_enum AS ENUM ('lb', 'bunch', 'each', 'pint', 'dozen', 'quart', 'gallon');
CREATE TYPE day_type_enum AS ENUM ('market', 'wholesale');
CREATE TYPE snapshot_type_enum AS ENUM ('opening', 'closing');
CREATE TYPE source_enum AS ENUM ('target', 'whole_foods', 'trader_joes', 'manual', 'msrp', 'upc_database');
CREATE TYPE pricing_strategy_enum AS ENUM ('competitor_minus_pct', 'fixed', 'specialty_premium');
CREATE TYPE transaction_type_enum AS ENUM ('card', 'cash');
CREATE TYPE customer_type_enum AS ENUM ('grocery', 'restaurant', 'individual');
CREATE TYPE order_status_enum AS ENUM ('pending', 'delivered', 'paid');

-- ============================================
-- TABLES
-- ============================================

-- Vendors table
CREATE TABLE vendors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  logo_url TEXT,
  primary_market_day week_day_enum DEFAULT 'saturday',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  plu_code CHAR(5),
  category TEXT,
  unit_type unit_type_enum NOT NULL DEFAULT 'lb',
  is_specialty BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PLU Reference table (pre-seeded with common produce codes)
CREATE TABLE plu_reference (
  code CHAR(5) PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  typical_unit TEXT,
  is_organic BOOLEAN DEFAULT FALSE,
  keywords TEXT[]
);

-- Market Days table
CREATE TABLE market_days (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  day_type day_type_enum NOT NULL DEFAULT 'market',
  location TEXT,
  notes TEXT,
  weather_conditions TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(vendor_id, date)
);

-- Inventory Snapshots table
CREATE TABLE inventory_snapshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  market_day_id UUID REFERENCES market_days(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  snapshot_type snapshot_type_enum NOT NULL,
  quantity DECIMAL(10,2) NOT NULL,
  unit_type unit_type_enum NOT NULL,
  photo_url TEXT,
  photo_taken_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Price Baselines table
CREATE TABLE price_baselines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  source source_enum NOT NULL,
  price_cents INTEGER NOT NULL,
  unit_type unit_type_enum NOT NULL,
  collected_at TIMESTAMPTZ DEFAULT NOW(),
  is_verified BOOLEAN DEFAULT FALSE
);

-- Vendor Pricing Rules table
CREATE TABLE vendor_pricing_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  pricing_strategy pricing_strategy_enum NOT NULL DEFAULT 'competitor_minus_pct',
  competitor_discount_pct INTEGER DEFAULT 7,
  specialty_markup_pct INTEGER DEFAULT 25,
  custom_price_cents INTEGER,
  min_price_cents INTEGER,
  max_price_cents INTEGER,
  is_active BOOLEAN DEFAULT TRUE
);

-- Sales Transactions table
CREATE TABLE sales_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  market_day_id UUID REFERENCES market_days(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  transaction_type transaction_type_enum NOT NULL,
  square_transaction_id TEXT,
  quantity DECIMAL(10,2) NOT NULL,
  unit_price_cents INTEGER NOT NULL,
  unit_type unit_type_enum NOT NULL,
  subtotal_cents INTEGER NOT NULL,
  fee_cents INTEGER DEFAULT 0,
  net_cents INTEGER NOT NULL,
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Daily Reconciliations table
CREATE TABLE daily_reconciliations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  market_day_id UUID REFERENCES market_days(id) ON DELETE CASCADE UNIQUE,
  total_sales_cents INTEGER NOT NULL DEFAULT 0,
  total_card_cents INTEGER DEFAULT 0,
  total_cash_cents INTEGER DEFAULT 0,
  total_fees_cents INTEGER DEFAULT 0,
  total_units_sold INTEGER DEFAULT 0,
  opening_inventory_value_cents INTEGER,
  closing_inventory_value_cents INTEGER,
  waste_units INTEGER DEFAULT 0,
  notes TEXT
);

-- Wholesale Orders table
CREATE TABLE wholesale_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_type customer_type_enum,
  order_date DATE NOT NULL,
  items JSONB NOT NULL DEFAULT '[]',
  subtotal_cents INTEGER NOT NULL,
  delivery_fee_cents INTEGER DEFAULT 0,
  total_cents INTEGER NOT NULL,
  status order_status_enum DEFAULT 'pending'
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_products_vendor ON products(vendor_id, is_active);
CREATE INDEX idx_products_plu ON products(plu_code) WHERE plu_code IS NOT NULL;
CREATE INDEX idx_inventory_snapshots_market_day ON inventory_snapshots(market_day_id, product_id);
CREATE INDEX idx_sales_transactions_market_day ON sales_transactions(market_day_id);
CREATE INDEX idx_sales_transactions_product ON sales_transactions(product_id);
CREATE INDEX idx_market_days_vendor_date ON market_days(vendor_id, date DESC);
CREATE INDEX idx_wholesale_orders_vendor ON wholesale_orders(vendor_id, order_date DESC);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_baselines ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_pricing_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_reconciliations ENABLE ROW LEVEL SECURITY;
ALTER TABLE wholesale_orders ENABLE ROW LEVEL SECURITY;

-- Vendors: Users can only see/edit their own vendor record
CREATE POLICY "Users can view own vendor" ON vendors
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert own vendor" ON vendors
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own vendor" ON vendors
  FOR UPDATE USING (user_id = auth.uid());

-- Products: Vendors can only access their own products
CREATE POLICY "Vendors can access own products" ON products
  FOR ALL USING (vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid()));

-- Market Days: Vendors can only access their own market days
CREATE POLICY "Vendors can access own market days" ON market_days
  FOR ALL USING (vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid()));

-- Inventory: Access through market day ownership
CREATE POLICY "Vendors can access own inventory" ON inventory_snapshots
  FOR ALL USING (
    market_day_id IN (SELECT id FROM market_days WHERE vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid()))
  );

-- Sales: Access through market day ownership
CREATE POLICY "Vendors can access own sales" ON sales_transactions
  FOR ALL USING (
    market_day_id IN (SELECT id FROM market_days WHERE vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid()))
  );

-- Reconciliations: Access through market day ownership
CREATE POLICY "Vendors can access own reconciliations" ON daily_reconciliations
  FOR ALL USING (
    market_day_id IN (SELECT id FROM market_days WHERE vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid()))
  );

-- Price Baselines: Access through product ownership
CREATE POLICY "Vendors can access own price baselines" ON price_baselines
  FOR ALL USING (
    product_id IN (SELECT id FROM products WHERE vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid()))
  );

-- Pricing Rules: Access through product ownership
CREATE POLICY "Vendors can access own pricing rules" ON vendor_pricing_rules
  FOR ALL USING (
    vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid())
  );

-- Wholesale: Vendors can only access their own orders
CREATE POLICY "Vendors can access own wholesale orders" ON wholesale_orders
  FOR ALL USING (vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid()));

-- ============================================
-- PLU REFERENCE DATA (Pre-seeded)
-- ============================================

INSERT INTO plu_reference (code, name, category, typical_unit, is_organic, keywords) VALUES
-- Tropical Fruits
('4011', 'Bananas', 'Tropical Fruits', 'lb', false, ARRAY['banana', 'yellow', 'tropical']),
('94011', 'Bananas (Organic)', 'Tropical Fruits', 'lb', true, ARRAY['banana', 'organic', 'tropical']),
('4046', 'Avocados', 'Tropical Fruits', 'each', false, ARRAY['avocado', 'hass', 'tropical']),
('4225', 'Apples (Organic)', 'Pome Fruit', 'lb', true, ARRAY['apple', 'organic', 'fruit']),
-- Citrus
('4012', 'Oranges', 'Citrus', 'lb', false, ARRAY['orange', 'citrus', 'fruit']),
('94012', 'Oranges (Organic)', 'Citrus', 'lb', true, ARRAY['orange', 'organic', 'citrus']),
('4015', 'Lemons', 'Citrus', 'lb', false, ARRAY['lemon', 'citrus']),
('4952', 'Limes', 'Citrus', 'lb', false, ARRAY['lime', 'citrus']),
-- Stone Fruit
('4065', 'Peaches', 'Stone Fruit', 'lb', false, ARRAY['peach', 'stone fruit', 'summer']),
('4404', 'Peaches (Organic)', 'Stone Fruit', 'lb', true, ARRAY['peach', 'organic', 'stone fruit']),
('4042', 'Plums', 'Stone Fruit', 'lb', false, ARRAY['plum', 'stone fruit']),
('3082', 'Cherries', 'Stone Fruit', 'lb', false, ARRAY['cherry', 'stone fruit', 'summer']),
-- Berries
('4078', 'Strawberries', 'Berries', 'pint', false, ARRAY['strawberry', 'berries']),
('84078', 'Strawberries (Organic)', 'Berries', 'pint', true, ARRAY['strawberry', 'organic']),
('4026', 'Blueberries', 'Berries', 'pint', false, ARRAY['blueberry', 'berries']),
('4504', 'Raspberries', 'Berries', 'pint', false, ARRAY['raspberry', 'berries']),
('4456', 'Blackberries', 'Berries', 'pint', false, ARRAY['blackberry', 'berries']),
-- Grapes
('4023', 'Grapes (Red)', 'Vines', 'lb', false, ARRAY['grape', 'red', 'fruit']),
('4022', 'Grapes (White)', 'Vines', 'lb', false, ARRAY['grape', 'white', 'fruit']),
('4055', 'Grapes (Organic)', 'Vines', 'lb', true, ARRAY['grape', 'organic']),
-- Melons
('4031', 'Cantaloupe', 'Melons', 'each', false, ARRAY['cantaloupe', 'melon']),
('4050', 'Watermelon', 'Melons', 'each', false, ARRAY['watermelon', 'melon']),
('4036', 'Honeydew', 'Melons', 'each', false, ARRAY['honeydew', 'melon']),
-- Leafy Greens
('4064', 'Lettuce (Romaine)', 'Leafy Greens', 'head', false, ARRAY['lettuce', 'romaine']),
('4083', 'Baby Spinach', 'Leafy Greens', 'bunch', false, ARRAY['spinach', 'baby', 'greens']),
('4090', 'Kale', 'Leafy Greens', 'bunch', false, ARRAY['kale', 'greens']),
('4224', 'Arugula', 'Leafy Greens', 'bunch', false, ARRAY['arugula', 'greens', 'rocket']),
-- Vegetables
('4075', 'Tomatoes (Heirloom)', 'Nightshades', 'lb', false, ARRAY['tomato', 'heirloom']),
('4664', 'Sweet Corn', 'Vegetables', 'each', false, ARRAY['corn', 'sweet', 'vegetable']),
('4072', 'Cucumbers', 'Vegetables', 'each', false, ARRAY['cucumber', 'vegetable']),
('4067', 'Carrots', 'Root Vegetables', 'bunch', false, ARRAY['carrot', 'root']),
('4127', 'Potatoes (Russet)', 'Root Vegetables', 'lb', false, ARRAY['potato', 'russet', 'root']),
('4081', 'Onions (Yellow)', 'Alliums', 'lb', false, ARRAY['onion', 'yellow', 'allium']),
('4663', 'Garlic', 'Alliums', 'head', false, ARRAY['garlic', 'allium']),
-- Herbs
('4881', 'Basil', 'Herbs', 'bunch', false, ARRAY['basil', 'herb']),
('4069', 'Cilantro', 'Herbs', 'bunch', false, ARRAY['cilantro', 'herb']),
('4599', 'Parsley', 'Herbs', 'bunch', false, ARRAY['parsley', 'herb']),
('4074', 'Mint', 'Herbs', 'bunch', false, ARRAY['mint', 'herb']),
-- Eggs
('4115', 'Eggs (Large)', 'Eggs', 'dozen', false, ARRAY['egg', 'dozen']),
('4124', 'Eggs (Organic)', 'Eggs', 'dozen', true, ARRAY['egg', 'organic']),
-- Honey
('4442', 'Honey (Raw)', 'Honey', 'jar', false, ARRAY['honey', 'raw']);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to auto-create vendor record when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.vendors (user_id, business_name, contact_email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'business_name', 'My Farm'),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create vendor on user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_vendors_updated_at
  BEFORE UPDATE ON vendors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- STORAGE BUCKETS
-- ============================================

-- Create storage bucket for inventory photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('inventory-photos', 'inventory-photos', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- GRANT PERMISSIONS
-- ============================================

GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Storage permissions
GRANT ALL ON storage.objects TO anon;
GRANT ALL ON storage.objects TO authenticated;
