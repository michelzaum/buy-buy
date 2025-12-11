"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/header/header";
import { ProductItem } from "./product-item";
import { useProduct } from "../../useProduct";
import { ProductProps, SuggestedProductProps } from "../../types";
import { SuggestedProducts } from "./suggested-products";

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
        <SuggestedProducts product={product} suggestedProducts={suggestedProducts}  />
      </div>
    </div>
  );
}
