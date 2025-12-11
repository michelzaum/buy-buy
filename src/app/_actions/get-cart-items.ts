'use server';

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function getCartItems() {
  const user = await auth();

  // Commented until implement a better approach to handle access to protected resources.
  // Cart-items screen might broke if user is not logged in.
  // if (!user) {
  //   throw new Error('Unauthorized');
  // }

  return await db.cart.findUnique({
    where: {
      userId: user?.id || '',
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
