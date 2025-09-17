'use server';

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function getCartItems() {
  const user = await auth();

  if (!user) {
    throw new Error('Unauthorized');
  }

  return await db.cart.findUnique({
    where: {
      userId: user.id,
    },
    select: {
      items: {
        select: {
          id: true,
          product: true,
          quantity: true,
          productId: false,
        },
      },
    },
  });
}
