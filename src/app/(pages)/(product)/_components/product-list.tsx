'use client';

import { useEffect } from "react";

import { useStore } from "@/store/store";
import { ProductItem } from "./product-item";
import { EmptyProductList } from "./empty-product-list";
import { NoProductFound } from "./no-product-found";
import { ProductListProps } from "../types";

export function ProductList({ products, isSuggestedProduct }: ProductListProps) {
  const { setFilteredProducts, filteredProducts } = useStore();

  if (products.length === 0) {
    return (
      <NoProductFound />
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
        <EmptyProductList />
      )}
    </div>
  );
}
