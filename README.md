# FarmVend - Farmers Market Vendor Management System

A comprehensive, Apple-style web application for farmers market vendors to manage inventory, process payments, and analyze sales.

![FarmVend](https://via.placeholder.com/1200x630/22c55e/ffffff?text=FarmVend)

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

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Backend**: Next.js API Routes, Supabase Edge Functions
- **Database**: Supabase PostgreSQL with Row Level Security
- **Storage**: Supabase Storage (for inventory photos)
- **Payments**: Square Connect API
- **Styling**: Tailwind CSS with custom design system

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Square developer account (for payment processing)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd farmers-market
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SQUARE_ACCESS_TOKEN=your_square_access_token
SQUARE_ENVIRONMENT=sandbox
SQUARE_LOCATION_ID=your_square_location_id
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

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
│   ├── layout/             # Layout components
│   └── ...                 # Feature components
├── lib/                    # Utilities & integrations
│   ├── supabase/           # Supabase client
│   ├── square/             # Square SDK wrapper
│   └── pricing/            # Pricing engine
└── types/                  # TypeScript definitions
```

## Database Schema

The system uses the following core tables:
- `vendors` - Vendor business profiles
- `products` - Product catalog with PLU codes
- `plu_reference` - Standardized PLU code database
- `market_days` - Market day sessions
- `inventory_snapshots` - Opening/closing inventory
- `sales_transactions` - All sales transactions
- `daily_reconciliations` - End-of-day summaries
- `wholesale_orders` - Non-market day bulk sales

## Design System

The app uses an Apple-inspired design with a light green color palette:

- **Primary Green**: #22c55e
- **Background**: #fafafa
- **Card Background**: rgba(255, 255, 255, 0.72) with backdrop blur
- **Shadows**: Soft, layered shadows for depth
- **Typography**: System font stack (-apple-system, SF Pro, etc.)

## API Routes

### Products
- `GET /api/products` - List vendor products
- `POST /api/products` - Create product
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

## License

MIT
