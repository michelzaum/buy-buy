'use client';

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/CartStore";

export function Header() {
  const selectedProducts = useCartStore(state => state.selectedProducts);

  return (
    <header className="flex justify-center py-10">
      <div className="w-full max-w-lvw flex justify-center items-center px-10">
        <div className="w-full flex justify-center gap-10">
          <Link href="/">
            <span>Início</span>
          </Link>
          <Link href="/profile">
            <span>Perfil</span>
          </Link>
        </div>
        <Link href='/cart-items' className="relative justify-self-end hover:cursor-pointer p-1">
          <ShoppingCart className="h-6 w-6" />
          <div
            className={`absolute top-0 right-0 bg-red-500 rounded-full h-5 w-5 flex justify-center items-center
              ${selectedProducts.length === 0 && 'hidden'}
            `}
          >
            <span className="text-white text-xs">{selectedProducts.length}</span>
          </div>
        </Link>
      </div>
    </header>
  );
}
