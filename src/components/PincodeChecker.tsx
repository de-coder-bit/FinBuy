"use client";

import React, { useState } from "react";
import { Truck, CheckCircle2, Clock, MapPin } from "lucide-react";

export default function PincodeChecker() {
  const [pincode, setPincode] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length !== 6) {
      setResult("Please enter a valid 6-digit Indian PIN code");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResult(`Express Delivery available to ${pincode} by Tomorrow, 5 PM (Free Shipping & Transit Insurance)`);
    }, 400);
  };

  return (
    <div className="p-4 rounded-2xl bg-white border border-gray-200/90 shadow-sm">
      <div className="flex items-center gap-2 mb-2 text-xs font-bold text-gray-800">
        <Truck className="w-4 h-4 text-purple-600" />
        <span>Check Delivery &amp; Transit Insurance</span>
      </div>

      <form onSubmit={handleCheck} className="flex gap-2">
        <div className="relative flex-1">
          <MapPin className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            maxLength={6}
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter 6-digit PIN code"
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-1.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs transition-colors cursor-pointer"
        >
          {loading ? "Checking..." : "Check"}
        </button>
      </form>

      {result && (
        <div className="mt-2.5 flex items-start gap-1.5 text-xs text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
          <span>{result}</span>
        </div>
      )}
    </div>
  );
}
