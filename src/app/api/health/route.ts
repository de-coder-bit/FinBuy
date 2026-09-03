import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const productCount = await prisma.product.count();
    const variantCount = await prisma.productVariant.count();
    const planCount = await prisma.eMIPlan.count();

    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      database: "connected",
      counts: {
        products: productCount,
        variants: variantCount,
        emiPlans: planCount,
      },
      service: "FinBuy Mutual Fund EMI Engine",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "unhealthy",
        database: "disconnected",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
