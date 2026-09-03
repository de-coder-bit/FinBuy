import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductDetailWrapper from "./ProductDetailWrapper";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) {
    return {
      title: "Product Not Found | 1Fi Store",
    };
  }

  return {
    title: `${product.name} on Mutual Fund EMI | 1Fi Store`,
    description: `Buy ${product.name} with 0% Interest EMI backed by your mutual funds without selling investments.`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  let product = await prisma.product.findUnique({
    where: { slug },
    include: {
      variants: {
        include: {
          emiPlans: {
            orderBy: {
              tenureMonths: "asc",
            },
          },
        },
      },
    },
  });

  if (!product) {
    // Try id lookup
    product = await prisma.product.findUnique({
      where: { id: slug },
      include: {
        variants: {
          include: {
            emiPlans: {
              orderBy: {
                tenureMonths: "asc",
              },
            },
          },
        },
      },
    });
  }

  if (!product) {
    notFound();
  }

  return <ProductDetailWrapper product={product as any} />;
}
