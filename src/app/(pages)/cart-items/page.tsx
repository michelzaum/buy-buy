'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Product } from "@prisma/client";
import { toast } from "sonner";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CardCartItem extends Product {
  quantity: number;
}

export default function CartItems() {
  const [cartItems, setCartItems] = useState<CardCartItem[]>([]);
  const [isDeleteItemFromCartModalOpen, setIsDeleteItemFromCartModalOpen] = useState<boolean>(false);
  const [selectedItemToDeleteFromCart, setSelectedItemToDeleteFromCart] = useState<string>('');
  const { selectedProducts, updateProduct, removeProduct } = useCartStore();

  const MAX_PRODUCT_QUANTITY_ALLOWED = 20;

  useEffect(() => {
    const cartItems = async () => {
      const response = await getCartItems({
        prodcutIds: selectedProducts.map(product => product?.productId),
      });
      const cartList = response.map((responseItem) => ({
        ...responseItem,
        quantity: selectedProducts.find((product) => product.productId === responseItem.id)?.quantity || 1,
      }));
      setCartItems(cartList);
    }

    cartItems();
  }, []);

  function getTotalPrice(products: CardCartItem[]): number {
    return products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
  }

  function handleDeleteItemFromCart(productId: string): void {
    const updatedList = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedList);
    removeProduct(productId);
    setIsDeleteItemFromCartModalOpen(false);
    toast.success('Produto excluído do carrinho', {
      style: {
        backgroundColor: 'red',
        color: "white",
        fontSize: '1rem',
        fontWeight: 500,
      },
    });
  }

  function handleUpdateProductQuantity(productId: string, quantity: number): void {
    setCartItems((prevState) => {
      return prevState.map((product) =>
          product.id === productId ? {...product, quantity: quantity } : product,
      );
    });

    updateProduct(productId, quantity);
  }

  function handleOpenDeleteItemFromCartModal(productId: string): void {
    setSelectedItemToDeleteFromCart(productId);
    setIsDeleteItemFromCartModalOpen(true);
  }

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col gap-8 p-6 w-full max-w-2xl">
        <div className="w-full flex justify-end py-2">
          <button className="cursor-pointer">
            <span className="text-sm text-red-500 font-semibold md:text-base">
              Esvaziar carrinho
            </span>
          </button>
        </div>
        {cartItems.length > 0 ? cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-2 rounded-lg border border-gray-300 relative">
            <button
              className="bg-gray-50 shadow-md p-2 rounded-full absolute -top-6 -left-4 z-10 hover:bg-red-400 hover:cursor-pointer transition-colors duration-75 ease-in-out"
              onClick={() => handleOpenDeleteItemFromCartModal(item.id)}
            >
              <Trash2 />
            </button>
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
                <span>{formatCurrency(item.price * item.quantity)}</span>
                <div className="flex flex-col gap-1">
                  <span className="text-xs">Valor unitário: {formatCurrency(item.price)}</span>
                </div>
              </div>
            </div>
            <div>
              <Select
                defaultValue={`${item.quantity}`}
                onValueChange={(value) => handleUpdateProductQuantity(item.id, Number(value))}
              >
                <SelectTrigger className="pr-1 hover:cursor-pointer">
                  <SelectValue placeholder='Selecione a quantidade' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Quantidade</SelectLabel>
                    {Array.from({ length: MAX_PRODUCT_QUANTITY_ALLOWED }, (_, i) => (
                      <SelectItem value={String(i + 1)}>{i + 1}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        )) : (
          <div className="w-full flex flex-col items-center gap-6 py-6">
            <strong className="text-2xl">O carrinho está vazio.</strong>
            <span className="font-medium text-lg text-center">Volte a lista de produtos para aproveitar os melhores preços :)</span>
              <Button className="w-full sm:w-1/2 p-8 mt-6 hover:cursor-pointer">
                <Link href='/'>
                  <span className="text-base">Voltar a lista de produtos</span>
                </Link>
              </Button>
          </div>
        )}
        {cartItems.length > 0 && (
          <>
            <div className="flex items-center justify-between my-2">
              <span className="text-lg">Total</span>
              <strong className="text-lg">{formatCurrency(getTotalPrice(cartItems))}</strong>
            </div>
            <div className="w-full py-4 flex justify-end">
              <Button className="w-full py-8 sm:w-1/2 hover:cursor-pointer">
                <span className="font-semibold text-lg">Continuar</span>
              </Button>
            </div>
          </>
        )}
        <Dialog open={isDeleteItemFromCartModalOpen}>
          <DialogContent className="[&>button]:hidden flex flex-col gap-6">
            <DialogHeader className="flex flex-col gap-4">
              <DialogTitle>Tem certeza?</DialogTitle>
              <DialogDescription>
                Quer mesmo excluir este item do carrinho? Você pode adicioná-lo novamente selecionando-o na lista de produtos.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex flex-row w-full mt-4">
              <Button
                className="flex-1 hover:cursor-pointer hover:bg-gray-200 transition-colors duration-200 ease-in-out"
                variant='secondary'
                onClick={() => setIsDeleteItemFromCartModalOpen(false)}
              >
                <span className="font-semibold">Cancelar</span>
              </Button>
              <Button
                className="flex-1 hover:cursor-pointer hover:bg-red-500 transition-colors duration-200 ease-in-out"
                variant='destructive'
                onClick={() => handleDeleteItemFromCart(selectedItemToDeleteFromCart)}
              >
                <span className="font-semibold">Excluir</span>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
