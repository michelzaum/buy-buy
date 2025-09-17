'use server';

import { db } from "@/lib/db";

export async function deleteAllCartItems(userEmail: string) {
  const user = await db.user.findUnique({
    where: { email: userEmail },
    select: { id: true },
  });

  const cart = await db.cart.findUnique({
    where: { userId: user?.id },
  });

  return await db.cartItem.deleteMany({
    where: {
      cartId: cart?.id,
    },
  });
}
