import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type CartItem = {
  id: string,
  quantity: number,
}

type CartStore = {
  selectedProducts: CartItem[];
};

type CartActions = {
  setSelectedProduct: (productId: string, quantity: number) => void;
};

export const useCartStore = create<CartStore & CartActions>()(
  devtools(
    immer((set) => ({
      selectedProducts: [],
      setSelectedProduct: (productId: string, quantity: number) => set((prevState) => {
        prevState.selectedProducts.push({ id: productId, quantity: quantity });
      })
    })),
    {
      name: "buy-buy",
    }
  )
);
