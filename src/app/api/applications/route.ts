import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { variantId, planId, customerName, email, phone, panNumber } = body;

    if (!variantId || !planId || !customerName || !phone) {
      return NextResponse.json(
        { success: false, error: "Missing required application fields" },
        { status: 400 }
      );
    }

    // Verify variant and plan exist in database
    const variant = await prisma.productVariant.findUnique({
      where: { id: variantId },
      include: { product: true },
    });

    const plan = await prisma.eMIPlan.findUnique({
      where: { id: planId },
    });

    if (!variant || !plan) {
      return NextResponse.json(
        { success: false, error: "Invalid product variant or EMI plan" },
        { status: 404 }
      );
    }

    // Generate simulated KFintech/CAMS pledge reference ID & FinBuy Order ID
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const mfPledgeRef = `FINBUY-MF-PLG-${randomSuffix}`;
    const orderReference = `FINBUY-ORD-${Date.now().toString().slice(-6)}-${randomSuffix.toString().slice(0, 3)}`;

    const application = await prisma.application.create({
      data: {
        variantId,
        planId,
        customerName,
        email: email || `${phone}@customer.finbuy.in`,
        phone,
        panNumber: panNumber || "ABCDE1234F",
        status: "APPROVED",
        mfPledgeRef,
        orderReference,
      },
    });

    return NextResponse.json({
      success: true,
      message: "FinBuy Mutual Fund backed EMI application pre-approved successfully!",
      data: {
        applicationId: application.id,
        orderReference: application.orderReference,
        mfPledgeRef: application.mfPledgeRef,
        status: application.status,
        productName: variant.product.name,
        variantName: variant.name,
        tenureMonths: plan.tenureMonths,
        monthlyAmount: plan.monthlyAmount,
        interestRate: plan.interestRate,
        cashbackAmount: plan.cashbackAmount,
        totalPayable: plan.totalPayable,
        createdAt: application.createdAt,
      },
    });
  } catch (error: any) {
    console.error("Error creating EMI application:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process application",
        message: error?.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const applications = await prisma.application.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
    });
    return NextResponse.json({ success: true, count: applications.length, data: applications });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
