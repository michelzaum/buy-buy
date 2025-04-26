'use server';

import { db } from "@/lib/db";

interface CartItemsProps {
  prodcutIds: string[];
}

export async function getCartItems({ prodcutIds }: CartItemsProps) {
  return await db.product.findMany({
    where: {
      id: {
        in: [
          ...prodcutIds,
        ],
      },
    },
  });
}
