# FinBuy - Mutual Fund Backed EMI Web Application

A full-stack web application designed for **FinBuy** that allows users to explore flagship devices (smartphones, laptops) and purchase them with dynamic EMI plans backed by their mutual funds. The system loads dynamic pricing, variants, and EMI tenure calculations from a backend database via RESTful APIs, with interactive variant switching, real-time recalculations, an interactive wealth compounding calculator, and a seamless digital pledge checkout flow.

---

## 🌟 Enhanced Features in FinBuy

1. **Brand Identity**:
   - Modern Fintech branding: **FinBuy** — Zero Cost Gadgets Backed by Mutual Funds.
   - Clean, high-conversion purple-indigo palette with emerald savings highlights.

2. **Pixel-Perfect Dynamic Product Page**:
   - Replicates the assignment reference layout.
   - Dynamic product attributes: Title, "NEW" badge, selling price (**₹1,27,400**), strikethrough MRP (**₹1,34,900**), discount percentage, and rating.
   - **Interactive Color Finish Selector**: "Available in X finishes" with real-time swatch toggling and active selection border.
   - **Storage Variant Selector**: Instant price, MRP, and EMI plan recalculations across 128GB, 256GB, 512GB, and 1TB.
   - **Selectable EMI Plans**:
     - `₹44,967 x 3 months` • `0% interest` • `Additional cashback of ₹7,500`
     - `₹22,483 x 6 months` • `0% interest` • `Additional cashback of ₹7,500`
     - `₹11,242 x 12 months` • `0% interest` • `Additional cashback of ₹7,500`
     - `₹5,621 x 24 months` • `0% interest` • `Additional cashback of ₹7,500`
     - `₹4,297 x 36 months` • `10.5% interest` • `Additional cashback of ₹7,500`
     - `₹3,385 x 48 months` • `10.5% interest` • `Additional cashback of ₹7,500`
     - `₹2,842 x 60 months` • `10.5% interest` • `Additional cashback of ₹7,500`
   - **"Compare Plans" Modal**: Side-by-side comparison table of all tenures with interest savings.

3. **Interactive Wealth Compounding Simulator (`WealthCalculator`)**:
   - Live slider widget demonstrating how much money users earn on their mutual funds while paying EMI.
   - Shows that keeping ₹3.5L+ invested at 14% CAGR earns more than the entire gadget price!

4. **Pincode Delivery Estimator (`PincodeChecker`)**:
   - Real-time Indian PIN code validator with instant transit insurance and delivery estimates.

5. **Live Social Proof Ticker (`LivePurchaseTicker`)**:
   - Rotating toast notifications displaying real-time simulated buyer purchases across major Indian cities.

6. **Interactive Multi-Step Digital Checkout Flow**:
   - **Step 1: Plan Summary**: Detailed installment breakdown, interest saved, and cashback credited.
   - **Step 2: Digital Lien KYC Simulation**: Simulated CAMS / KFintech OTP-based pledge of mutual fund units without selling portfolio holdings.
   - **Step 3: Instant Pre-Approval Confirmation**: Generates unique Order Reference ID (`FINBUY-ORD-XXXXXX`), Mutual Fund Lien Reference ID (`FINBUY-MF-PLG-XXXXXX`), and loan sanction letter download.

7. **Catalog / Home Page (`/`)**:
   - Hero banner explaining the **FinBuy Advantage** (0% foreclosure penalty, continuous NAV compounding).
   - Category filtering (All, Smartphones, Laptops) & Brand filtering (Apple, Samsung, Google).
   - Live search filter across device names and descriptions.
   - Verified customer reviews & rating distribution.

---

## 🛠 Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Lucide Icons
- **Backend**: Next.js App Router API Routes (`/api/products`, `/api/products/[slug]`, `/api/applications`, `/api/health`)
- **Database & ORM**: Prisma ORM, SQLite / PostgreSQL
- **Architecture**: Monorepo Full-Stack Next.js with Server-Side Rendering (SSR) & Client Interactivity

---

## 📁 Database Schema

The database model is defined in [`prisma/schema.prisma`](prisma/schema.prisma):

```prisma
model Product {
  id            String           @id @default(cuid())
  slug          String           @unique
  name          String
  brand         String
  category      String
  description   String
  tagline       String
  isNew         Boolean          @default(true)
  rating        Float            @default(4.9)
  reviewCount   Int              @default(1420)
  featuredImage String
  highlights    String           // JSON string array of specs
  variants      ProductVariant[]
  createdAt     DateTime         @default(now())
  updatedAt     DateTime         @updatedAt
}

model ProductVariant {
  id            String    @id @default(cuid())
  productId     String
  product       Product   @relation(fields: [productId], references: [id], onDelete: Cascade)
  name          String
  colorName     String
  colorHex      String
  storage       String
  price         Int       // Price in INR
  mrp           Int       // MRP in INR
  inStock       Boolean   @default(true)
  imageUrl      String
  galleryImages String    // JSON string array
  emiPlans      EMIPlan[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model EMIPlan {
  id                    String         @id @default(cuid())
  variantId             String
  variant               ProductVariant @relation(fields: [variantId], references: [id], onDelete: Cascade)
  tenureMonths          Int            // 3, 6, 12, 24, 36, 48, 60
  monthlyAmount         Int            // Monthly installment in INR
  interestRate          Float          // 0.0 or 10.5 etc.
  cashbackAmount        Int            @default(0)
  isZeroCost            Boolean        @default(false)
  isPopular             Boolean        @default(false)
  mutualFundLienPercent Float          @default(100.0)
  processingFee         Int            @default(0)
  totalPayable          Int
  createdAt             DateTime       @default(now())
  updatedAt             DateTime       @updatedAt
}

model Application {
  id             String   @id @default(cuid())
  variantId      String
  planId         String
  customerName   String
  email          String
  phone          String
  panNumber      String
  status         String   @default("APPROVED")
  mfPledgeRef    String
  orderReference String
  createdAt      DateTime @default(now())
}
```

---

## 🚀 Setup and Run Instructions

### 1. Install Dependencies
```bash
cd onefi-product-store
npm install
```

### 2. Initialize Database & Seed Data
```bash
npx prisma db push
npm run db:seed
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build & Run Production
```bash
npm run build
npm start
```

---

## 📡 API Endpoints & Example Responses

### 1. Get All Products
`GET /api/products`

### 2. Get Single Product by Slug or ID
`GET /api/products/iphone-17-pro`

### 3. Create Mutual Fund EMI Application (Checkout)
`POST /api/applications`

**Request Body:**
```json
{
  "variantId": "var-1",
  "planId": "plan-1",
  "customerName": "Deepak Verma",
  "phone": "9876543210",
  "email": "deepak@example.com",
  "panNumber": "ABCDE1234F"
}
```

**Response:**
```json
{
  "success": true,
  "message": "FinBuy Mutual Fund backed EMI application pre-approved successfully!",
  "data": {
    "applicationId": "app-123",
    "orderReference": "FINBUY-ORD-164100-830",
    "mfPledgeRef": "FINBUY-MF-PLG-830968",
    "status": "APPROVED",
    "productName": "iPhone 17 Pro",
    "variantName": "256GB - Desert Titanium",
    "tenureMonths": 3,
    "monthlyAmount": 44967,
    "interestRate": 0,
    "cashbackAmount": 7500,
    "totalPayable": 134901
  }
}
```

### 4. Health Check
`GET /api/health`

---

## 📹 Video Demo Script (2–5 Minutes)

- **0:00 - 0:30**: Introduce yourself, the project name **FinBuy**, and the tech stack (Next.js 15, React 19, TypeScript, Tailwind CSS, Prisma ORM, SQLite).
- **0:30 - 1:15**: Showcase the **FinBuy** Home catalog page (`/`), category filters, search bar, and live social proof ticker.
- **1:15 - 2:15**: Navigate to `/products/iphone-17-pro`. Demonstrate color finish switcher, storage selector with instant price recalculations, and the EMI plans list (matching reference screenshot).
- **2:15 - 3:00**: Show the **Wealth Compounding Simulator** widget and the **Compare Plans** modal.
- **3:00 - 3:45**: Walk through the 3-step checkout flow with CAMS/KFintech paperless pledge and instant order confirmation.
- **3:45 - 4:00**: Conclude and show database & backend APIs (`/api/products`, `/api/health`).
