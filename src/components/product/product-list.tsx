import { Prisma } from "@prisma/client";
import { ProductItem } from "./product-item";

interface ProductListProps {
  products: Prisma.ProductGetPayload<{
    include: {
      category: {
        select: {
          name: true;
        };
      };
    };
  }>[];
  isSuggestedProduct?: boolean;
}

export function ProductList({ products, isSuggestedProduct }: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:gap-8">
        <span>Nenhum produto disponível.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:gap-8">
      {products.map((product) => (
        <ProductItem isSuggestedProduct={isSuggestedProduct} key={product.id} product={product} />
      ))}
    </div>
  );
}
