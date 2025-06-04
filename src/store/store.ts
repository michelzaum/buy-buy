import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type CartItem = {
  productId: string,
  quantity: number,
}

type BasicUserInfo = {
  email: string;
  name: string;
};

type Store = {
  selectedProducts: CartItem[];
  user: BasicUserInfo | undefined;
};

type Actions = {
  setSelectedProduct: (product: CartItem) => void;
  remoteProduct: (productId: string) => void;
  setUser: (user: BasicUserInfo) => void;
};

export const useStore = create<Store & Actions>()(
  devtools(
    persist(
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
        }),
        remoteProduct: (productId: string) => set(({ selectedProducts }) => ({
          selectedProducts: selectedProducts.filter((product) => product.productId !== productId),
        })),
        user: undefined,
        setUser: (userData: BasicUserInfo) => set(() => ({
          user: userData,
        })),
      })),
      {
        name: 'buy-buy-storage',
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
    {
      name: "buy-buy",
    }
  )
);
