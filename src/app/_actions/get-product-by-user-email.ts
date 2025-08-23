"use server";

import { db } from "@/lib/db";

export async function getProductsByUserEmail(userEmail: string) {
  return await db.cart.findMany({
    where: {
      user: {
        email: userEmail,
      },
    },
    select: {
      items: {
        select: {
          productId: true,
        },
      },
    },
  });
}
