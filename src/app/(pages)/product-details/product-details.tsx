"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Prisma } from "@prisma/client";
import { toast } from "sonner";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { ProductList } from "@/components/product/product-list";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/formatCurrency";
import { useCartStore } from "@/store/CartStore";

interface ProductProps {
  product: Prisma.ProductGetPayload<{
    include: {
      category: {
        select: {
          name: true;
        };
      };
    };
  }>;
}

interface SuggestedProductProps {
  suggestedProducts: Prisma.ProductGetPayload<{
    include: {
      category: {
        select: {
          name: true;
        };
      };
    };
  }>[];
}

export function ProductDetailsComponent({
  suggestedProducts,
  product,
}: SuggestedProductProps & ProductProps) {
  const [productQuantity, setProductQuantity] = useState(1);
  const setSelectedProduct = useCartStore(
    (state) => state.setSelectedProduct
  );

  function incrementProductQuantity(): void {
    setProductQuantity((prevState) => prevState + 1);
  }

  function decrementProductQuantity(): void {
    setProductQuantity((prevState) => {
      if (prevState === 1) {
        return prevState;
      }

      return prevState - 1
    });
  }

  return (
    <div className="w-full flex justify-center">
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
                <span className="font-semibold">{productQuantity}</span>
                <button
                  className="flex justify-center flex-1 py-2 rounded-sm hover:cursor-pointer md:px-4"
                  onClick={incrementProductQuantity}
                >
                  <Plus />
                </button>
              </div>
              <Button
                size={"lg"}
                onClick={() => {
                  setSelectedProduct({
                    productId: product.id,
                    quantity: productQuantity,
                  });

                  toast.success('Produto adicionado ao carrinho!',
                    {
                      style: {
                        backgroundColor: 'green',
                        color: "white",
                        fontSize: '1rem',
                        fontWeight: 500,
                      }
                    }
                  )
                }}
                className="hover:cursor-pointer"
              >
                Adicionar ao carrinho
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full my-4">
          <span className="flex py-6 font-medium">
            Outros produtos da categoria {product.category.name}
          </span>
          <ProductList products={suggestedProducts} />
        </div>
      </div>
    </div>
  );
}
