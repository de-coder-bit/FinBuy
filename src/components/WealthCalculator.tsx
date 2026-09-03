"use client";

import React, { useState } from "react";
import { TrendingUp, Sparkles, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";

interface WealthCalculatorProps {
  productPrice?: number;
  productName?: string;
}

export default function WealthCalculator({
  productPrice = 127400,
  productName = "iPhone 17 Pro",
}: WealthCalculatorProps) {
  const [portfolioValue, setPortfolioValue] = useState<number>(350000);
  const [expectedCagr, setExpectedCagr] = useState<number>(14);
  const [tenureYears, setTenureYears] = useState<number>(2); // 24 months

  // Calculate wealth if NOT liquidated (remains invested)
  // Future Value = P * (1 + r)^t
  const futureValue = Math.round(
    portfolioValue * Math.pow(1 + expectedCagr / 100, tenureYears)
  );
  const returnsEarned = futureValue - portfolioValue;

  // If user had sold mutual funds to buy gadget in cash:
  const liquidatedPortfolio = portfolioValue - productPrice;
  const liquidatedFutureValue = Math.round(
    liquidatedPortfolio * Math.pow(1 + expectedCagr / 100, tenureYears)
  );
  const wealthLostIfSold = futureValue - liquidatedFutureValue;
  const netAdvantage = wealthLostIfSold;

  return (
    <div className="bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 border border-purple-800/60 shadow-2xl relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>FinBuy Wealth Simulator</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            See How Much You Earn While Paying EMI!
          </h3>
          <p className="text-xs text-purple-200/70">
            Compare keeping your Mutual Funds invested vs selling them to buy in cash.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-2xl border border-white/10 text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-purple-200">100% Zero Liquidation</span>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 mb-6">
        {/* Sliders Box */}
        <div className="space-y-4 bg-white/5 p-5 rounded-2xl border border-white/10">
          {/* Portfolio Value */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-1.5">
              <span className="text-purple-200">Your Mutual Fund Balance:</span>
              <span className="text-emerald-400 font-extrabold text-sm">
                ₹{portfolioValue.toLocaleString("en-IN")}
              </span>
            </div>
            <input
              type="range"
              min={150000}
              max={2000000}
              step={25000}
              value={portfolioValue}
              onChange={(e) => setPortfolioValue(Number(e.target.value))}
              className="w-full h-2 bg-purple-900/80 rounded-lg appearance-none cursor-pointer accent-purple-400"
            />
            <div className="flex justify-between text-[10px] text-purple-300/60 mt-1">
              <span>₹1.5 Lakh</span>
              <span>₹10 Lakh</span>
              <span>₹20 Lakh</span>
            </div>
          </div>

          {/* Expected CAGR */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-1.5">
              <span className="text-purple-200">Expected MF Annual Return (CAGR):</span>
              <span className="text-purple-300 font-extrabold text-sm">{expectedCagr}% p.a.</span>
            </div>
            <input
              type="range"
              min={10}
              max={20}
              step={1}
              value={expectedCagr}
              onChange={(e) => setExpectedCagr(Number(e.target.value))}
              className="w-full h-2 bg-purple-900/80 rounded-lg appearance-none cursor-pointer accent-purple-400"
            />
            <div className="flex justify-between text-[10px] text-purple-300/60 mt-1">
              <span>10% (Conservative)</span>
              <span>14% (Historic Nifty 50)</span>
              <span>20% (Midcap)</span>
            </div>
          </div>

          {/* Tenure Switcher */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-2">
              <span className="text-purple-200">EMI Tenure:</span>
              <span className="text-white font-bold">{tenureYears * 12} Months</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((yr) => (
                <button
                  key={yr}
                  onClick={() => setTenureYears(yr)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                    tenureYears === yr
                      ? "bg-purple-600 text-white border-purple-400 shadow-md"
                      : "bg-white/5 text-purple-200 border-white/10 hover:bg-white/10"
                  }`}
                >
                  {yr * 12} Months
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Wealth Outcome Summary Card */}
        <div className="bg-gradient-to-br from-purple-900/80 to-indigo-900/80 p-5 rounded-2xl border border-purple-500/30 flex flex-col justify-between">
          <div>
            <div className="text-xs text-purple-200 font-semibold mb-1">
              Returns Earned on Your MF in {tenureYears * 12} Months:
            </div>
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">
              + ₹{returnsEarned.toLocaleString("en-IN")}
            </div>

            <div className="mt-4 pt-4 border-t border-purple-700/60 space-y-2 text-xs">
              <div className="flex justify-between text-purple-200">
                <span>Product Price ({productName}):</span>
                <span className="font-bold text-white">₹{productPrice.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-purple-200">
                <span>Opportunity Cost Saved by Not Selling:</span>
                <span className="font-bold text-emerald-300">
                  + ₹{netAdvantage.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-emerald-500/20 border border-emerald-400/40 rounded-xl text-xs text-emerald-200 font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>
              Your MF earnings (₹{returnsEarned.toLocaleString("en-IN")}) surpass the device cost!
              Your gadget pays for itself!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
