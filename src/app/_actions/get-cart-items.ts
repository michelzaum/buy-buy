'use server';

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface CartItemsProps {
  prodcutIds: string[];
}

export async function getCartItems({ prodcutIds }: CartItemsProps) {
  const user = await auth();

  if (!user) {
    return NextResponse.json({
      error: 'Unauthorized',
    }, {
      status: 401,
    });
  }

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
