'use server';

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function getCartItems() {
  const user = await auth();

  if (!user) {
    return NextResponse.json({
      error: 'Unauthorized',
    }, {
      status: 401,
    });
  }

  return await db.cart.findUnique({
    where: {
      userId: user.id,
    },
    select: {
      items: {
        select: {
          product: true,
          quantity: true,
          productId: false,
        },
      },
    },
  });
}
