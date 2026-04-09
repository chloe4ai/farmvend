# FarmVend - Farmers Market Vendor Management System

A comprehensive, Apple-style web application for farmers market vendors to manage inventory, process payments, and analyze sales.

**Live Demo**: https://farmvend.vercel.app

---

## Features

### 1. Inventory Management
- Track inventory in pounds, units, bunches, pints, dozens, etc.
- Standardized PLU codes for produce identification (4011 for bananas, etc.)
- Photo import for quick inventory updates
- Opening and closing inventory tracking per market day

### 2. Sales & Pricing System
- Daily tracking: opening inventory vs. closing inventory
- Intelligent pricing engine with configurable rules
- Premium pricing for specialty items
- Multi-payment support (card and cash)

### 3. Payment Processing
- Square payment gateway integration
- Credit card processing (2.6% + $0.10 per transaction)
- Cash transaction recording
- Real-time fee transparency

### 4. Analytics & Insights
- Daily sales reports with actionable insights
- Monthly revenue summaries
- Top products analysis
- Wholesale channel management

---

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Backend**: Next.js API Routes, Supabase Edge Functions
- **Database**: Supabase PostgreSQL with Row Level Security
- **Storage**: Supabase Storage (for inventory photos)
- **Payments**: Square Connect API
- **Hosting**: Vercel (recommended) or any Node.js hosting

---

## Deployment Guide

### Prerequisites

1. **Supabase Account** (free): https://supabase.com
2. **Square Developer Account** (free): https://developer.squareup.com
3. **Vercel Account** (free): https://vercel.com

### Step 1: Create Supabase Project

1. Go to https://supabase.com and create a new project
2. Note your **Project URL** and **anon/public key** from Settings > API
3. Go to **SQL Editor** and run the `supabase-setup.sql` file (included in this repo)
4. Enable **Email** auth in Authentication > Providers

### Step 2: Create Square Developer Account

1. Go to https://developer.squareup.com and create an account
2. Create a new application (Sandbox mode for testing)
3. Get your **Access Token** and **Location ID** from the dashboard
4. For production, you'll need to apply for a production account

### Step 3: Deploy to Vercel

1. Fork this repo to your GitHub account
2. Go to https://vercel.com and import the forked repo
3. Add the following environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SQUARE_ACCESS_TOKEN=your_square_access_token
SQUARE_ENVIRONMENT=sandbox
SQUARE_LOCATION_ID=your_square_location_id
```

4. Click Deploy

### Step 4: Configure Custom Domain (Optional)

In Vercel dashboard, go to Settings > Domains to add your custom domain.

---

## Getting Started (Local Development)

```bash
# Clone the repo
git clone https://github.com/chloe4ai/farmvend.git
cd farmvend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase and Square credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Authentication pages
│   ├── (dashboard)/        # Protected dashboard pages
│   │   ├── market-day/     # Market day management
│   │   ├── products/       # Product catalog
│   │   ├── sales/          # Sales tracking
│   │   ├── pricing/        # Pricing rules
│   │   ├── wholesale/      # Wholesale orders
│   │   ├── analytics/      # Reports & insights
│   │   └── settings/       # Account settings
│   └── api/                # API routes
├── components/             # React components
│   ├── ui/                 # Design system (Button, Card, Input...)
│   └── layout/             # Layout components
├── lib/                    # Utilities & integrations
│   ├── supabase/           # Supabase client
│   ├── square/             # Square SDK wrapper
│   └── pricing/            # Pricing engine + PLU codes
└── types/                  # TypeScript definitions
```

---

## Design System

The app uses an Apple-inspired design with a light green color palette:

- **Primary Green**: #22c55e
- **Background**: #fafafa
- **Card Background**: rgba(255, 255, 255, 0.72) with backdrop blur
- **Shadows**: Soft, layered shadows for depth
- **Typography**: System font stack (-apple-system, SF Pro, etc.)

---

## Database Schema

Core tables:
- `vendors` - Vendor business profiles
- `products` - Product catalog with PLU codes
- `plu_reference` - Standardized PLU code database (pre-seeded)
- `market_days` - Market day sessions
- `inventory_snapshots` - Opening/closing inventory
- `sales_transactions` - All sales transactions
- `daily_reconciliations` - End-of-day summaries
- `wholesale_orders` - Non-market day bulk sales
- `price_baselines` - Competitor prices
- `vendor_pricing_rules` - Pricing strategies

All tables have Row Level Security (RLS) enabled for data isolation.

---

## API Routes

### Products
- `GET/POST /api/products` - List/create products
- `GET /api/products/plu/:code` - PLU lookup

### Market Days
- `POST /api/market-days` - Start market day
- `POST /api/inventory/:id/opening` - Record opening inventory
- `POST /api/inventory/:id/closing` - Record closing inventory

### Sales
- `POST /api/sales` - Record transaction
- `POST /api/sales/reconcile/:id` - Generate reconciliation

### Payments (Square)
- `POST /api/payments/square/charge` - Process card payment
- `POST /api/payments/square/refund` - Refund transaction

---

## License

MIT
