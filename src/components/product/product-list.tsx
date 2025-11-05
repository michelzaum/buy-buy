'use client';

import { useEffect } from "react";
import { Category, Product } from "@prisma/client";

import { ProductItem } from "./product-item";
import { useStore } from "@/store/store";

interface ListProducts extends Product {
  category: Pick<Category, 'name'>;
}

interface ProductListProps {
  products: ListProducts[];
  isSuggestedProduct?: boolean;
}

export function ProductList({ products, isSuggestedProduct }: ProductListProps) {
  const { setFilteredProducts, filteredProducts } = useStore();

  if (products.length === 0) {
    return (
      <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:gap-8">
        <span>Nenhum produto disponível.</span>
      </div>
    );
  }

  useEffect(() => {
    setFilteredProducts(products);
  }, []);

  return (
    <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:gap-8">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductItem isSuggestedProduct={isSuggestedProduct} key={product.id} product={product} />
        ))
      ) : (
        <div className="flex flex-col gap-4 px-1 py-4 md:flex-row md:flex-wrap md:gap-8">
          <span>Nenhum produto encontrado para esse filtro.</span>
        </div>
      )}
    </div>
  );
}
