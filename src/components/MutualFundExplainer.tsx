"use client";

import React from "react";
import { X, TrendingUp, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";

interface MutualFundExplainerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MutualFundExplainer({ isOpen, onClose }: MutualFundExplainerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-purple-100 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-gray-900">
              How FinBuy Mutual Fund EMI Works
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">
              Smart financing that keeps your mutual funds growing while you purchase gadgets.
            </p>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Traditional Credit Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2 text-rose-600 font-bold text-sm">
              <span>✕ Traditional Credit Card EMI</span>
            </div>
            <ul className="text-xs text-gray-600 space-y-2">
              <li className="flex items-start gap-1.5">
                <span className="text-rose-500">•</span> High 14%–24% interest rates
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-rose-500">•</span> Blocks your credit limit
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-rose-500">•</span> Heavy foreclosure &amp; pre-closure penalty charges
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-rose-500">•</span> Hard CIBIL credit score inquiry
              </li>
            </ul>
          </div>

          {/* FinBuy MF Backed EMI */}
          <div className="bg-purple-50/80 border border-purple-200 rounded-2xl p-4 relative overflow-hidden">
            <div className="absolute top-2 right-2">
              <span className="bg-purple-700 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Recommended
              </span>
            </div>
            <div className="flex items-center gap-2 mb-2 text-purple-900 font-bold text-sm">
              <span>✓ FinBuy Mutual Fund EMI</span>
            </div>
            <ul className="text-xs text-purple-950 space-y-2">
              <li className="flex items-start gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span><strong>0% No-Cost EMI</strong> or lowest interest (10.5%)</span>
              </li>
              <li className="flex items-start gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span>Your Mutual Funds keep earning NAV returns</span>
              </li>
              <li className="flex items-start gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span><strong>Zero foreclosure fee</strong> — pay anytime</span>
              </li>
              <li className="flex items-start gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span>Instant paperless pledge via CAMS / KFintech</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 3 Step Process */}
        <div className="bg-gradient-to-r from-purple-950 to-indigo-950 text-white rounded-2xl p-5 mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-purple-200 mb-3">
            3 Simple Steps to Get Device
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-white/10 p-3 rounded-xl">
              <div className="font-bold text-purple-300 text-sm mb-1">1. Select Device</div>
              <p className="text-purple-100/80">Choose your device variant &amp; preferred EMI tenure (3 to 60 mos).</p>
            </div>
            <div className="bg-white/10 p-3 rounded-xl">
              <div className="font-bold text-purple-300 text-sm mb-1">2. Digital Lien</div>
              <p className="text-purple-100/80">One-click lien mark your existing MF units with CAMS/KFintech via OTP.</p>
            </div>
            <div className="bg-white/10 p-3 rounded-xl">
              <div className="font-bold text-purple-300 text-sm mb-1">3. Instant Dispatch</div>
              <p className="text-purple-100/80">Loan approved instantly, gadget shipped, cashback credited to bank.</p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-purple-700 hover:bg-purple-800 transition-colors shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Explore FinBuy Devices</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
