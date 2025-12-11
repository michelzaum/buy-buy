import Image from "next/image";
import { Trash2 } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency } from "@/lib/formatCurrency";
import { CartItemCardProps } from "../types";
import { MAX_PRODUCT_QUANTITY_ALLOWED } from "../contants";

export function CartItemCard({ onDeleteItemFromCart, onUpdateProductQuantity, cartItem }: CartItemCardProps) {
  return (
    <div key={cartItem.product.id} className="flex items-center justify-between p-2 rounded-lg border border-gray-300 relative">
      <button
        className="bg-gray-50 shadow-md p-2 rounded-full absolute -top-6 -left-4 z-10 hover:bg-red-400 hover:cursor-pointer transition-colors duration-75 ease-in-out"
        onClick={onDeleteItemFromCart}
      >
        <Trash2 />
      </button>
      <div className="flex items-center gap-3">
        <div className="h-20 w-20 relative">
          <Image
            src={cartItem.product.imageUrl}
            alt="Product image"
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex flex-col gap-1">
          <strong>{cartItem.product.name}</strong>
          <span>{formatCurrency(cartItem.product.price * cartItem.quantity)}</span>
          <div className="flex flex-col gap-1">
            <span className="text-xs">Valor unitário: {formatCurrency(cartItem.product.price)}</span>
          </div>
        </div>
      </div>
      <div>
        <Select
          defaultValue={`${cartItem.quantity}`}
          onValueChange={(newQuantityValue) => onUpdateProductQuantity(Number(newQuantityValue))}
        >
          <SelectTrigger className="pr-1 hover:cursor-pointer">
            <SelectValue placeholder='Selecione a quantidade' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Quantidade</SelectLabel>
              {Array.from({ length: MAX_PRODUCT_QUANTITY_ALLOWED }, (_, i) => (
                <SelectItem key={String(i + 1)} value={String(i + 1)}>{i + 1}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
