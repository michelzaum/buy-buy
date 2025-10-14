import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  return (
    <div className="w-full h-full flex justify-center">
      <div className="flex flex-col gap-4 max-w-2xl text-center p-10">
        <h1 className="text-2xl font-bold text-green-600">Pagamento concluído com sucesso!</h1>
        <p>Obrigado pela sua compra 🎉</p>
        <Button className="h-14">
          Voltar para a home
        </Button>
      </div>
    </div>
  );
}
