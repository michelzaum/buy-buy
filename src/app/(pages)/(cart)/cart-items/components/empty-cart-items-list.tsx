import Link from "next/link";

import { Button } from "@/components/ui/button";

export function EmptyCartItemsList() {
  return (
    <div className="w-full flex flex-col items-center gap-6 py-6">
      <strong className="text-2xl">O carrinho está vazio.</strong>
      <span className="font-medium text-lg text-center">Volte a lista de produtos para aproveitar os melhores preços :)</span>
        <Button className="w-full sm:w-1/2 p-8 mt-6 hover:cursor-pointer">
          <Link href='/'>
            <span className="text-base">Voltar a lista de produtos</span>
          </Link>
        </Button>
    </div>
  )
}
