import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type CartStore = {
  selectedProductId: string[];
};

type CartActions = {
  setSelectedProductId: (productId: string) => void;
};

export const useCartStore = create<CartStore & CartActions>()(
  devtools(
    immer((set) => ({
      selectedProductId: [""],
      setSelectedProductId: (productId: string) =>
        set((prevState) => {
          prevState.selectedProductId =
            prevState.selectedProductId.concat(productId);
        }),
    })),
    {
      name: "buy-buy",
    }
  )
);
