'use server';

import { db } from "@/lib/db";
import { MAX_PRODUCT_PRICE, MIN_PRODUCT_PRICE } from "@/utils/constants";

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
        gte: filter.price.min ? filter.price.min : MIN_PRODUCT_PRICE,
        lte: filter.price.max ? filter.price.max : MAX_PRODUCT_PRICE,
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
