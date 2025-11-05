import { Category, Product } from "@prisma/client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import { MAX_PRODUCT_PRICE, MIN_PRODUCT_PRICE } from "@/utils/constants";

type CartItem = {
  productId: string;
  quantity: number;
  wasAddedByAuthenticatedUser?: boolean;
}

type BasicUserInfo = {
  email: string;
  name: string;
};

type ProductFilter = {
  category: string;
  price: {
    min?: number;
    max?: number;
  };
};

interface ListProducts extends Product {
 category: Pick<Category, 'name'>;
}

type Store = {
  selectedProducts: CartItem[];
  user: BasicUserInfo | undefined;
  productFilter: ProductFilter;
  filteredProducts: ListProducts[];
  isUserAuthenticated: boolean;
};

type Actions = {
  setSelectedProduct: (product: CartItem) => void;
  removeProduct: (productId: string) => void;
  updateProduct: (productId: string, quantity: number) => void;
  removeAllProducts: () => void;
  setUser: (user?: BasicUserInfo) => void;
  setProductFilter: (productFilter: Partial<ProductFilter>) => void;
  setFilteredProducts: (filteredProducts: ListProducts[]) => void;
  setIsUserAuthenticated: (isUserAuthenticated: boolean) => void;
};

export const useStore = create<Store & Actions>()(
  devtools(
    persist(
      immer((set,) => ({
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
        productFilter: {
          category: "",
          price: {
            min: MIN_PRODUCT_PRICE,
            max: MAX_PRODUCT_PRICE,
          },
        },
        setProductFilter: (productFilter: Partial<ProductFilter>) => set((prevState) => ({
          productFilter: {
            ...prevState.productFilter,
            ...productFilter,
          },          
        })),
        filteredProducts: [],
        setFilteredProducts: (filteredProducts: ListProducts[]) => set(() => ({
          filteredProducts,
        })),
        isUserAuthenticated: false,
        setIsUserAuthenticated: (isUserAuthenticated: boolean) => set(() => ({
          isUserAuthenticated,
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
