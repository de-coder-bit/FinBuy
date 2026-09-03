import React from "react";
import Link from "next/link";
import { ShieldCheck, Lock, Sparkles, ShoppingBag } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1 */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-700 to-indigo-600 flex items-center justify-center text-white font-bold">
                <ShoppingBag className="w-4 h-4 text-white" />
              </div>
              <span className="font-black text-xl text-white tracking-tight">FinBuy</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              India&apos;s smarter commerce platform powered by Mutual Fund backed credit. Buy the latest gadgets at zero or lowest interest without breaking your investments.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Digital Lien via CAMS / KFintech</span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Popular Devices</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/products/iphone-17-pro" className="hover:text-purple-300 transition-colors">
                  iPhone 17 Pro on Mutual Fund EMI
                </Link>
              </li>
              <li>
                <Link href="/products/samsung-s24-ultra" className="hover:text-purple-300 transition-colors">
                  Samsung Galaxy S24 Ultra
                </Link>
              </li>
              <li>
                <Link href="/products/google-pixel-9-pro" className="hover:text-purple-300 transition-colors">
                  Google Pixel 9 Pro
                </Link>
              </li>
              <li>
                <Link href="/products/macbook-pro-m4" className="hover:text-purple-300 transition-colors">
                  MacBook Pro 14&quot; M4
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Why FinBuy?</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <span className="text-purple-400">✓</span> Keep compounding your mutual funds
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-purple-400">✓</span> No credit score / CIBIL hit
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-purple-400">✓</span> 0% Foreclosure penalty
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-purple-400">✓</span> Up to ₹7,500 cashback credited
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60">
            <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              FinBuy Smart Commerce
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Full-Stack Dynamic Product &amp; Mutual Fund EMI portal with database backing, RESTful APIs, and responsive UI.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <Lock className="w-3.5 h-3.5 text-purple-400" />
              <span>Bank Grade 256-bit SSL Security</span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} FinBuy Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Terms of Service</span>
            <span>•</span>
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Lending Partners</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
