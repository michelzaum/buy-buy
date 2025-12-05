'use client';

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
import { useCartItems } from "./useCartItems";
import { Loading } from "./components/loading";
import { CartItemCard } from "./components/cart-item-card";
import { DeleteAllCartItems } from "./components/delete-all-cart-items";
import { EmptyCartItemsList } from "./components/empty-cart-items-list";
import { CartItemsSummary } from "./components/cart-items-summary";
import { DeleteCartItemModal } from "./components/delete-cart-item-modal";

export default function CartItems() {
  const {
    cartItems,
    isLoadingCartItems,
    isUserAuthenticated,
    selectedItemToDeleteFromCart,
    isDeleteCartItemModalOpen,
    isDeleteAllItemsFromCartModalOpen,
    getTotalPrice,
    onCheckout,
    setIsDeleteCartItemModalOpen,
    handleDeleteItemFromCart,
    handleDeleteAllItemsFromCart,
    setIsDeleteAllItemsFromCartModalOpen,
    handleOpenDeleteItemFromCartModal,
    handleUpdateProductQuantity,
  } = useCartItems();

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col gap-8 px-4 w-full max-w-2xl">
        {isLoadingCartItems ? (
          <Loading />
        ) : (
          <>
            <Header isAuthenticated={isUserAuthenticated} />
            {cartItems.length > 0 && (
              <DeleteAllCartItems onDeleteAllItemsFromCart={() => setIsDeleteAllItemsFromCartModalOpen(true)} />
            )}
            {cartItems.length > 0 ? cartItems.map((cartItem) => (
              <CartItemCard
                key={cartItem.id}
                cartItem={cartItem}
                onDeleteItemFromCart={() => handleOpenDeleteItemFromCartModal(cartItem.product.id)}
                onUpdateProductQuantity={(newQuantity) => handleUpdateProductQuantity(cartItem.product.id, newQuantity)}
              />
            )) : (
              <EmptyCartItemsList />
            )}
            {cartItems.length > 0 && (
              <CartItemsSummary onCheckout={onCheckout} totalPrice={getTotalPrice(cartItems)} />
            )}
          </>
        )}
        <DeleteCartItemModal
          isDeleteCartItemModalOpen={isDeleteCartItemModalOpen}
          onCancel={() => setIsDeleteCartItemModalOpen(false)}
          onDelete={() => handleDeleteItemFromCart(selectedItemToDeleteFromCart)}
        />
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
