"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Loader, Minus, Plus } from "lucide-react";
import { ProductList } from "@/app/(pages)/(product)/product-list/_components/product-list";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/formatCurrency";
import { Header } from "@/components/layout/header/header";
import { useProduct } from "../../useProduct";
import { ProductProps, SuggestedProductProps } from "../../types";

export function ProductDetailsComponent({
  suggestedProducts,
  product,
}: SuggestedProductProps & ProductProps) {
  const {
    isLoading,
    isUserAuthenticated,
    productQuantity,
    isMaxProductQuantityLimitReached,
    addToCart,
    decrementProductQuantity,
    incrementProductQuantity,
    updateProductQuantityManually,
  } = useProduct({ product });

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
          <div className="h-full w-full lg:flex md:gap-6 md:max-w-5xl rounded-2xl">
            <div className="relative min-h-96 w-full rounded-2xl">
              <Image
                alt="Product image"
                src={product.imageUrl}
                fill
                className="object-contain rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-3 mt-4">
              <div className="flex flex-col gap-1">
                <strong className="text-2xl">{product.name}</strong>
                <span className="text-base">{product.description}</span>
              </div>
              <span className="text-xl font-semibold">
                {formatCurrency(product.price)}
              </span>
              <div className="w-full flex items-center gap-2 mt-4">
                <div className="w-full flex justify-center items-center gap-3 border rounded-lg max-w-36">
                <button
                  className="flex justify-center flex-1 py-2 rounded-sm hover:cursor-pointer md:px-4"
                  onClick={decrementProductQuantity}
                  disabled={productQuantity === 1}
                >
                  <Minus className={`${productQuantity === 1 ? 'text-gray-300' : ''} transition-colors duration-200 ease-in-out`} />
                </button>
                <input
                  value={productQuantity}
                  className="w-6 text-center font-semibold"
                  onChange={(event) => updateProductQuantityManually(Number(event.target.value))}
                />
                <button
                  disabled={isMaxProductQuantityLimitReached}
                  className="flex justify-center flex-1 py-2 rounded-sm hover:cursor-pointer md:px-4"
                  onClick={incrementProductQuantity}
                >
                  <Plus className={`${isMaxProductQuantityLimitReached ? 'text-gray-300' : ''} transition-colors duration-200 ease-in-out`}  />
                </button>
                </div>
                <Button
                  size={"lg"}
                  onClick={addToCart}
                  className="hover:cursor-pointer min-w-48"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader className="animate-spin" />
                  ) : (
                    <span>
                      Adicionar ao carrinho
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
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
