'use server';

import { db } from "@/lib/db";

interface GetFilteredProductsParams {
  category: string;
  price: {
    min: number;
    max: number;
  };
}

export async function getFilteredProducts(filter: GetFilteredProductsParams) {
  return db.product.findMany({
    where: {
      price: {
        gte: filter.price.min ? filter.price.min : 0,
        lte: filter.price.max ? filter.price.max : 100000,
      },
      category: {
        name: filter.category,
      },
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });
}
