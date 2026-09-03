"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, ShieldCheck, X } from "lucide-react";

const RECENT_PURCHASES = [
  { name: "Rahul S.", city: "Bengaluru", product: "iPhone 17 Pro", tenure: "6 Months 0% EMI", fund: "Parag Parikh Flexi Cap" },
  { name: "Priya M.", city: "Mumbai", product: "Samsung Galaxy S24 Ultra", tenure: "12 Months 0% EMI", fund: "HDFC Top 100" },
  { name: "Amit K.", city: "Delhi NCR", product: "Google Pixel 9 Pro", tenure: "3 Months 0% EMI", fund: "SBI Bluechip" },
  { name: "Sneha D.", city: "Hyderabad", product: "MacBook Pro 14\" M4", tenure: "24 Months 0% EMI", fund: "Axis Small Cap" },
  { name: "Vikram N.", city: "Pune", product: "iPhone 17 Pro 512GB", tenure: "6 Months 0% EMI", fund: "Mirae Asset Large Cap" },
];

export default function LivePurchaseTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    // Show after 3s
    const initialTimer = setTimeout(() => {
      setVisible(true);
    }, 3000);

    // Rotate every 8s
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % RECENT_PURCHASES.length);
        setVisible(true);
      }, 600);
    }, 8000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [dismissed]);

  if (dismissed) return null;

  const current = RECENT_PURCHASES[currentIndex];

  return (
    <div
      className={`fixed bottom-5 left-5 z-40 max-w-xs sm:max-w-sm transition-all duration-500 transform ${
        visible ? "translate-y-0 opacity-100 scale-100" : "translate-y-6 opacity-0 scale-95 pointer-events-none"
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-purple-200/90 flex items-start gap-3 relative glow-purple">
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 p-1"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
        </div>

        <div className="text-xs pr-4">
          <div className="font-bold text-gray-900">
            {current.name} from {current.city}
          </div>
          <div className="text-gray-600 mt-0.5">
            Pledged <strong>{current.fund}</strong> for <strong>{current.product}</strong>
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-[10px] font-bold text-emerald-600">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>Pre-approved via FinBuy ({current.tenure})</span>
          </div>
        </div>
      </div>
    </div>
  );
}
