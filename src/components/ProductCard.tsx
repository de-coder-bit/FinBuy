import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const defaultVariant = product.variants?.[0];
  const lowestEmiPlan = defaultVariant?.emiPlans?.reduce((prev, curr) =>
    curr.monthlyAmount < prev.monthlyAmount ? curr : prev
  , defaultVariant.emiPlans[0]);

  const discountPercent = defaultVariant
    ? Math.round(((defaultVariant.mrp - defaultVariant.price) / defaultVariant.mrp) * 100)
    : 0;

  // Extract unique colors
  const uniqueColors = Array.from(
    new Set(product.variants.map((v) => JSON.stringify({ name: v.colorName, hex: v.colorHex })))
  ).map((str) => JSON.parse(str));

  return (
    <div className="group bg-white rounded-3xl border border-gray-200/80 hover:border-purple-300 shadow-sm hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Badge */}
      {product.isNew && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-gradient-to-r from-purple-700 to-indigo-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-sm tracking-wider">
            NEW
          </span>
        </div>
      )}

      {/* Image container */}
      <div className="relative w-full pt-[85%] bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-6 group-hover:scale-[1.02] transition-transform duration-300">
        <img
          src={defaultVariant?.imageUrl || product.featuredImage}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-contain p-6"
        />
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Color Finishes Swatches */}
          <div className="flex items-center gap-1.5 mb-3">
            {uniqueColors.map((color: any, idx: number) => (
              <span
                key={idx}
                className="w-3.5 h-3.5 rounded-full border border-gray-300 shadow-inner inline-block"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            <span className="text-[11px] text-gray-400 font-medium ml-1">
              {uniqueColors.length} finishes
            </span>
          </div>

          {/* Title & Tagline */}
          <h3 className="font-extrabold text-lg text-gray-900 group-hover:text-purple-700 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{product.tagline}</p>

          {/* Pricing */}
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-black text-gray-900">
              ₹{defaultVariant?.price.toLocaleString("en-IN")}
            </span>
            {defaultVariant?.mrp && (
              <span className="text-xs text-gray-400 line-through font-medium">
                ₹{defaultVariant.mrp.toLocaleString("en-IN")}
              </span>
            )}
            {discountPercent > 0 && (
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                {discountPercent}% OFF
              </span>
            )}
          </div>
        </div>

        {/* EMI Highlight Box */}
        <div className="mt-5 pt-4 border-t border-gray-100">
          <div className="bg-purple-50/70 border border-purple-100 rounded-2xl p-3 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-purple-900 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-purple-600" />
                FinBuy MF Backed EMI
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded">
                0% Interest
              </span>
            </div>
            <div className="mt-1 text-sm font-extrabold text-purple-950">
              From ₹{lowestEmiPlan ? lowestEmiPlan.monthlyAmount.toLocaleString("en-IN") : "2,842"}/mo
            </div>
            {lowestEmiPlan?.cashbackAmount ? (
              <div className="text-[10px] font-semibold text-emerald-600 mt-0.5">
                + Up to ₹{lowestEmiPlan.cashbackAmount.toLocaleString("en-IN")} Cashback
              </div>
            ) : null}
          </div>

          {/* Action Link */}
          <Link
            href={`/products/${product.slug}`}
            className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gray-900 group-hover:bg-purple-700 text-white flex items-center justify-center gap-2 transition-all shadow-md group-hover:shadow-purple-500/20"
          >
            <span>View EMI Plans</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
