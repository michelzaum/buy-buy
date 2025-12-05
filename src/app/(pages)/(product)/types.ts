import { Prisma, Category, Product } from "@prisma/client";

export type ProductItemProps = {
  product: Prisma.ProductGetPayload<{
    include: {
      category: {
        select: {
          name: true;
        };
      };
    };
  }>;
  isSuggestedProduct?: boolean;
}

interface ListProducts extends Product {
  category: Pick<Category, 'name'>;
}

export type ProductListProps = {
  products: ListProducts[];
  isSuggestedProduct?: boolean;
}
