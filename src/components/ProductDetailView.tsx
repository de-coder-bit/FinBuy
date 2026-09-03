"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Info,
  CheckCircle2,
  ChevronRight,
  Star,
  Zap,
  Lock,
  ArrowRight,
  RotateCcw,
  Truck,
  Award,
  TableProperties,
  MessageSquare,
  ThumbsUp,
} from "lucide-react";
import { Product, ProductVariant, EMIPlan } from "@/types";
import EMIPlanCard from "./EMIPlanCard";
import CheckoutModal from "./CheckoutModal";
import WealthCalculator from "./WealthCalculator";
import PincodeChecker from "./PincodeChecker";
import EMIComparisonModal from "./EMIComparisonModal";

interface ProductDetailViewProps {
  product: Product;
  onOpenExplainer: () => void;
}

const SAMPLE_REVIEWS = [
  {
    author: "Ananya Sharma",
    city: "Bangalore",
    rating: 5,
    date: "2 days ago",
    verified: true,
    title: "Zero cost EMI without liquidating my mutual funds!",
    comment:
      "I was hesitant to sell my equity funds during the bull run. FinBuy made it so effortless—I pledged via CAMS OTP in 2 minutes, got the iPhone delivered the next day, and my mutual fund is still growing!",
  },
  {
    author: "Karthik Rajan",
    city: "Chennai",
    rating: 5,
    date: "1 week ago",
    verified: true,
    title: "₹7,500 cashback received in bank within 24h",
    comment:
      "Best purchase experience. No credit card limit blocked and ₹0 foreclosure fee means I can close it whenever I want.",
  },
];

export default function ProductDetailView({ product, onOpenExplainer }: ProductDetailViewProps) {
  // Parse highlights
  const highlightsList: string[] = useMemo(() => {
    try {
      return JSON.parse(product.highlights);
    } catch {
      return [
        "Pro Grade Processor & Graphics",
        "Next-gen Display with High Refresh Rate",
        "All-day Battery Life",
        "Advanced Multi-Camera System",
      ];
    }
  }, [product.highlights]);

  // Extract available unique storage options and color options from variants
  const availableStorages = useMemo(() => {
    return Array.from(new Set(product.variants.map((v) => v.storage)));
  }, [product.variants]);

  const availableColors = useMemo(() => {
    const map = new Map<string, { name: string; hex: string }>();
    product.variants.forEach((v) => {
      if (!map.has(v.colorName)) {
        map.set(v.colorName, { name: v.colorName, hex: v.colorHex });
      }
    });
    return Array.from(map.values());
  }, [product.variants]);

  // Selected state
  const [selectedStorage, setSelectedStorage] = useState<string>(
    product.variants[0]?.storage || ""
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product.variants[0]?.colorName || ""
  );

  // Active matching variant
  const activeVariant: ProductVariant = useMemo(() => {
    const match = product.variants.find(
      (v) => v.storage === selectedStorage && v.colorName === selectedColor
    );
    if (match) return match;

    const storageMatch = product.variants.find((v) => v.storage === selectedStorage);
    if (storageMatch) return storageMatch;

    return product.variants[0];
  }, [product.variants, selectedStorage, selectedColor]);

  // Selected EMI Plan
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  // Default to 6-month or first plan
  const activeEMIPlan: EMIPlan | undefined = useMemo(() => {
    const plans = activeVariant?.emiPlans || [];
    if (!plans.length) return undefined;

    if (selectedPlanId) {
      const found = plans.find((p) => p.id === selectedPlanId);
      if (found) return found;
    }

    const def = plans.find((p) => p.tenureMonths === 6) || plans[0];
    return def;
  }, [activeVariant, selectedPlanId]);

  // Modal states
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"specs" | "reviews">("specs");

  const discountAmount = activeVariant.mrp - activeVariant.price;
  const discountPercent = Math.round((discountAmount / activeVariant.mrp) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 font-medium -mb-6">
        <Link href="/" className="hover:text-purple-700 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/" className="hover:text-purple-700 transition-colors">
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-900 font-bold">{product.name}</span>
      </nav>

      {/* Main 2-Column Product & EMI Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* ================= LEFT COLUMN: PRODUCT GALLERY & SPECS ================= */}
        <div className="lg:col-span-6 flex flex-col">
          {/* Main Showcase Image Container */}
          <div className="relative w-full aspect-square bg-gradient-to-b from-slate-50 via-slate-50/50 to-white rounded-3xl border border-gray-200/90 flex items-center justify-center p-8 sm:p-12 shadow-sm overflow-hidden group">
            {product.isNew && (
              <div className="absolute top-5 left-5 z-10">
                <span className="bg-purple-700 text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-full shadow-sm tracking-wider">
                  NEW
                </span>
              </div>
            )}

            <img
              src={activeVariant.imageUrl}
              alt={`${product.name} - ${activeVariant.name}`}
              className="w-full h-full object-contain drop-shadow-2xl transition-all duration-300 group-hover:scale-105"
            />
          </div>

          {/* Color Finishes Bar (Matching reference image: "Available in 3 finishes" with dots) */}
          <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-gray-800">
                Available in {availableColors.length} finishes
              </span>
              <span className="text-xs font-semibold text-purple-700">
                {activeVariant.colorName}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {availableColors.map((col) => {
                const isCurrent = activeVariant.colorName === col.name;
                return (
                  <button
                    key={col.name}
                    onClick={() => setSelectedColor(col.name)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      isCurrent
                        ? "border-purple-600 bg-white text-purple-900 shadow-sm ring-2 ring-purple-600/20"
                        : "border-gray-200 bg-white/60 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-gray-300 shadow-inner flex-shrink-0"
                      style={{ backgroundColor: col.hex }}
                    />
                    <span>{col.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Storage Variant Selector */}
          <div className="mt-4 p-4 rounded-2xl bg-white border border-gray-200/80">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-gray-800">Select Storage Capacity</span>
              <span className="text-xs text-gray-500 font-medium">Instant price updates</span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
              {availableStorages.map((storage) => {
                const isCurrent = activeVariant.storage === storage;
                return (
                  <button
                    key={storage}
                    onClick={() => setSelectedStorage(storage)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                      isCurrent
                        ? "bg-purple-700 text-white border-purple-700 shadow-md shadow-purple-600/20"
                        : "bg-slate-50 text-gray-800 border-gray-200 hover:border-purple-300 hover:bg-purple-50/40"
                    }`}
                  >
                    {storage}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Delivery Estimator */}
          <div className="mt-4">
            <PincodeChecker />
          </div>

          {/* Trust Guarantees */}
          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-white border border-gray-200 rounded-xl">
              <Truck className="w-4 h-4 text-purple-600 mx-auto mb-1" />
              <div className="text-[11px] font-bold text-gray-900">Free Express</div>
              <div className="text-[10px] text-gray-500">24h Dispatch</div>
            </div>
            <div className="p-3 bg-white border border-gray-200 rounded-xl">
              <Award className="w-4 h-4 text-purple-600 mx-auto mb-1" />
              <div className="text-[11px] font-bold text-gray-900">100% Genuine</div>
              <div className="text-[10px] text-gray-500">Brand Warranty</div>
            </div>
            <div className="p-3 bg-white border border-gray-200 rounded-xl">
              <RotateCcw className="w-4 h-4 text-purple-600 mx-auto mb-1" />
              <div className="text-[11px] font-bold text-gray-900">7-Day Return</div>
              <div className="text-[10px] text-gray-500">Hassle-free</div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: PRICING & EMI PLANS (MATCHING REFERENCE IMAGE) ================= */}
        <div className="lg:col-span-6 flex flex-col">
          {/* Header & Product Name */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-extrabold uppercase text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">
                {product.brand}
              </span>
              <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{product.rating}</span>
                <span className="text-gray-400 font-normal">({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Product Title (e.g., iPhone 17 Pro 256GB) */}
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {product.name}
            </h1>
            <p className="text-sm font-semibold text-gray-600 mt-0.5">
              {activeVariant.storage} • {activeVariant.colorName}
            </p>
          </div>

          {/* Pricing Box (Matching Reference: ₹1,27,400 with ₹1,34,900 struck out) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 mb-6">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                ₹{activeVariant.price.toLocaleString("en-IN")}
              </span>
              <span className="text-base sm:text-lg text-gray-400 line-through font-semibold">
                ₹{activeVariant.mrp.toLocaleString("en-IN")}
              </span>
              <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg">
                Save ₹{discountAmount.toLocaleString("en-IN")} ({discountPercent}% OFF)
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1.5">
              Inclusive of all taxes. Free shipping on FinBuy Mutual Fund EMI.
            </p>
          </div>

          {/* EMI Plans Header Section */}
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-extrabold text-gray-900 tracking-tight">
                EMI plans backed by mutual funds
              </h2>
              <button
                onClick={onOpenExplainer}
                className="text-gray-400 hover:text-purple-700 transition-colors p-0.5 rounded cursor-pointer"
                title="Learn how Mutual Fund EMI works"
              >
                <Info className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => setIsComparisonOpen(true)}
              className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200"
            >
              <TableProperties className="w-3.5 h-3.5" />
              <span>Compare Plans</span>
            </button>
          </div>

          {/* EMI Plans List (Selectable Cards) */}
          <div className="space-y-2.5 mb-6">
            {activeVariant.emiPlans && activeVariant.emiPlans.length > 0 ? (
              activeVariant.emiPlans.map((plan) => (
                <EMIPlanCard
                  key={plan.id}
                  plan={plan}
                  isSelected={activeEMIPlan?.id === plan.id}
                  onSelect={(p) => setSelectedPlanId(p.id)}
                />
              ))
            ) : (
              <div className="p-4 rounded-xl bg-gray-50 text-xs text-gray-500 text-center">
                Loading dynamic EMI schedules...
              </div>
            )}
          </div>

          {/* Selected Plan Summary & Proceed Button */}
          {activeEMIPlan && (
            <div className="sticky bottom-4 z-20 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-purple-200 shadow-xl shadow-purple-900/10">
              <div className="flex items-center justify-between mb-3 text-xs">
                <div>
                  <span className="text-gray-500 font-medium">Selected Plan: </span>
                  <span className="font-extrabold text-gray-900">
                    ₹{activeEMIPlan.monthlyAmount.toLocaleString("en-IN")}/mo for{" "}
                    {activeEMIPlan.tenureMonths} mos
                  </span>
                </div>
                <div className="text-emerald-600 font-bold">
                  {activeEMIPlan.interestRate === 0
                    ? "0% Interest (No Cost)"
                    : `${activeEMIPlan.interestRate}% Interest`}
                </div>
              </div>

              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full py-4 px-6 rounded-xl font-extrabold text-base text-white bg-gradient-to-r from-purple-800 to-purple-600 hover:from-purple-900 hover:to-purple-700 transition-all shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.99]"
              >
                <span>Proceed with Selected Plan</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="mt-2.5 flex items-center justify-center gap-4 text-[11px] text-gray-500 font-medium">
                <span className="flex items-center gap-1 text-emerald-700">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Paperless Lien
                </span>
                <span>•</span>
                <span>Zero Foreclosure Fee</span>
                <span>•</span>
                <span>Instant Approval</span>
              </div>
            </div>
          )}

          {/* Mutual Fund Benefit Callout Box */}
          <div className="mt-6 p-4 rounded-2xl bg-purple-50/60 border border-purple-100 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div className="text-xs text-purple-950">
              <strong className="font-bold text-purple-900">
                Your mutual funds continue to compound:
              </strong>{" "}
              By taking an EMI backed by your mutual fund units via FinBuy, you don&apos;t sell your
              investments. Your portfolio continues to generate returns, effectively reducing your
              real cost of borrowing to near zero or net positive!
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Wealth Compounding Simulator */}
      <section className="pt-6">
        <WealthCalculator
          productPrice={activeVariant.price}
          productName={`${product.name} (${activeVariant.storage})`}
        />
      </section>

      {/* Tabs for Specs & Verified Reviews */}
      <section className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 shadow-sm">
        <div className="flex border-b border-gray-200 mb-6 gap-6">
          <button
            onClick={() => setActiveTab("specs")}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === "specs"
                ? "border-purple-700 text-purple-800"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === "reviews"
                ? "border-purple-700 text-purple-800"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Customer Reviews ({product.reviewCount})</span>
          </button>
        </div>

        {activeTab === "specs" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {highlightsList.map((spec, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100"
              >
                <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="font-semibold text-gray-800">{spec}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {SAMPLE_REVIEWS.map((rev, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-gray-900">{rev.author}</span>
                    <span className="text-gray-400">({rev.city})</span>
                    {rev.verified && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> Verified FinBuy Buyer
                      </span>
                    )}
                  </div>
                  <span className="text-gray-400 text-[11px]">{rev.date}</span>
                </div>
                <div className="flex items-center gap-1 text-amber-500 mb-1.5">
                  {Array.from({ length: rev.rating }).map((_, r) => (
                    <Star key={r} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <h5 className="font-bold text-gray-900 mb-1">{rev.title}</h5>
                <p className="text-gray-600 leading-relaxed">{rev.comment}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Checkout Modal */}
      {activeEMIPlan && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          product={product}
          variant={activeVariant}
          plan={activeEMIPlan}
        />
      )}

      {/* EMI Comparison Modal */}
      {activeVariant.emiPlans && (
        <EMIComparisonModal
          isOpen={isComparisonOpen}
          onClose={() => setIsComparisonOpen(false)}
          variant={activeVariant}
          plans={activeVariant.emiPlans}
          onSelectPlan={(p) => setSelectedPlanId(p.id)}
        />
      )}
    </div>
  );
}
