import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { success: false, error: "Product slug is required" },
        { status: 400 }
      );
    }

    // Try finding by slug first, then by id if not found
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
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error: any) {
    console.error("Error fetching product by slug:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch product",
        message: error?.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
