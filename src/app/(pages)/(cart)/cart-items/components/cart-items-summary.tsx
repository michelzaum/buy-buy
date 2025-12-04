import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/formatCurrency";
import { CartItemsSummaryProps } from "../types";

export function CartItemsSummary({ totalPrice, onCheckout }: CartItemsSummaryProps) {
  return (
    <>
      <div className="flex items-center justify-between my-2">
        <span className="text-lg">Total</span>
        <strong className="text-lg">{formatCurrency(totalPrice)}</strong>
      </div>
      <div className="w-full py-4 flex justify-end">
        <Button
          className="w-full py-8 sm:w-1/2 hover:cursor-pointer"
          onClick={onCheckout}
        >
          <span className="font-semibold text-lg">Continuar</span>
        </Button>
      </div>
    </>
  )
}
