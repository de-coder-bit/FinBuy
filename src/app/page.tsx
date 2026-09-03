"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import MutualFundExplainer from "@/components/MutualFundExplainer";
import WealthCalculator from "@/components/WealthCalculator";
import LivePurchaseTicker from "@/components/LivePurchaseTicker";
import { Product } from "@/types";
import {
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Zap,
  Search,
  CheckCircle2,
  ArrowRight,
  Filter,
  Loader2,
  ShoppingBag,
  Clock,
  Award,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isExplainerOpen, setIsExplainerOpen] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const res = await fetch("/api/products");
        const json = await res.json();
        if (json.success) {
          setProducts(json.data);
        }
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "all" || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesBrand =
      selectedBrand === "all" || p.brand.toLowerCase() === selectedBrand.toLowerCase();
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesBrand && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onOpenExplainer={() => setIsExplainerOpen(true)} />

      <main className="flex-1">
        {/* ================= HERO BANNER ================= */}
        <section className="relative overflow-hidden bg-gradient-to-b from-purple-950 via-purple-900 to-slate-900 text-white py-12 sm:py-16">
          {/* Subtle glow decorative background */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-purple-800/60 border border-purple-500/30 rounded-full px-3.5 py-1 text-xs font-bold text-purple-200 mb-4 backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                <span>Zero Cost EMI Backed by Your Mutual Funds</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight sm:leading-none mb-4">
                Upgrade with <span className="text-purple-300">FinBuy</span>.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-200 to-indigo-200">
                  Keep Your Investments Growing.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-purple-100/80 mb-6 leading-relaxed">
                Pledge your mutual fund portfolio digitally via CAMS &amp; KFintech. Get instant pre-approved EMI starting from <strong>0% interest</strong> with zero credit card required and up to ₹7,500 cashback.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/products/iphone-17-pro"
                  className="px-6 py-3.5 rounded-xl font-extrabold text-sm bg-white text-purple-950 hover:bg-purple-50 transition-all shadow-lg shadow-black/20 flex items-center gap-2 group"
                >
                  <span>Explore iPhone 17 Pro</span>
                  <ArrowRight className="w-4 h-4 text-purple-700 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <button
                  onClick={() => setIsExplainerOpen(true)}
                  className="px-5 py-3.5 rounded-xl font-bold text-sm bg-purple-800/40 hover:bg-purple-800/70 border border-purple-400/30 text-white transition-all flex items-center gap-2 cursor-pointer"
                >
                  <TrendingUp className="w-4 h-4 text-purple-300" />
                  <span>How FinBuy EMI Works</span>
                </button>
              </div>

              {/* Key Value Badges */}
              <div className="mt-8 pt-6 border-t border-purple-800/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="flex items-center gap-2 text-purple-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>0% Foreclosure Penalty</span>
                </div>
                <div className="flex items-center gap-2 text-purple-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Continuous NAV Growth</span>
                </div>
                <div className="flex items-center gap-2 text-purple-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>100% Digital Lien Marking</span>
                </div>
                <div className="flex items-center gap-2 text-purple-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Instant 2-Min Approval</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CATALOG SECTION ================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Controls bar (Search & Filters) */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                Available Products on FinBuy EMI
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                Choose a product to view dynamic variants and customized tenure plans.
              </p>
            </div>

            {/* Filter Pills and Search */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Search Bar */}
              <div className="relative min-w-[200px] flex-1 sm:flex-initial">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none bg-white shadow-sm"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    selectedCategory === "all"
                      ? "bg-purple-700 text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedCategory("smartphones")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    selectedCategory === "smartphones"
                      ? "bg-purple-700 text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Smartphones
                </button>
                <button
                  onClick={() => setSelectedCategory("laptops")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    selectedCategory === "laptops"
                      ? "bg-purple-700 text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Laptops
                </button>
              </div>

              {/* Brand Filter */}
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 bg-white shadow-sm outline-none focus:ring-2 focus:ring-purple-600 cursor-pointer"
              >
                <option value="all">All Brands</option>
                <option value="apple">Apple</option>
                <option value="samsung">Samsung</option>
                <option value="google">Google</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <Loader2 className="w-8 h-8 animate-spin text-purple-700 mb-3" />
              <p className="text-sm font-semibold text-gray-600">
                Fetching dynamic products &amp; EMI plans from database...
              </p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-3xl border border-gray-200 p-8">
              <p className="text-gray-500 text-sm">No products found matching your filter criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedBrand("all");
                  setSearchQuery("");
                }}
                className="mt-3 text-xs font-bold text-purple-700 underline"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* ================= INTERACTIVE WEALTH CALCULATOR ================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <WealthCalculator productPrice={127400} productName="iPhone 17 Pro" />
        </section>

        {/* ================= FINBUY VALUE PROPOSITION GRID ================= */}
        <section className="bg-slate-100/70 border-y border-slate-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-extrabold uppercase tracking-widest text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                Why FinBuy Mutual Fund EMI?
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-3">
                Financing that works for your wealth, not against it.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-base text-gray-900 mb-1">
                  Keep Compounding Your Funds
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Selling mutual funds incurs capital gains tax and breaks your compounding momentum. With FinBuy, your units remain invested and continue growing at 12–15% CAGR.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-base text-gray-900 mb-1">
                  Zero Foreclosure Charges
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Close your loan anytime with ₹0 penalties or hidden fees. Transparent, flexible repayment designed for modern investors.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-base text-gray-900 mb-1">
                  100% Digital via CAMS/KFintech
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  No physical documents or visiting branches. Instant OTP-based lien creation directly with official MF RTAs.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Explainer Modal */}
      <MutualFundExplainer
        isOpen={isExplainerOpen}
        onClose={() => setIsExplainerOpen(false)}
      />

      {/* Realtime Social Proof Toast */}
      <LivePurchaseTicker />
    </div>
  );
}
