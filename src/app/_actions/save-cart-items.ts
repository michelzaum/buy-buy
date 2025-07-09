"use server";

import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface SaveCartItemsProps {
  productId: string;
  quantity: number;
  userEmail: string;
}

export async function saveCartItems({ productId, quantity, userEmail }: SaveCartItemsProps) {
  const user = await db.user.findUnique({
    where: {
      email: userEmail,
    },
    select: {
      id: true,
    },
  });

  if (!user?.id) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 401 },
    );
  }

  const userCart = await db.cart.create({
    data: {
      userId: user.id,
    },
  });

  return await db.cartItem.create({
    data: {
      productId,
      quantity,
      cartId: userCart.id,
    },
  });
}
