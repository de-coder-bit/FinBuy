"use client";

import React, { useState } from "react";
import {
  X,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  CreditCard,
  User,
  Phone,
  FileText,
  ArrowRight,
  Sparkles,
  Loader2,
  Lock,
  ShoppingBag,
  Download,
  Calendar,
} from "lucide-react";
import { EMIPlan, ProductVariant, Product } from "@/types";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  variant: ProductVariant;
  plan: EMIPlan;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  product,
  variant,
  plan,
}: CheckoutModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    name: "Deepak Verma",
    phone: "9876543210",
    pan: "ABCDE1234F",
    email: "deepak.verma@example.com",
    selectedFund: "Parag Parikh Flexi Cap Fund - Direct Growth (NAV: ₹78.4, Portfolio: ₹4,20,000)",
  });
  const [loading, setLoading] = useState(false);
  const [orderResult, setOrderResult] = useState<any>(null);

  if (!isOpen) return null;

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          variantId: variant.id,
          planId: plan.id,
          customerName: formData.name,
          phone: formData.phone,
          email: formData.email,
          panNumber: formData.pan,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setOrderResult(json.data);
        setStep(3);
      } else {
        alert(json.error || "Failed to process application");
      }
    } catch (err: any) {
      alert("Error submitting application: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-purple-100 relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Progress Indicator */}
        <div className="flex items-center gap-2 mb-6">
          <div
            className={`flex-1 h-1.5 rounded-full ${
              step >= 1 ? "bg-purple-600" : "bg-gray-200"
            }`}
          />
          <div
            className={`flex-1 h-1.5 rounded-full ${
              step >= 2 ? "bg-purple-600" : "bg-gray-200"
            }`}
          />
          <div
            className={`flex-1 h-1.5 rounded-full ${
              step === 3 ? "bg-emerald-500" : "bg-gray-200"
            }`}
          />
        </div>

        {/* STEP 1: Plan Summary */}
        {step === 1 && (
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900">Review Your FinBuy Plan</h3>
                <p className="text-xs text-gray-500">Mutual Fund backed EMI breakdown</p>
              </div>
            </div>

            {/* Product Mini Card */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-5">
              <img
                src={variant.imageUrl}
                alt={product.name}
                className="w-16 h-16 object-contain rounded-xl bg-white p-1 border border-slate-200"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-extrabold text-sm text-gray-900">{product.name}</h4>
                <p className="text-xs text-gray-600">
                  {variant.storage} • {variant.colorName}
                </p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-black text-sm text-gray-900">
                    ₹{variant.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs text-gray-400 line-through">
                    ₹{variant.mrp.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>

            {/* Selected EMI Plan Details */}
            <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-5 mb-5 space-y-3 text-xs">
              <div className="flex justify-between items-center pb-2.5 border-b border-purple-200/60">
                <span className="text-gray-600 font-medium">Monthly Installment</span>
                <span className="font-extrabold text-base text-purple-900">
                  ₹{plan.monthlyAmount.toLocaleString("en-IN")} / mo
                </span>
              </div>
              <div className="flex justify-between items-center pb-2.5 border-b border-purple-200/60">
                <span className="text-gray-600 font-medium">Loan Tenure</span>
                <span className="font-bold text-gray-900">{plan.tenureMonths} Months</span>
              </div>
              <div className="flex justify-between items-center pb-2.5 border-b border-purple-200/60">
                <span className="text-gray-600 font-medium">Interest Rate</span>
                <span className="font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                  {plan.interestRate === 0 ? "0% (No Cost EMI)" : `${plan.interestRate}% p.a.`}
                </span>
              </div>
              {plan.cashbackAmount > 0 && (
                <div className="flex justify-between items-center pb-2.5 border-b border-purple-200/60">
                  <span className="text-gray-600 font-medium">Cashback on 1st EMI</span>
                  <span className="font-bold text-emerald-600">
                    + ₹{plan.cashbackAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center pt-1">
                <span className="text-gray-700 font-bold">Total Amount Payable</span>
                <span className="font-extrabold text-sm text-gray-900">
                  ₹{plan.totalPayable.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* MF Backing Banner */}
            <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-medium mb-6">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>
                Zero liquidation! Your mutual funds remain invested and continue earning returns.
              </span>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3.5 px-6 rounded-xl font-extrabold text-white bg-purple-700 hover:bg-purple-800 transition-colors shadow-lg shadow-purple-600/25 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Continue to Instant Verification</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: Customer Details & MF Pledge */}
        {step === 2 && (
          <form onSubmit={handleApply}>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900">Instant Digital Verification</h3>
                <p className="text-xs text-gray-500">100% Paperless • 2-minute pledge setup</p>
              </div>
            </div>

            <div className="space-y-4 mb-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Full Name (As per PAN)
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                    placeholder="Enter full name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Mobile Number (OTP linked)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                      placeholder="10 digit number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    PAN Card Number
                  </label>
                  <div className="relative">
                    <FileText className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={formData.pan}
                      onChange={(e) =>
                        setFormData({ ...formData, pan: e.target.value.toUpperCase() })
                      }
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none uppercase"
                      placeholder="ABCDE1234F"
                    />
                  </div>
                </div>
              </div>

              {/* Mutual Fund Pledge Selector */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Select Mutual Fund Portfolio to Pledge
                </label>
                <select
                  value={formData.selectedFund}
                  onChange={(e) => setFormData({ ...formData, selectedFund: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-purple-300 bg-purple-50/50 text-xs font-medium text-gray-800 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                >
                  <option value="Parag Parikh Flexi Cap Fund - Direct Growth (NAV: ₹78.4, Portfolio: ₹4,20,000)">
                    Parag Parikh Flexi Cap Fund (Available: ₹4,20,000)
                  </option>
                  <option value="HDFC Top 100 Fund - Direct Growth (NAV: ₹1,120, Portfolio: ₹2,80,000)">
                    HDFC Top 100 Fund (Available: ₹2,80,000)
                  </option>
                  <option value="SBI Bluechip Fund - Direct Growth (NAV: ₹85.2, Portfolio: ₹3,10,000)">
                    SBI Bluechip Fund (Available: ₹3,10,000)
                  </option>
                </select>
                <p className="text-[11px] text-gray-500 mt-1">
                  ✓ Digital lien marking via CAMS/KFintech. No sale or redemptions triggered.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-3 px-5 rounded-xl font-bold text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3.5 px-6 rounded-xl font-extrabold text-white bg-purple-700 hover:bg-purple-800 transition-colors shadow-lg shadow-purple-600/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Verifying with CAMS / KFintech...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Approve &amp; Place Order</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Order Confirmation */}
        {step === 3 && orderResult && (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
              FinBuy EMI Pre-Approved &amp; Pledged
            </span>

            <h3 className="text-2xl font-black text-gray-900 mt-3">Congratulations!</h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-md mx-auto">
              Your mutual fund backed EMI application for <strong>{product.name}</strong> is
              successful.
            </p>

            {/* Order Receipt Box */}
            <div className="mt-6 p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2.5">
              <div className="flex justify-between">
                <span className="text-gray-500">Order Reference:</span>
                <span className="font-mono font-bold text-gray-900">
                  {orderResult.orderReference}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">MF Lien Reference:</span>
                <span className="font-mono font-bold text-purple-700">
                  {orderResult.mfPledgeRef}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Monthly EMI:</span>
                <span className="font-bold text-gray-900">
                  ₹{orderResult.monthlyAmount.toLocaleString("en-IN")} x {orderResult.tenureMonths}{" "}
                  months
                </span>
              </div>
              {orderResult.cashbackAmount > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Cashback Credited:</span>
                  <span className="font-bold text-emerald-600">
                    ₹{orderResult.cashbackAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-slate-200">
                <span className="text-gray-700 font-bold">Delivery Status:</span>
                <span className="font-bold text-emerald-700">Dispatched in 24 Hours</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => window.print()}
                className="py-3 px-4 rounded-xl font-bold text-xs text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download Sanction Letter</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3.5 px-6 rounded-xl font-bold text-white bg-purple-700 hover:bg-purple-800 transition-colors shadow-lg shadow-purple-600/25 cursor-pointer"
              >
                Done &amp; Return to Store
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
