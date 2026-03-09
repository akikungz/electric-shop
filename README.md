# Electric Shop

Electric Shop is a full-stack e-commerce app built with Next.js App Router and TypeScript.

It includes:
- Product browsing (home, categories, search)
- Product details with quantity-based cart actions
- Auth (register, login, session, logout)
- Profile management (address, phone, payment methods)
- Cart + checkout with multiple payment methods
- Payment callback simulation flow
- Order confirmation, tracking, and order history
- TH/EN locale toggle and theme toggle

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- SQLite (`node:sqlite`, local file DB)
- Tailwind CSS v4
- shadcn/ui + Radix-based components
- Biome for linting/formatting

## Getting Started

## 1. Install dependencies

```bash
pnpm install
```

## 2. Run development server

```bash
pnpm dev
```

Open `http://localhost:3000`.

## 3. Lint and format

```bash
pnpm lint
pnpm format
```

## Scripts

- `pnpm dev` - Run local dev server
- `pnpm build` - Build production app
- `pnpm start` - Start production server
- `pnpm lint` - Run Biome checks
- `pnpm format` - Format source with Biome

## Data and Persistence

- SQLite database file: `data/electric-shop.db`
- Schema and bootstrap: `src/server/shared/sqlite.ts`
- Product seed source: `src/data/products.ts`
- Current seed catalog size: 29 products

Database bootstrap auto-creates tables and seeds products using `INSERT OR IGNORE`.

## Key Features

## Storefront

- Home page product grid with loading/empty states and load-more pagination
- Categories list and category-specific product pages
- Search with query string (`/search?q=...`) and no-result state
- Product image fallback handling for broken/missing image URLs

## Cart and Checkout

- Add/update/remove cart items with stock capping
- Guest cart in local storage
- Authenticated cart persisted in DB via API
- Checkout payment methods:
	- Credit card
	- Debit card
	- QR code
	- Cash on delivery (COD)

## Orders and Payment Flow

- Authenticated order creation
- User-owned order history (`/order`)
- Order confirmation (`/order/:id/confirmation`)
- Order tracking (`/order/:id/tracking`)
- Payment callback simulation page (`/payment/process`) for non-COD methods
- Callback endpoint updates payment/order status and handles failure restock

## Account and Profile

- Register/login/logout + session cookie
- Profile edit (name, phone, email, address)
- Payment methods add/remove in profile
- Links to cart and orders from profile

## API Overview

Base path: `src/app/api/v1`

## Auth

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/me`
- `PATCH /api/v1/auth/profile`

## Products

- `GET /api/v1/products`
- `GET /api/v1/products/:id`

## Cart

- `GET /api/v1/cart` (auth required)
- `PUT /api/v1/cart` (auth required)

## Orders

- `POST /api/v1/orders` (auth required)
- `GET /api/v1/orders` (auth required)
- `GET /api/v1/orders/:id` (auth required, owner only)

## Payments

- `POST /api/v1/payments/callback` (auth required, owner only)

## Health

- `GET /api/v1/health`

## Project Structure

```text
src/
	app/
		api/v1/                # Route handlers
		categories/            # Category pages
		checkout/              # Checkout UI
		order/                 # Order list/confirmation/tracking
		payment/process/       # Payment callback simulation UI
		product/[id]/          # Product detail page
		profile/               # Profile management
		search/                # Search page
	components/              # Reusable UI components
	context/                 # Shop provider (state + actions)
	data/                    # Product seed data
	server/                  # Domain/application/infrastructure layers
	types/                   # Shared domain types
```

## Notes

- Session cookie is `httpOnly` and uses `secure` in production.
- This project currently simulates payment callback behavior for card/QR flows.
- PRD reference is available in `prd.md`.
