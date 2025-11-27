'use client';

import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button";
import { useStore } from "@/store/store";
import { deleteAllCartItems } from "../../_actions/delete-all-cart-items";

export default function SuccessPage() {
  const { removeAllProducts, user } = useStore();
  const router = useRouter();

  async function onGoBackHomeClick(): Promise<void> {
    await deleteAllCartItems(user?.email || '');
    removeAllProducts();

    router.push('/');
  }

  return (
    <div className="w-full h-full flex justify-center">
      <div className="flex flex-col gap-4 max-w-2xl text-center p-10">
        <h1 className="text-2xl font-bold text-green-600">Pagamento concluído com sucesso!</h1>
        <p>Obrigado pela sua compra 🎉</p>
        <Button className="h-14 w-full hover:cursor-pointer" onClick={onGoBackHomeClick}>
          Voltar para a home
        </Button>
      </div>
    </div>
  );
}
