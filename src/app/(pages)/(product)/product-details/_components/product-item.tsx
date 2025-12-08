import Image from "next/image";
import { Loader, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/formatCurrency";
import { useProduct } from "../../useProduct";
import { ProductProps } from "../../types";

export function ProductItem({ product }: ProductProps) {
  const {
    isLoading,
    isMaxProductQuantityLimitReached,
    productQuantity,
    addToCart,
    decrementProductQuantity,
    incrementProductQuantity,
    updateProductQuantityManually,
  } = useProduct({ product });

  return (
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
  )
}
