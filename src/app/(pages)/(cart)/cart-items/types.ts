import { Product } from "@prisma/client";

export type CardCartItem = {
  id: string;
  product: Product
  quantity: number;
}

export type DeleteAllCartItemsProps = {
  onDeleteAllItemsFromCart: () => void;
}

export type CartItemCardProps = {
  cartItem: Omit<CardCartItem, 'id'>;
  onDeleteItemFromCart: () => void;
  onUpdateProductQuantity: (newQuantityValue: number) => void;
}
