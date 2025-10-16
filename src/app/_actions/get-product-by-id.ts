'use server';

import { db } from "@/lib/db";

export async function getProductById(productIds: string[]) {
  return db.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
    select: {
      name: true,
      price: true,
      imageUrl: true,
      cartItems: {
        select: {
          quantity: true,
        },
      }
    },
  });
}
