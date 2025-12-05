import { useStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MAX_PRODUCT_QUANTITY_ALLOWED } from "./contants";
import { saveCartItems } from "@/app/_actions/save-cart-items";
import { toast } from "sonner";
import { ProductProps } from "./types";

export function useProduct({ product }: ProductProps) {
  const router = useRouter();
  const [productQuantity, setProductQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { user, setSelectedProduct, isUserAuthenticated } = useStore();

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
    if (!user) {
      setSelectedProduct({
        productId: product.id,
        quantity: productQuantity,
        wasAddedByAuthenticatedUser: false,
      });

      router.push('/sign-in');
      return;
    }
    setIsLoading(true);

    await saveCartItems({
      productId: product.id,
      quantity: productQuantity,
      userEmail: user.email,
    });

    setSelectedProduct({
      productId: product.id,
      quantity: productQuantity,
      wasAddedByAuthenticatedUser: true,
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

    setIsLoading(false);
  }

  return {
    isLoading,
    isUserAuthenticated,
    productQuantity,
    isMaxProductQuantityLimitReached,
    addToCart,
    decrementProductQuantity,
    updateProductQuantityManually,
    incrementProductQuantity,
  }
}
