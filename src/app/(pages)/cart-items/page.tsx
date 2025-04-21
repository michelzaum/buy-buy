'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "@prisma/client";
import { useCartStore } from "@/store/CartStore";
import { getCartItems } from "@/app/_actions/get-cart-items";

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
    <div>
      <div>
        {cartItems.map((item) => (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-20 w-20 relative">
                <Image
                  src={item.imageUrl}
                  alt="Product image"
                  fill
                />
              </div>
              <div className="flex flex-col">
                <span>{item.name}</span>
                <span>{item.price}</span>
              </div>
            </div>
            <div>
              Add or remove products
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
