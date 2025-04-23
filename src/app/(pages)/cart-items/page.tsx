'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "@prisma/client";
import { useCartStore } from "@/store/CartStore";
import { getCartItems } from "@/app/_actions/get-cart-items";
import { formatCurrency } from "@/lib/formatCurrency";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CardCartItem extends Product {
  quantity: number;
}

export default function CartItems() {
  const [cartItems, setCartItems] = useState<CardCartItem[]>([]);
  const selectedProducts = useCartStore(state => state.selectedProducts);

  useEffect(() => {
    const cartItems = async () => {
      const response = await getCartItems({
        prodcutIds: selectedProducts.map(product => product?.productId)
      });
      const cartList = response.map((responseItem) => ({
        ...responseItem,
        quantity: selectedProducts.find((product) => product.productId === responseItem.id)?.quantity || 1,
      }))
      setCartItems(cartList);
    }

    cartItems();
  }, []);

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col gap-4 p-6 w-full max-w-2xl">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-2 rounded-lg border border-gray-300">
            <div className="flex items-center gap-3">
              <div className="h-20 w-20 relative">
                <Image
                  src={item.imageUrl}
                  alt="Product image"
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="flex flex-col gap-1">
                <strong>{item.name}</strong>
                <span>{formatCurrency(item.price)}</span>
              </div>
            </div>
            <div>
            <Select defaultValue={`${item.quantity}`}>
              <SelectTrigger>
                <SelectValue placeholder='Selecione a quantidade' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Quantidade</SelectLabel>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                  <SelectItem value="7">7</SelectItem>
                  <SelectItem value="8">8</SelectItem>
                  <SelectItem value="9">9</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="11">11</SelectItem>
                  <SelectItem value="12">12</SelectItem>
                  <SelectItem value="13">13</SelectItem>
                  <SelectItem value="14">14</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="16">16</SelectItem>
                  <SelectItem value="17">17</SelectItem>
                  <SelectItem value="18">18</SelectItem>
                  <SelectItem value="19">19</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="0">Selecione a quantidade</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
