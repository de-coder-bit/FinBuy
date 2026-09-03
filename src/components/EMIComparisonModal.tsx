"use client";

import React from "react";
import { X, CheckCircle2, TrendingUp, Sparkles, ShieldCheck } from "lucide-react";
import { EMIPlan, ProductVariant } from "@/types";

interface EMIComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant: ProductVariant;
  plans: EMIPlan[];
  onSelectPlan: (plan: EMIPlan) => void;
}

export default function EMIComparisonModal({
  isOpen,
  onClose,
  variant,
  plans,
  onSelectPlan,
}: EMIComparisonModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-purple-100 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-900">Compare All FinBuy EMI Plans</h3>
            <p className="text-xs text-gray-500">
              For {variant.name} (Selling Price: ₹{variant.price.toLocaleString("en-IN")})
            </p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-gray-200 mb-6">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-gray-700 font-bold border-b border-gray-200">
              <tr>
                <th className="p-3.5">Tenure</th>
                <th className="p-3.5">Monthly EMI</th>
                <th className="p-3.5">Annual Interest</th>
                <th className="p-3.5">Cashback</th>
                <th className="p-3.5">Total Payable</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {plans.map((plan) => (
                <tr key={plan.id} className="hover:bg-purple-50/50 transition-colors">
                  <td className="p-3.5 font-extrabold text-gray-900">
                    {plan.tenureMonths} Months
                  </td>
                  <td className="p-3.5 font-bold text-purple-800 text-sm">
                    ₹{plan.monthlyAmount.toLocaleString("en-IN")}
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`px-2 py-0.5 rounded font-bold ${
                        plan.interestRate === 0
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {plan.interestRate === 0 ? "0% No Cost" : `${plan.interestRate}%`}
                    </span>
                  </td>
                  <td className="p-3.5 font-semibold text-emerald-600">
                    {plan.cashbackAmount > 0
                      ? `+ ₹${plan.cashbackAmount.toLocaleString("en-IN")}`
                      : "—"}
                  </td>
                  <td className="p-3.5 font-bold text-gray-900">
                    ₹{plan.totalPayable.toLocaleString("en-IN")}
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => {
                        onSelectPlan(plan);
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-lg bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs transition-colors cursor-pointer"
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-xl text-xs text-purple-900 font-medium">
          <ShieldCheck className="w-4 h-4 text-purple-600 flex-shrink-0" />
          <span>
            Every plan includes 0% foreclosure charges. Pay off early anytime with ₹0 fee.
          </span>
        </div>
      </div>
    </div>
  );
}
