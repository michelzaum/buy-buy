import { useRouter } from "next/navigation";
import { useStore } from "@/store/store";
import { deleteAllCartItems } from "@/app/_actions/delete-all-cart-items";

export function useSuccessPayment() {
  const { removeAllProducts, user } = useStore();
  const router = useRouter();

  async function onGoBackHomeClick(): Promise<void> {
    await deleteAllCartItems(user?.email || '');
    removeAllProducts();

    router.push('/');
  }

  return {
    onGoBackHomeClick,
  }
}
