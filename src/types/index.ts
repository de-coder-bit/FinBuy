export interface EMIPlan {
  id: string;
  variantId: string;
  tenureMonths: number;
  monthlyAmount: number;
  interestRate: number;
  cashbackAmount: number;
  isZeroCost: boolean;
  isPopular: boolean;
  mutualFundLienPercent: number;
  processingFee: number;
  totalPayable: number;
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  colorName: string;
  colorHex: string;
  storage: string;
  price: number;
  mrp: number;
  inStock: boolean;
  imageUrl: string;
  galleryImages: string; // JSON string or parsed array
  emiPlans?: EMIPlan[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  tagline: string;
  isNew: boolean;
  rating: number;
  reviewCount: number;
  featuredImage: string;
  highlights: string; // JSON string
  variants: ProductVariant[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ApplicationInput {
  variantId: string;
  planId: string;
  customerName: string;
  email: string;
  phone: string;
  panNumber: string;
}
