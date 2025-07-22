"use server";

import { NextResponse } from "next/server";
import { db } from "@/lib/db";

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

  // TODO: Analyze the possibility of moving the logic to create a cart
  // In register user, as all the customer users will need to have a cart,
  // So maybe would be better to already created one when the user creates an account.
  let userCartId = "";
  const userCart = await db.cart.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (userCart) {
    userCartId = userCart.id;
  }

  if (!userCart) {
    const createdUserCart = await db.cart.create({
      data: {
        userId: user.id,
      },
    });

    userCartId = createdUserCart.id;
  }

  return await db.cartItem.create({
    data: {
      productId,
      quantity,
      cartId: userCartId,
    },
  });
}
