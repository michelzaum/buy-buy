import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type CartItem = {
  productId: string,
  quantity: number,
}

type CartStore = {
  selectedProducts: CartItem[];
};

type CartActions = {
  setSelectedProduct: (product: CartItem) => void;
  removeProduct: (productId: string) => void;
  updateProduct: (productId: string, quantity: number) => void;
  removeAllProducts: () => void;
};

export const useCartStore = create<CartStore & CartActions>()(
  devtools(
    immer((set) => ({
      selectedProducts: [],
      setSelectedProduct: ({ productId, quantity }: CartItem) => set(({ selectedProducts }) => {
        const alreadySelectedProductIndex = selectedProducts.findIndex(
          (item) => item.productId === productId
        );
        
        if (alreadySelectedProductIndex >= 0) {
          const MAX_PRODUCT_QUANTITY_ALLOWED = 20;
          if ((selectedProducts[alreadySelectedProductIndex].quantity + quantity) > MAX_PRODUCT_QUANTITY_ALLOWED) {
            selectedProducts[alreadySelectedProductIndex].quantity = MAX_PRODUCT_QUANTITY_ALLOWED;
            return;
          }

          selectedProducts[alreadySelectedProductIndex].quantity += quantity;
          return;
        }

        selectedProducts.push({ productId, quantity });
      }),
      removeProduct: (productId: string) => set(({ selectedProducts }) => ({
        selectedProducts: selectedProducts.filter((product) => product.productId !== productId),
      })),
      updateProduct: (productId: string, quantity: number) => set(({ selectedProducts }) => {
        selectedProducts.forEach((product) => {
          if (product.productId === productId) {
            product.quantity = quantity;
          }
        });
      }),
      removeAllProducts: () => set(({ selectedProducts }) => ({
        selectedProducts: [],
      })),
    })),
    {
      name: "buy-buy",
    }
  )
);
