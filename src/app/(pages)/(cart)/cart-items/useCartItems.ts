import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useStore } from "@/store/store";
import { getCartItems } from "@/app/_actions/get-cart-items";
import { deleteCartItem } from "@/app/_actions/delete-cart-item";
import { deleteAllCartItems } from "@/app/_actions/delete-all-cart-items";
import { getProductById } from "@/app/_actions/get-product-by-id";
import { handleCheckout } from "@/app/_actions/checkout";
import { CardCartItem } from "./types";

export function useCartItems() {
  const [cartItems, setCartItems] = useState<CardCartItem[]>([]);
  const [isDeleteCartItemModalOpen, setIsDeleteCartItemModalOpen] = useState<boolean>(false);
  const [isDeleteAllItemsFromCartModalOpen, setIsDeleteAllItemsFromCartModalOpen] = useState<boolean>(false);
  const [selectedItemToDeleteFromCart, setSelectedItemToDeleteFromCart] = useState<string>('');
  const [isLoadingCartItems, setIsLoadingCartItems] = useState(true);
  const { selectedProducts, updateProduct, removeProduct, removeAllProducts, user, isUserAuthenticated } = useStore();

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
    setIsDeleteCartItemModalOpen(false);

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
    setIsDeleteCartItemModalOpen(true);
  }

  return {
    cartItems,
    isDeleteCartItemModalOpen,
    isDeleteAllItemsFromCartModalOpen,
    selectedItemToDeleteFromCart,
    isLoadingCartItems,
    isUserAuthenticated,
    getTotalPrice,
    handleDeleteItemFromCart,
    handleDeleteAllItemsFromCart,
    handleUpdateProductQuantity,
    handleOpenDeleteItemFromCartModal,
    onCheckout,
    setIsDeleteCartItemModalOpen,
    setIsDeleteAllItemsFromCartModalOpen,
  }
}
