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
        <button className="justify-self-end hover:cursor-pointer">
          <ShoppingCart />
        </button>
      </div>
    </header>
  );
}
