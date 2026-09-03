import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const brand = searchParams.get("brand");

    const where: Record<string, any> = {};
    if (category && category !== "all") {
      where.category = { equals: category };
    }
    if (brand && brand !== "all") {
      where.brand = { equals: brand };
    }

    const products = await prisma.product.findMany({
      where,
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
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch products from database",
        message: error?.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
