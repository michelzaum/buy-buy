'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "@prisma/client";
import { useCartStore } from "@/store/CartStore";
import { getCartItems } from "@/app/_actions/get-cart-items";
import { formatCurrency } from "@/lib/formatCurrency";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CartItems() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const selectedProducts = useCartStore(state => state.selectedProducts);

  useEffect(() => {
    const cartItems = async () => {
      const response = await getCartItems({
        prodcutIds: selectedProducts.map(product => product?.productId)
      });
      setCartItems(response);
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
                  className="rounded-lg"
                />
              </div>
              <div className="flex flex-col gap-1">
                <strong>{item.name}</strong>
                <span>{formatCurrency(item.price)}</span>
              </div>
            </div>
            <div>
            <Select defaultValue="4">
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
                  <SelectItem value="5">Selecione a quantidade</SelectItem>
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
