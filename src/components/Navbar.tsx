"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Sparkles, TrendingUp, Menu, X, ArrowUpRight, ShoppingBag } from "lucide-react";

interface NavbarProps {
  onOpenExplainer?: () => void;
}

export default function Navbar({ onOpenExplainer }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo - FinBuy */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-800 via-purple-700 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl tracking-tight text-gray-900 group-hover:text-purple-700 transition-colors">
                  Fin<span className="text-purple-700">Buy</span>
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                  MF EMI
                </span>
              </div>
              <span className="text-[10px] text-gray-500 -mt-1 hidden sm:inline">
                Zero Cost Gadgets Backed by Mutual Funds
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-semibold text-gray-700 hover:text-purple-700 transition-colors"
            >
              All Devices
            </Link>
            <button
              onClick={onOpenExplainer}
              className="text-sm font-semibold text-gray-700 hover:text-purple-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <span>How FinBuy Works</span>
            </button>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>0% Foreclosure Penalty</span>
            </div>
          </nav>

          {/* Right Action */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenExplainer}
              className="text-xs font-bold bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-800 hover:to-indigo-700 text-white px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-md shadow-purple-600/20 hover:scale-[1.02] cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>FinBuy Advantage</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-gray-200 bg-white px-4 pt-2 pb-4 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-gray-700 hover:text-purple-700"
          >
            All Devices
          </Link>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenExplainer?.();
            }}
            className="w-full text-left py-2 text-sm font-semibold text-gray-700 hover:text-purple-700 flex items-center gap-2"
          >
            <TrendingUp className="w-4 h-4 text-purple-600" />
            How FinBuy Works
          </button>
          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
            <span className="flex items-center gap-1 text-emerald-700 font-medium">
              <ShieldCheck className="w-4 h-4" /> RBI &amp; SEBI Compliant
            </span>
            <span className="text-purple-700 font-bold">FinBuy Pre-approved</span>
          </div>
        </div>
      )}
    </header>
  );
}
