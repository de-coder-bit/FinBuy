# FinBuy — Mutual Fund Backed EMI Platform

FinBuy is a full-stack e-commerce demo where users can buy gadgets (smartphones, laptops) on 0% EMI, backed digitally by their mutual fund portfolio instead of a credit card or cash payment.

**Live Demo:** (https://fin-buy-git-main-deepakverma4336-9399s-projects.vercel.app/)
**Video Walkthrough:** [add your demo video link here]

---

## 📦 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 (App Router), React 19 |
| Styling | Tailwind CSS |
| Backend | Next.js API Routes (REST) |
| ORM | Prisma 6 |
| Database | PostgreSQL (hosted on Render) |
| Icons | Lucide React |
| Deployment | Vercel (app) + Render (database) |
| Language | JavaScript / TypeScript |

---

## 🗂️ Database Schema

Defined in [`prisma/schema.prisma`](./prisma/schema.prisma), using PostgreSQL as the provider. Relational structure:

```
Product (1) ──< ProductVariant (many) ──< EMIPlan (many)

Application ──> references a ProductVariant + EMIPlan (by ID, not a formal relation)
```

### `Product`
| Field | Type | Notes |
|---|---|---|
| `id` | String (cuid) | Primary key |
| `slug` | String | Unique, used in product URLs |
| `name` | String | |
| `brand` | String | |
| `category` | String | e.g. "Smartphones", "Laptops" |
| `description` | String | |
| `tagline` | String | |
| `isNew` | Boolean | Default `true` |
| `rating` | Float | Default `4.9` |
| `reviewCount` | Int | Default `1420` |
| `featuredImage` | String | Image path |
| `highlights` | String | JSON-stringified array of key specs |
| `variants` | ProductVariant[] | One-to-many relation |
| `createdAt` / `updatedAt` | DateTime | Auto-managed |

### `ProductVariant`
| Field | Type | Notes |
|---|---|---|
| `id` | String (cuid) | Primary key |
| `productId` | String | Foreign key → `Product.id` (cascade delete) |
| `name` | String | e.g. "256GB - Cosmic Orange" |
| `colorName` | String | |
| `colorHex` | String | |
| `storage` | String | |
| `price` | Int | In INR |
| `mrp` | Int | In INR |
| `inStock` | Boolean | Default `true` |
| `imageUrl` | String | |
| `galleryImages` | String | JSON-stringified array of image paths |
| `emiPlans` | EMIPlan[] | One-to-many relation |
| `createdAt` / `updatedAt` | DateTime | Auto-managed |

### `EMIPlan`
| Field | Type | Notes |
|---|---|---|
| `id` | String (cuid) | Primary key |
| `variantId` | String | Foreign key → `ProductVariant.id` (cascade delete) |
| `tenureMonths` | Int | 3 / 6 / 12 / 24 / 36 / 48 / 60 |
| `monthlyAmount` | Int | Installment amount, in INR |
| `interestRate` | Float | `0.0` for zero-cost plans, `10.5` for interest-bearing ones |
| `cashbackAmount` | Int | Default `0` |
| `isZeroCost` | Boolean | Default `false` |
| `isPopular` | Boolean | Default `false` |
| `mutualFundLienPercent` | Float | Default `100.0` |
| `processingFee` | Int | Default `0` |
| `totalPayable` | Int | `monthlyAmount × tenureMonths` |
| `createdAt` / `updatedAt` | DateTime | Auto-managed |

### `Application`
| Field | Type | Notes |
|---|---|---|
| `id` | String (cuid) | Primary key |
| `variantId` | String | References a `ProductVariant.id` (not a formal Prisma relation) |
| `planId` | String | References an `EMIPlan.id` |
| `customerName` | String | |
| `email` | String | |
| `phone` | String | |
| `panNumber` | String | |
| `status` | String | Default `"APPROVED"` |
| `mfPledgeRef` | String | Mutual fund lien/pledge reference |
| `orderReference` | String | |
| `createdAt` | DateTime | Auto-managed |

---

## 🚀 Setup & Run Instructions

### Prerequisites
- Node.js 18+
- npm
- A PostgreSQL database (local, or a hosted instance like [Render](https://render.com))

### 1. Clone the repository
```bash
git clone https://github.com/de-coder-bit/FinBuy.git
cd FinBuy
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the project root:
```env
DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<database>"
```

### 4. Set up the database
Generate the Prisma client and apply migrations:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Seed the database with sample data
```bash
npm run db:seed
```
This populates the database with 4 sample products (iPhone 17 Pro, Samsung Galaxy S24 Ultra, Google Pixel 9 Pro, MacBook Pro 14" M4), their variants, and auto-generated EMI plans.

### 6. Run the development server
```bash
npm run dev
```
Visit **http://localhost:3000** in your browser.

### 7. Build for production
```bash
npm run build
npm run start
```

> **Note:** The `build` script automatically runs `prisma generate && prisma migrate deploy` before building, so production deployments (e.g. on Vercel) apply pending migrations automatically.

---

## 🔌 API Endpoints

### `GET /api/products`
Returns all products with nested variants and EMI plans. Supports optional filtering via query params.

**Query Parameters (optional):**
| Param | Example | Description |
|---|---|---|
| `category` | `?category=Smartphones` | Filter by category. `all` or omitted = no filter. |
| `brand` | `?brand=Apple` | Filter by brand. `all` or omitted = no filter. |

**Example Request:**
```
GET /api/products?category=Smartphones&brand=Apple
```

**Example Response:**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": "clz1a2b3c4d5e6f7g8h9",
      "slug": "iphone-17-pro",
      "name": "iPhone 17 Pro",
      "brand": "Apple",
      "category": "Smartphones",
      "description": "The most powerful iPhone ever with revolutionary A19 Pro Bionic silicon...",
      "tagline": "Titanium. So strong. So light. So Pro.",
      "isNew": true,
      "rating": 4.9,
      "reviewCount": 2840,
      "featuredImage": "/images/iphone-orange.jpg",
      "highlights": "[\"A19 Pro Chip with 6-core GPU & Hardware Ray Tracing\", \"48MP Fusion Camera system with 5x Optical Telephoto\"]",
      "createdAt": "2026-09-04T09:44:19.000Z",
      "updatedAt": "2026-09-04T09:44:19.000Z",
      "variants": [
        {
          "id": "clz9y8x7w6v5u4t3s2r1",
          "productId": "clz1a2b3c4d5e6f7g8h9",
          "name": "256GB - Cosmic Orange",
          "colorName": "Cosmic Orange",
          "colorHex": "#C1652B",
          "storage": "256GB",
          "price": 127400,
          "mrp": 134900,
          "inStock": true,
          "imageUrl": "/images/iphone-orange.jpg",
          "galleryImages": "[\"/images/iphone-orange.jpg\"]",
          "emiPlans": [
            {
              "id": "clzq1w2e3r4t5y6u7i8o",
              "variantId": "clz9y8x7w6v5u4t3s2r1",
              "tenureMonths": 3,
              "monthlyAmount": 44967,
              "interestRate": 0.0,
              "cashbackAmount": 7500,
              "isZeroCost": true,
              "isPopular": false,
              "mutualFundLienPercent": 100.0,
              "processingFee": 0,
              "totalPayable": 134901
            }
          ]
        }
      ]
    }
  ]
}
```
*(`emiPlans` are ordered by `tenureMonths` ascending. Products are ordered by `createdAt` ascending.)*

**Error Response (500):**
```json
{
  "success": false,
  "error": "Failed to fetch products from database",
  "message": "<error detail>"
}
```

> **Note:** `highlights` and `galleryImages` are stored as JSON-stringified strings in the database (see schema above) — parse them with `JSON.parse()` on the frontend before use.

---

### `GET /api/products/[slug]`
Returns a single product with its variants and EMI plans. Looks up by `slug` first, then falls back to matching by `id` if no slug match is found.

**Example Request:**
```
GET /api/products/iphone-17-pro
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "id": "clz1a2b3c4d5e6f7g8h9",
    "slug": "iphone-17-pro",
    "name": "iPhone 17 Pro",
    "brand": "Apple",
    "category": "Smartphones",
    "description": "The most powerful iPhone ever with revolutionary A19 Pro Bionic silicon...",
    "tagline": "Titanium. So strong. So light. So Pro.",
    "isNew": true,
    "rating": 4.9,
    "reviewCount": 2840,
    "featuredImage": "/images/iphone-orange.jpg",
    "highlights": "[\"A19 Pro Chip with 6-core GPU & Hardware Ray Tracing\"]",
    "variants": [
      {
        "id": "clz9y8x7w6v5u4t3s2r1",
        "name": "256GB - Cosmic Orange",
        "colorName": "Cosmic Orange",
        "colorHex": "#C1652B",
        "storage": "256GB",
        "price": 127400,
        "mrp": 134900,
        "inStock": true,
        "imageUrl": "/images/iphone-orange.jpg",
        "emiPlans": [
          {
            "id": "clzq1w2e3r4t5y6u7i8o",
            "tenureMonths": 3,
            "monthlyAmount": 44967,
            "interestRate": 0.0,
            "cashbackAmount": 7500,
            "isZeroCost": true,
            "isPopular": false,
            "totalPayable": 134901
          }
        ]
      }
    ]
  }
}
```

**Error Responses:**
```json
// 400 — no slug provided
{ "success": false, "error": "Product slug is required" }

// 404 — no matching product
{ "success": false, "error": "Product not found" }
```

---

### `POST /api/applications`
Submits an EMI application against a chosen product variant and plan. Simulates instant approval with a mock mutual fund pledge reference and order ID (no real CAMS/KFintech integration).

**Request Body:**
```json
{
  "variantId": "clz9y8x7w6v5u4t3s2r1",
  "planId": "clzq1w2e3r4t5y6u7i8o",
  "customerName": "Rahul Sharma",
  "email": "rahul@example.com",
  "phone": "9876543210",
  "panNumber": "ABCDE1234F"
}
```
*(`email` and `panNumber` are optional — defaults are auto-generated if omitted: `<phone>@customer.finbuy.in` and `ABCDE1234F` respectively. `variantId`, `planId`, `customerName`, and `phone` are required.)*

**Example Response (200):**
```json
{
  "success": true,
  "message": "FinBuy Mutual Fund backed EMI application pre-approved successfully!",
  "data": {
    "applicationId": "clzr5t6y7u8i9o0p1a2s",
    "orderReference": "FINBUY-ORD-533309-742",
    "mfPledgeRef": "FINBUY-MF-PLG-742819",
    "status": "APPROVED",
    "productName": "iPhone 17 Pro",
    "variantName": "256GB - Cosmic Orange",
    "tenureMonths": 3,
    "monthlyAmount": 44967,
    "interestRate": 0.0,
    "cashbackAmount": 7500,
    "totalPayable": 134901,
    "createdAt": "2026-09-04T15:36:00.000Z"
  }
}
```

**Error Responses:**
```json
// 400 — missing required fields
{ "success": false, "error": "Missing required application fields" }

// 404 — invalid variant or plan ID
{ "success": false, "error": "Invalid product variant or EMI plan" }
```

### `GET /api/applications`
Returns the 20 most recent applications, newest first.

**Example Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "clzr5t6y7u8i9o0p1a2s",
      "variantId": "clz9y8x7w6v5u4t3s2r1",
      "planId": "clzq1w2e3r4t5y6u7i8o",
      "customerName": "Rahul Sharma",
      "email": "rahul@example.com",
      "phone": "9876543210",
      "panNumber": "ABCDE1234F",
      "status": "APPROVED",
      "mfPledgeRef": "FINBUY-MF-PLG-742819",
      "orderReference": "FINBUY-ORD-533309-742",
      "createdAt": "2026-09-04T15:36:00.000Z"
    }
  ]
}
```

---

### `GET /api/health`
Health check endpoint — confirms the API and database connection are working, and returns current record counts.

**Example Response (200):**
```json
{
  "status": "healthy",
  "timestamp": "2026-09-04T15:40:00.000Z",
  "database": "connected",
  "counts": {
    "products": 4,
    "variants": 12,
    "emiPlans": 84
  },
  "service": "FinBuy Mutual Fund EMI Engine"
}
```

**Error Response (500):**
```json
{
  "status": "unhealthy",
  "database": "disconnected",
  "error": "<error detail>"
}
```

---

## 📁 Project Structure

```
FinBuy/
├── prisma/
│   ├── schema.prisma      # Database schema
│   ├── seed.js            # Seed script (sample data)
│   └── migrations/        # Migration history
├── public/
│   └── images/            # Product images
├── src/                   # App source (pages, components, API routes)
├── package.json
└── README.md
```

---

## 📝 License

This is a demo/learning project and is not intended for production or commercial use.
