# PRD - Electric Shop

## Overview

- Home: Listing of products, prices, cart, click to view product details and add to cart with quantity selector
- Cart: Listing of items in the cart, total price, and checkout button
- Checkout: Payment processing and order confirmation using credit card, debit card, qr code or cash on delivery
- After Checkout: Order confirmation page with order details and option to track order and back to home
- Profile: User profile page with account details and settings with name, phone number, address, payment methods, cart listing and sign out
- About: Contract, address, email address, facebook page and phone number

## UI

- Navbar:
  - Logo: Clickable logo that links to the home page
  - Categories: Clickable categories icon that links to the categories page
    - TV
    - Home Theater
    - Household Appliances
    - IT Accessories
  - Profile: Clickable profile icon that links to the profile page
  - Cart: Clickable cart icon that links to the cart page
  - Search: Clickable search icon that links to the search page
  - Change Language: Clickable language icon that links to the language selection page like TH/EN

## Flow

1. Register to create an account
2. Login to access website
3. Browse products and add to cart
4. Proceed to checkout
5. Confirm order and pay
6. After Checkout: Order confirmation page with order details and option to track order and back to home

---
---

# Product Requirements Document (PRD)

## Electric Shop E-commerce Platform

- **Product Name:** Electric Shop
- **Version:** 1.0
- **Status:** Draft
- **Prepared By:** Product Team
- **Last Updated:** 2026-03-09

---

## 1) Purpose

Build a modern e-commerce web application for electrical products that enables users to discover products, manage a cart, complete checkout via multiple payment options, and track orders after purchase.

---

## 2) Goals & Objectives

### Business Goals
1. Increase online sales of electric/electronics products.
2. Provide a frictionless checkout experience.
3. Support localized Thai/English experience.
4. Improve customer retention with account/profile and order tracking features.

### Product Goals
1. Fast product discovery (category + search).
2. Simple, reliable cart and checkout.
3. Clear order confirmation and post-purchase tracking.
4. Mobile-friendly UX with consistent navigation.

---

## 3) Scope

### In Scope (MVP)
- Account registration and login
- Product listing/home page
- Product detail page
- Add to cart with quantity selector
- Cart management
- Checkout with payment options:
  - Credit Card
  - Debit Card
  - QR Code
  - Cash on Delivery (COD)
- Order confirmation page
- Basic order tracking entry point
- Profile page with:
  - Name
  - Phone number
  - Address
  - Payment methods
  - Cart listing reference
  - Sign out
- About page with contact details
- Navbar navigation + category navigation + language switching (TH/EN)

### Out of Scope (MVP)
- Inventory management back-office
- Promotions/coupons engine
- Product reviews/ratings
- Wishlist
- Returns/refunds workflow
- Advanced shipment tracking integration (carrier-level live events)

---

## 4) Users & Personas

### Primary Users
1. **Guest Visitor**
   - Browses products and categories
   - Must register/login to complete checkout
2. **Registered Shopper**
   - Maintains profile and payment preferences
   - Adds products to cart and completes orders

### Secondary Users
- Customer support staff (view order IDs and contact details externally, outside this app scope)

---

## 5) User Stories

### Authentication
- As a new user, I want to register an account so that I can place orders.
- As a returning user, I want to log in so that I can access my profile and cart.

### Product Discovery
- As a shopper, I want to view products on home page so that I can browse quickly.
- As a shopper, I want to filter by category (TV, Home Theater, Household Appliances, IT Accessories).
- As a shopper, I want to search for products by name/keyword.

### Cart & Checkout
- As a shopper, I want to add items with quantity so that I can buy multiple units.
- As a shopper, I want to update/remove cart items.
- As a shopper, I want to see cart totals before checkout.
- As a shopper, I want to select my preferred payment method.
- As a shopper, I want order confirmation after successful payment.

### Post-Purchase
- As a shopper, I want to see order details after checkout.
- As a shopper, I want to track my order status.
- As a shopper, I want to return to home quickly after order completion.

### Account & Info
- As a user, I want to manage profile information and saved payment methods.
- As a user, I want to switch language between TH and EN.
- As a user, I want to view About/contact information.

---

## 6) Functional Requirements

## 6.1 Authentication

### FR-AUTH-1 Register
- System shall allow users to create account with:
  - Name
  - Phone number
  - Email (optional if phone-first auth is chosen; define one primary unique identifier)
  - Password
- Validation:
  - Required fields must not be empty
  - Phone format must be valid
  - Password policy (minimum 8 chars recommended)

### FR-AUTH-2 Login
- System shall allow login using phone/email + password.
- Invalid credentials shall show clear error message.

### FR-AUTH-3 Session
- Authenticated session persists securely until logout/expiry.
- Logout available from profile.

---

## 6.2 Home / Product Listing

### FR-HOME-1 Product List
- Show products with:
  - Product image
  - Product name
  - Price
  - Add to cart action
- Clicking product opens product detail page.

### FR-HOME-2 Pagination/Loading
- Product list supports pagination or lazy loading.
- Display loading and empty states.

---

## 6.3 Category Navigation

### FR-CAT-1 Categories
- Categories available in navbar:
  - TV
  - Home Theater
  - Household Appliances
  - IT Accessories
- Clicking category shows filtered product listing.

---

## 6.4 Product Detail

### FR-PDP-1 Product Info
- Show detailed product information:
  - Name
  - Price
  - Description
  - Images
  - Availability (in stock/out of stock)

### FR-PDP-2 Add to Cart
- Quantity selector supports increment/decrement and manual input.
- Prevent adding quantity beyond available stock (if stock is tracked in frontend response).

---

## 6.5 Cart

### FR-CART-1 Cart Listing
- Display all cart items with:
  - Product image/name
  - Unit price
  - Quantity control
  - Line total
- Allow remove item.

### FR-CART-2 Cart Calculation
- Display subtotal and total payable (shipping/tax handling to be defined for MVP; default can be included in total if flat).

### FR-CART-3 Checkout CTA
- Prominent “Checkout” button routes to checkout page.
- If cart empty, disable checkout and show guidance.

---

## 6.6 Checkout & Payment

### FR-CHK-1 Checkout Form
- Collect/confirm:
  - Delivery address
  - Contact phone
  - Payment method

### FR-CHK-2 Payment Methods
- Support:
  - Credit Card
  - Debit Card
  - QR Code
  - Cash on Delivery (COD)

### FR-CHK-3 Payment Processing
- For card/QR, trigger payment flow and handle success/failure callbacks.
- For COD, create order directly with payment status “Pending/COD”.

### FR-CHK-4 Order Creation
- On successful payment/confirmation:
  - Generate unique order ID
  - Save order details
  - Clear cart

---

## 6.7 After Checkout (Order Confirmation)

### FR-POST-1 Confirmation Page
- Show:
  - Order ID
  - Purchased items
  - Total amount
  - Payment method
  - Delivery address
  - Order status

### FR-POST-2 Actions
- Provide buttons:
  - Track Order
  - Back to Home

---

## 6.8 Profile

### FR-PROF-1 Profile Details
- Display and allow updating:
  - Name
  - Phone
  - Address

### FR-PROF-2 Payment Methods
- Display saved payment methods (if tokenized storage is used).
- Add/remove methods (optional for MVP if only display is required).

### FR-PROF-3 Cart Listing Reference
- User can navigate to/view current cart from profile.

### FR-PROF-4 Sign Out
- User can sign out from profile page.

---

## 6.9 About

### FR-ABOUT-1 Company Contact Info
- Display:
  - Contact details
  - Physical address
  - Email
  - Facebook page link
  - Phone number

---

## 6.10 Global Navigation (Navbar)

### FR-NAV-1 Logo
- Clickable logo routes to Home.

### FR-NAV-2 Icons/Links
- Categories icon/link routes to categories.
- Profile icon/link routes to profile.
- Cart icon/link routes to cart.
- Search icon/link routes to search page.
- Language icon/link toggles TH/EN.

---

## 6.11 Search

### FR-SRCH-1 Search Input
- User can search products by keyword.
- Results page displays matching products with same card structure as Home.

---

## 6.12 Language Switching (TH/EN)

### FR-I18N-1 Locale Toggle
- User can switch between Thai and English.
- Selected language persists across pages (local storage/cookie/account preference).

---

## 7) End-to-End User Flow

1. User registers account.
2. User logs in.
3. User browses products via home/category/search.
4. User opens product detail and adds item(s) to cart with quantity.
5. User reviews cart and proceeds to checkout.
6. User confirms address/contact and selects payment method.
7. System processes payment and creates order.
8. User sees order confirmation page.
9. User tracks order or returns to home.

---

## 8) Non-Functional Requirements

### Performance
- Initial page load target: < 3 seconds on average broadband/mobile 4G.
- Product list interactions should respond within 300ms (excluding network variability).

### Reliability
- Checkout and order creation must be idempotent to avoid duplicate orders on retry.
- Payment callback handling must be resilient to delayed notifications.

### Security
- HTTPS everywhere.
- Passwords hashed and salted.
- Sensitive payment data must never be stored in plaintext.
- Follow PCI-compliant integration pattern for card flows (tokenization via payment gateway).

### Usability & Accessibility
- Responsive UI for desktop/mobile.
- WCAG-friendly contrast and keyboard-accessible controls.
- Clear validation and error messages.

### Localization
- All customer-visible strings translatable TH/EN.
- Currency formatting aligned to locale (e.g., THB).

---

## 9) Data Model (Logical)

### Entities
1. **User**
   - user_id
   - name
   - phone
   - email
   - password_hash
   - default_address
   - preferred_language
2. **Product**
   - product_id
   - name
   - description
   - category
   - price
   - image_url
   - stock_qty
3. **Cart**
   - cart_id
   - user_id
4. **CartItem**
   - cart_item_id
   - cart_id
   - product_id
   - quantity
   - unit_price
5. **Order**
   - order_id
   - user_id
   - total_amount
   - payment_method
   - payment_status
   - delivery_address
   - order_status
   - created_at
6. **OrderItem**
   - order_item_id
   - order_id
   - product_id
   - quantity
   - unit_price
7. **PaymentMethod (optional tokenized)**
   - payment_method_id
   - user_id
   - type
   - token_reference

---

## 10) Success Metrics (KPIs)

1. **Conversion Rate:** % users who complete purchase after adding to cart.
2. **Cart Abandonment Rate:** % users leaving at cart/checkout.
3. **Checkout Success Rate:** % successful payment/order creation attempts.
4. **Time to Checkout:** median time from first add-to-cart to confirmed order.
5. **Repeat Purchase Rate:** % users placing second order within 30/60 days.

---

## 11) Acceptance Criteria (High-Level)

- User can register/login and maintain session.
- User can browse products from home/category/search.
- User can add/edit/remove cart items; totals update correctly.
- User can complete checkout with all listed payment methods.
- Successful checkout generates unique order and clears cart.
- Confirmation page displays complete order details.
- Profile page supports viewing/updating account details and sign out.
- About page shows all required contact channels.
- TH/EN language switching works and persists.

---

## 12) Risks & Dependencies

### Dependencies
- Payment gateway provider for card/QR processing
- Hosting/CDN and database infrastructure
- Optional shipping/tracking provider integration

### Risks
- Payment integration complexity and edge-case failures
- Duplicate order creation on callback retries
- Inconsistent localization coverage
- Stock mismatch if inventory synchronization is delayed

---

## 13) Open Questions

1. Is email mandatory, or phone-only registration acceptable?
2. Should guest checkout be supported in MVP?
3. How are shipping fees and taxes calculated?
4. What order statuses are required for tracking in MVP? (e.g., Pending, Paid, Packed, Shipped, Delivered)
5. Which payment gateway will be used?
6. Should saved payment methods be editable in MVP or read-only display?

---

## 14) Release Plan (Suggested)

### Phase 1 (MVP)
- Auth, home/category/search, PDP, cart, checkout, confirmation, profile basics, about, TH/EN toggle

### Phase 2
- Better order tracking, promotions, wishlist, reviews, enhanced profile/payment management

---

## 15) Appendix: Navigation Map

- `/` Home
- `/categories/:category` Category listing
- `/product/:id` Product detail
- `/cart` Cart
- `/checkout` Checkout
- `/order/:id/confirmation` After checkout
- `/order/:id/tracking` Tracking
- `/profile` Profile
- `/about` About
- `/search?q=` Search
