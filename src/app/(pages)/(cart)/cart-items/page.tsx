'use client';

import { Header } from "@/components/layout/header/header";
import { Loading } from "./components/loading";
import { CartItemCard } from "./components/cart-item-card";
import { DeleteAllCartItems } from "./components/delete-all-cart-items";
import { EmptyCartItemsList } from "./components/empty-cart-items-list";
import { CartItemsSummary } from "./components/cart-items-summary";
import { DeleteCartItemModal } from "./components/delete-cart-item-modal";
import { DeleteAllCartItemsModal } from "./components/delete-all-cart-items-modal";
import { useCartItems } from "./useCartItems";

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
        <DeleteAllCartItemsModal
          isDeleteAllCartItemsModalOpen={isDeleteAllItemsFromCartModalOpen}
          onCancel={() => setIsDeleteAllItemsFromCartModalOpen(false)}
          onDelete={handleDeleteAllItemsFromCart}
        />
      </div>
    </div>
  )
}
