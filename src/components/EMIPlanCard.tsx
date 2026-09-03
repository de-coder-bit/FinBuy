"use client";

import React from "react";
import { Check, Sparkles } from "lucide-react";
import { EMIPlan } from "@/types";

interface EMIPlanCardProps {
  plan: EMIPlan;
  isSelected: boolean;
  onSelect: (plan: EMIPlan) => void;
}

export default function EMIPlanCard({ plan, isSelected, onSelect }: EMIPlanCardProps) {
  const isZeroCost = plan.interestRate === 0;

  return (
    <div
      onClick={() => onSelect(plan)}
      className={`relative w-full p-4 sm:p-4.5 rounded-2xl cursor-pointer transition-all duration-200 border text-left select-none ${
        isSelected
          ? "border-purple-600 bg-purple-50/40 shadow-md shadow-purple-500/10 ring-2 ring-purple-600/20"
          : "border-gray-200 hover:border-purple-300 bg-white hover:bg-slate-50/50"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        {/* Left column: Monthly amount & tenure + cashback */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {/* Custom Radio Circle */}
          <div
            className={`w-5 h-5 rounded-full mt-0.5 flex items-center justify-center flex-shrink-0 transition-colors ${
              isSelected
                ? "bg-purple-700 text-white"
                : "border-2 border-gray-300 bg-white"
            }`}
          >
            {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
          </div>

          <div className="flex-1 min-w-0">
            {/* Primary Payment Text: e.g. ₹44,967 x 3 months */}
            <div className="flex items-baseline gap-1.5">
              <span className="font-extrabold text-base sm:text-lg text-gray-900 tracking-tight">
                ₹{plan.monthlyAmount.toLocaleString("en-IN")}
              </span>
              <span className="text-sm font-semibold text-gray-700">
                x {plan.tenureMonths} months
              </span>
            </div>

            {/* Cashback subtext (matching reference image) */}
            {plan.cashbackAmount > 0 ? (
              <div className="text-xs font-semibold text-emerald-600 mt-1 flex items-center gap-1">
                <span>Additional cashback of ₹{plan.cashbackAmount.toLocaleString("en-IN")}</span>
              </div>
            ) : (
              <div className="text-xs text-gray-400 mt-1">
                Total Payable: ₹{plan.totalPayable.toLocaleString("en-IN")}
              </div>
            )}
          </div>
        </div>

        {/* Right column: Interest rate pill badge */}
        <div className="flex flex-col items-end flex-shrink-0">
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
              isZeroCost
                ? "bg-emerald-50 text-emerald-700 border-emerald-200/80"
                : "bg-slate-100 text-slate-700 border-slate-200"
            }`}
          >
            {plan.interestRate === 0 ? "0% interest" : `${plan.interestRate}% interest`}
          </span>

          {plan.isPopular && (
            <span className="text-[10px] font-bold text-purple-700 mt-1 uppercase tracking-wider">
              Most Popular
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
