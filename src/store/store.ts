import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type CartItem = {
  productId: string;
  quantity: number;
  wasAddedByAuthenticatedUser?: boolean;
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
  removeProduct: (productId: string) => void;
  updateProduct: (productId: string, quantity: number) => void;
  removeAllProducts: () => void;
  setUser: (user?: BasicUserInfo) => void;
};

export const useStore = create<Store & Actions>()(
  devtools(
    persist(
      immer((set) => ({
        selectedProducts: [],
        setSelectedProduct: ({ productId, quantity, wasAddedByAuthenticatedUser }: CartItem) => set(({ selectedProducts }) => {
          const alreadySelectedProductIndex = selectedProducts.findIndex(
            (item) => item.productId === productId
          );

          if (alreadySelectedProductIndex >= 0) {
            selectedProducts[alreadySelectedProductIndex].quantity += quantity;
            selectedProducts[alreadySelectedProductIndex].wasAddedByAuthenticatedUser = wasAddedByAuthenticatedUser;
            return;
          }

          selectedProducts.push({ productId, quantity, wasAddedByAuthenticatedUser });
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
        removeAllProducts: () => set(() => ({
          selectedProducts: [],
        })),
        user: undefined,
        setUser: (userData?: BasicUserInfo) => set(() => ({
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
