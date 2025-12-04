'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useStore } from "@/store/store";
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
import { Header } from "@/components/layout/header/header";
import { deleteAllCartItems } from "@/app/_actions/delete-all-cart-items";
import { deleteCartItem } from "@/app/_actions/delete-cart-item";
import { handleCheckout } from "@/app/_actions/checkout";
import { getProductById } from "@/app/_actions/get-product-by-id";
import { CardCartItem } from "./types";

export default function CartItems() {
  const [cartItems, setCartItems] = useState<CardCartItem[]>([]);
  const [isDeleteItemFromCartModalOpen, setIsDeleteItemFromCartModalOpen] = useState<boolean>(false);
  const [isDeleteAllItemsFromCartModalOpen, setIsDeleteAllItemsFromCartModalOpen] = useState<boolean>(false);
  const [selectedItemToDeleteFromCart, setSelectedItemToDeleteFromCart] = useState<string>('');
  const [isLoadingCartItems, setIsLoadingCartItems] = useState(true);
  const { selectedProducts, updateProduct, removeProduct, removeAllProducts, user, isUserAuthenticated } = useStore();

  const MAX_PRODUCT_QUANTITY_ALLOWED = 20;

  useEffect(() => {
    const cartItems = async () => {
      const response = await getCartItems();

      if (response && response.items) {
        setCartItems(response.items)
      }

      setIsLoadingCartItems(false);
    }

    cartItems();
  }, []);

  function getTotalPrice(products: CardCartItem[]): number {
    return products.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  }

  async function handleDeleteItemFromCart(productId: string): Promise<void> {
    await deleteCartItem(productId);

    const updatedList = cartItems.filter((item) => item.product.id !== productId);
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

  async function handleDeleteAllItemsFromCart(): Promise<void> {
    setCartItems([]);
    removeAllProducts();
    setIsDeleteAllItemsFromCartModalOpen(false);
    await deleteAllCartItems(user?.email || '');

    toast.success('Produtos excluídos do carrinho', {
      style: {
        backgroundColor: 'red',
        color: "white",
        fontSize: '1rem',
        fontWeight: 500,
      },
    });
  }

  async function onCheckout(): Promise<void> {
    setIsLoadingCartItems(true);
    const productIds = selectedProducts.map((product) => product.productId);
    const productsToCheckout = await getProductById(productIds);
    
    const formattedProductToCheckout = productsToCheckout.map((product, index) => ({
      name: product.name,
      price: product.price,
      quantity: product.cartItems[0].quantity,
    }));

    await handleCheckout(formattedProductToCheckout);
    setIsLoadingCartItems(false);
  }

  function handleUpdateProductQuantity(productId: string, quantity: number): void {
    setCartItems((prevState) => {
      return prevState.map((item) =>
          item.product.id === productId ? {...item, quantity: quantity } : item,
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
      <div className="flex flex-col gap-8 px-4 w-full max-w-2xl">
        {isLoadingCartItems ? (
          <div className="min-h-screen grid place-items-center p-4">
            <div className="flex flex-col gap-8 items-center">
              <Loader className="animate-spin" />
            </div>
          </div>
        ) : (
          <>
            <Header isAuthenticated={isUserAuthenticated} />
            {cartItems.length > 0 && (
              <div className="w-full flex justify-end py-2">
                <button className="cursor-pointer" onClick={() => setIsDeleteAllItemsFromCartModalOpen(true)}>
                  <span className="text-sm text-red-500 font-semibold md:text-base">
                    Esvaziar carrinho
                  </span>
                </button>
              </div>
            )}
            {cartItems.length > 0 ? cartItems.map((item) => (
              <div key={item.product.id} className="flex items-center justify-between p-2 rounded-lg border border-gray-300 relative">
                <button
                  className="bg-gray-50 shadow-md p-2 rounded-full absolute -top-6 -left-4 z-10 hover:bg-red-400 hover:cursor-pointer transition-colors duration-75 ease-in-out"
                  onClick={() => handleOpenDeleteItemFromCartModal(item.product.id)}
                >
                  <Trash2 />
                </button>
                <div className="flex items-center gap-3">
                  <div className="h-20 w-20 relative">
                    <Image
                      src={item.product.imageUrl}
                      alt="Product image"
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <strong>{item.product.name}</strong>
                    <span>{formatCurrency(item.product.price * item.quantity)}</span>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs">Valor unitário: {formatCurrency(item.product.price)}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <Select
                    defaultValue={`${item.quantity}`}
                    onValueChange={(value) => handleUpdateProductQuantity(item.product.id, Number(value))}
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
                  <Button
                    className="w-full py-8 sm:w-1/2 hover:cursor-pointer"
                    onClick={onCheckout}
                  >
                    <span className="font-semibold text-lg">Continuar</span>
                  </Button>
                </div>
              </>
            )}
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
        <Dialog open={isDeleteAllItemsFromCartModalOpen}>
          <DialogContent className="[&>button]:hidden flex flex-col gap-6">
            <DialogHeader className="flex flex-col gap-4">
              <DialogTitle>Tem certeza?</DialogTitle>
              <DialogDescription>
                Quer mesmo excluir TODOS os itens do carrinho?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex flex-row w-full mt-4">
              <Button
                className="flex-1 hover:cursor-pointer hover:bg-gray-200 transition-colors duration-200 ease-in-out"
                variant='secondary'
                onClick={() => setIsDeleteAllItemsFromCartModalOpen(false)}
              >
                <span className="font-semibold">Cancelar</span>
              </Button>
              <Button
                className="flex-1 hover:cursor-pointer hover:bg-red-500 transition-colors duration-200 ease-in-out"
                variant='destructive'
                onClick={handleDeleteAllItemsFromCart}
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
