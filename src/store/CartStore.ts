import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type CartStore = {
  selectedProductIds: string[];
};

type CartActions = {
  setSelectedProductId: (productId: string) => void;
};

export const useCartStore = create<CartStore & CartActions>()(
  devtools(
    immer((set) => ({
      selectedProductIds: [],
      setSelectedProductId: (productId: string) =>
        set((prevState) => {
          if (prevState.selectedProductIds.find((productItem) => productItem === productId)) return;

          prevState.selectedProductIds =
            prevState.selectedProductIds.concat(productId);
        }),
    })),
    {
      name: "buy-buy",
    }
  )
);
