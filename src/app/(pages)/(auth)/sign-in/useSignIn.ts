import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

import { getProductsByUserEmail } from "@/app/_actions/get-product-by-user-email";
import { saveCartItems } from "@/app/_actions/save-cart-items";
import { useStore } from "@/store/store";

import { schema } from "./schema";
import { FormData, SelectedProduct, UserProduct } from "./types";

export function useSign() {
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, selectedProducts } = useStore();

  function formatUserProducts(userProducts: { productId: string }[]) {
    return userProducts.map((product) => product.productId);
  }

  async function saveCartItemsByNotAuthenticaedUser(
    selectedProducts: SelectedProduct[],
    userEmail: string,
    userProducts?: UserProduct[],
  ) {
    const userProductsIds = formatUserProducts(userProducts ?? []);

    for (let i = 0; selectedProducts.length > i; i++) {
      let userProductIndex = 0;
      if (userProducts && userProducts?.length > 0) {
        userProductIndex = userProducts.findIndex(
          (product) => product.productId === selectedProducts[i].productId,
        );
      }

      if (!selectedProducts[i].wasAddedByAuthenticatedUser) {
        if (userProductsIds.length > 0 && userProductsIds.includes(selectedProducts[i].productId)) {

          if (!!(userProductIndex > -1 && userProducts?.length && userProducts.length > 0)) {
            const finalQuantity = selectedProducts[i].quantity - userProducts[userProductIndex].quantity;

            await saveCartItems({
              productId: selectedProducts[i].productId,
              quantity: finalQuantity,
              userEmail,
            });
          }
        } else {
          await saveCartItems({
            productId: selectedProducts[i].productId,
            quantity: selectedProducts[i].quantity,
            userEmail,
          });
        }
      }
    }
  }

  const handleSubmit = form.handleSubmit(async (formData): Promise<void> => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('/api/auth/sign-in', formData);
      setUser({ email: data.email, name: data.name });

      const userProducts = await getProductsByUserEmail(data.email);

      if (userProducts) {
        const [productItems] = userProducts;
        if (productItems && productItems.items && productItems.items.length > 0) {
          await saveCartItemsByNotAuthenticaedUser(selectedProducts, data.email, productItems.items);
        } else {
          await saveCartItemsByNotAuthenticaedUser(selectedProducts, data.email);
        }
      }

      router.push('/');
    } catch {
      toast.error('Credenciais inválidas');
      setIsLoading(false);
    }
  });

  return {
    formatUserProducts,
    saveCartItemsByNotAuthenticaedUser,
    form,
    isLoading,
    handleSubmit,
  }
}
