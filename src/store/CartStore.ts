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
          selectedProducts[alreadySelectedProductIndex].quantity += quantity;
          return;
        }

        selectedProducts.push({ productId, quantity });
      })
    })),
    {
      name: "buy-buy",
    }
  )
);
