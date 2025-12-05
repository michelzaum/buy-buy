import { Prisma } from "@prisma/client";

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
