import { DeleteAllCartItemsProps } from "../types";

export function DeleteAllCartItems({ onDeleteAllItemsFromCart }: DeleteAllCartItemsProps) {
  return (
    <div className="w-full flex justify-end py-2">
      <button className="cursor-pointer" onClick={onDeleteAllItemsFromCart}>
        <span className="text-sm text-red-500 font-semibold md:text-base">
          Esvaziar carrinho
        </span>
      </button>
    </div>
  )
}
