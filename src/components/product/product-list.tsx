'use client';

import { useState, useEffect } from "react";
import { Category, Product } from "@prisma/client";

import { ProductItem } from "./product-item";

interface ListProducts extends Product {
 category: Pick<Category, 'name'>;
}

interface ProductListProps {
  products: ListProducts[];
  isSuggestedProduct?: boolean;
}

export function ProductList({ products, isSuggestedProduct }: ProductListProps) {
  const [filteredProducts, setFilteredProducts] = useState<ListProducts[]>(products);

  if (products.length === 0) {
    return (
      <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:gap-8">
        <span>Nenhum produto disponível.</span>
      </div>
    );
  }

  const filter = '';

  function handleProductFilter(): void {
    if (filter) {
      const filteredProducts = products.filter(product => product.category.name === filter);
      setFilteredProducts(filteredProducts)
    }
  }

  useEffect(() => {
    handleProductFilter();
  }, [filter]);

  return (
    <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:gap-8">
      {filteredProducts.map((product) => (
        <ProductItem isSuggestedProduct={isSuggestedProduct} key={product.id} product={product} />
      ))}
    </div>
  );
}
