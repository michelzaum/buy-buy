"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Prisma } from "@prisma/client";
import { toast } from "sonner";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { ProductList } from "@/components/product/product-list";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/formatCurrency";
import { useStore } from "@/store/store";
import { Header } from "@/components/header/header";
import { saveCartItems } from "@/app/_actions/save-cart-items";

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
  const router = useRouter();
  const [productQuantity, setProductQuantity] = useState(1);
  const { user, setSelectedProduct } = useStore();

  const MAX_PRODUCT_QUANTITY_ALLOWED = 20;
  const isMaxProductQuantityLimitReached = productQuantity === MAX_PRODUCT_QUANTITY_ALLOWED;

  function updateProductQuantityManually(quantity: number): void {
    if (quantity > MAX_PRODUCT_QUANTITY_ALLOWED) {
      setProductQuantity(MAX_PRODUCT_QUANTITY_ALLOWED);
      return;
    }

    setProductQuantity(quantity);
  }

  function incrementProductQuantity(): void {
    setProductQuantity((prevState) => {
      if (prevState === MAX_PRODUCT_QUANTITY_ALLOWED) {
        return prevState;
      }

      return prevState + 1;
    });
  }

  function decrementProductQuantity(): void {
    setProductQuantity((prevState) => {
      if (prevState === 1) {
        return prevState;
      }

      return prevState - 1;
    });
  }

  async function addToCart(): Promise<void> {
    setSelectedProduct({
      productId: product.id,
      quantity: productQuantity,
    });

    if (!user) {
      router.push('/sign-in');
      return;
    }

    await saveCartItems({
      productId: product.id,
      quantity: productQuantity,
      userEmail: user.email,
    });

    // TODO: We also need to save this information in database on
    // Cart table, so the user will be able to access the cart items
    // even if they leave the application. We also need to validate
    // the access token.

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
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full px-4">
        <Header />
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
            <ProductList isSuggestedProduct products={suggestedProducts} />
          </div>
      </div>
    </div>
  );
}
