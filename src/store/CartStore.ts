import { create } from "zustand";
import { Prisma } from "@prisma/client";

interface Product {
  product: Prisma.ProductGetPayload<{
    include: {
      category: {
        select: {
          name: true;
        };
      };
    };
  }>;
}

type CartStore = {
  selectedProduct: Product;
};

type CartActions = {
  setSelectedProduct: (product: Product) => void;
};

export const useCartStore = create<CartStore & CartActions>()((set) => ({
  selectedProduct: {} as Product,
  setSelectedProduct: (product: Product) =>
    set((prevState) => ({
      ...prevState,
      selectedProduct: product,
    })),
}));
