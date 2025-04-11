import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const response = await db.product.create({
    data: body,
  });

  return NextResponse.json({ response }, { status: 201 });
}
