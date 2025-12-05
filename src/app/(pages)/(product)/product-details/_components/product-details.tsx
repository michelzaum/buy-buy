"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProductList } from "@/app/(pages)/(product)/product-list/_components/product-list";
import { Header } from "@/components/layout/header/header";
import { ProductItem } from "./product-item";
import { useProduct } from "../../useProduct";
import { ProductProps, SuggestedProductProps } from "../../types";

export function ProductDetailsComponent({
  suggestedProducts,
  product,
}: SuggestedProductProps & ProductProps) {
  const { isUserAuthenticated } = useProduct({ product });

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full px-4">
        <Header isAuthenticated={isUserAuthenticated} />
      </div>
      <div className="w-full flex flex-col items-center gap-6 px-6 md:max-w-9/12">
        <Link
          href="/"
          className="w-full flex items-center justify-self-start gap-2"
        >
          <ArrowLeft />
          <span>Voltar</span>
        </Link>
        <ProductItem product={product} />
        <div className="w-full my-4">
          <span className="flex py-6 font-medium">
            Outros produtos da categoria {product.category.name}
          </span>
          <ProductList isSuggestedProduct products={suggestedProducts} />
        </div>
      </div>
    </div>
  );
}
