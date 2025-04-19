import { create } from "zustand";
import { devtools } from "zustand/middleware";

type CartStore = {
  selectedProductId: string[];
};

type CartActions = {
  setSelectedProductId: (productId: string) => void;
};

export const useCartStore = create<CartStore & CartActions>()(
  devtools(
    (set) => ({
      selectedProductId: "",
      setSelectedProductId: (productId: string) =>
        set((prevState) => ({
          ...prevState,
          selectedProductId: [...prevState.selectedProductId, productId],
        })),
    }),
    {
      name: "buy-buy",
    }
  )
);
