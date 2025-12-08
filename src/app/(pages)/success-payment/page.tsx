'use client';

import { Button } from "@/components/ui/button";
import { useSuccessPayment } from "./useSuccessPayment";

export default function SuccessPage() {
  const { onGoBackHomeClick } = useSuccessPayment();

  return (
    <div className="w-full h-full flex justify-center">
      <div className="flex flex-col gap-4 max-w-2xl text-center p-10">
        <h1 className="text-2xl font-bold text-green-600">
          Pagamento concluído com sucesso!
        </h1>
        <p>Obrigado pela sua compra 🎉</p>
        <Button className="h-14 w-full hover:cursor-pointer" onClick={onGoBackHomeClick}>
          Voltar para a home
        </Button>
      </div>
    </div>
  );
}
