'use server';

import { db } from "@/lib/db";

export async function deleteCartItem(productId: string) {
  return db.cartItem.deleteMany({
    where: { productId },
  });
}
