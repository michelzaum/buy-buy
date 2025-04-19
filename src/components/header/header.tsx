import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export function Header() {
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
        <button className="relative justify-self-end hover:cursor-pointer p-1">
          <ShoppingCart className="h-6 w-6" />
          <div className="absolute top-0 right-0 bg-red-500 rounded-full h-5 w-5 flex justify-center items-center">
            <span className="text-white text-xs">2</span>
          </div>
        </button>
      </div>
    </header>
  );
}
