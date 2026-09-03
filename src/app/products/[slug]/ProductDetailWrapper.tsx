"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDetailView from "@/components/ProductDetailView";
import MutualFundExplainer from "@/components/MutualFundExplainer";
import { Product } from "@/types";

interface ProductDetailWrapperProps {
  product: Product;
}

export default function ProductDetailWrapper({ product }: ProductDetailWrapperProps) {
  const [isExplainerOpen, setIsExplainerOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onOpenExplainer={() => setIsExplainerOpen(true)} />
      <main className="flex-1 bg-slate-50/60">
        <ProductDetailView
          product={product}
          onOpenExplainer={() => setIsExplainerOpen(true)}
        />
      </main>
      <Footer />
      <MutualFundExplainer
        isOpen={isExplainerOpen}
        onClose={() => setIsExplainerOpen(false)}
      />
    </div>
  );
}
