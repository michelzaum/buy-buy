'use client';

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useStore } from "@/store/store";

export function Header() {
  const router = useRouter();
  const { selectedProducts, setUser, user } = useStore();
  
  const shouldShowSelectedProductsQuantity = selectedProducts.length > 0 && !!user;

  async function handleSignOut(): Promise<void> {
    await axios.post('/api/auth/sign-out');
    navigateToSignInPage();
    setUser(undefined);
  }

  function navigateToSignInPage(): void {
    router.replace('/sign-in');
  }

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
          {user ? (
            <button className="cursor-pointer" onClick={handleSignOut}>Sair</button>
          ): (
            <button className="cursor-pointer" onClick={navigateToSignInPage}>Entrar</button>
          )}
        </div>
        <Link href='/cart-items' className="relative justify-self-end hover:cursor-pointer p-1">
          <ShoppingCart className="h-6 w-6" />
          <div
            className={`absolute top-0 right-0 bg-red-500 rounded-full h-5 w-5 flex justify-center items-center
              ${!shouldShowSelectedProductsQuantity && 'hidden'}
            `}
          >
            <span className="text-white text-xs">{selectedProducts.length}</span>
          </div>
        </Link>
      </div>
    </header>
  );
}
