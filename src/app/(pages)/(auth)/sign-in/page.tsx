'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "sonner";
import axios from "axios";
import { Loader } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useStore } from "@/store/store";
import { saveCartItems } from "@/app/_actions/save-cart-items";
import { getProductsByUserEmail } from "@/app/_actions/get-product-by-user-email";

const schema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Informe a senha'),
});

type FormData = z.infer<typeof schema>;

export default function SignIn() {
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, selectedProducts } = useStore();

  async function saveCartItemsByNotAuthenticaedUser(selectedProducts: {
    // TODO: create a type for these props
    productId: string;
    quantity: number;
    wasAddedByAuthenticatedUser?: boolean;
  }[],
  userEmail: string,
  userProducts?: {
    productId: string;
    quantity: number;
  }[],
) {
    const userProductsIds = formatUserProducts(userProducts ?? []);

    for (let i = 0; selectedProducts.length > i; i++) {
      let userProductIndex = 0;
      if (userProducts && userProducts?.length > 0) {
        userProductIndex = userProducts.findIndex(
          (product) => product.productId === selectedProducts[i].productId,
        );
      }

      if (!selectedProducts[i].wasAddedByAuthenticatedUser) {
        if (userProductsIds.length > 0 && userProductsIds.includes(selectedProducts[i].productId)) {

          if (!!(userProductIndex > -1 && userProducts?.length && userProducts.length > 0)) {
            const finalQuantity = selectedProducts[i].quantity - userProducts[userProductIndex].quantity;

            await saveCartItems({
              productId: selectedProducts[i].productId,
              quantity: finalQuantity,
              userEmail,
            });
          }
        } else {
          await saveCartItems({
            productId: selectedProducts[i].productId,
            quantity: selectedProducts[i].quantity,
            userEmail,
          });
        }
      }
    }
  }

  function formatUserProducts(userProducts: { productId: string }[]) {
    return userProducts.map((product) => product.productId);
  }

  const handleSubmit = form.handleSubmit(async (formData): Promise<void> => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('/api/auth/sign-in', formData);
      setUser({ email: data.email, name: data.name });

      const userProducts = await getProductsByUserEmail(data.email);

      if (userProducts) {
        const [productItems] = userProducts;
        if (productItems && productItems.items && productItems.items.length > 0) {
          await saveCartItemsByNotAuthenticaedUser(selectedProducts, data.email, productItems.items);
        } else {
          await saveCartItemsByNotAuthenticaedUser(selectedProducts, data.email);
        }
      }

      router.push('/');
    } catch {
      toast.error('Credenciais inválidas');
      setIsLoading(false);
    }
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Acesse sua conta</CardTitle>
        <CardDescription>
          Faça login para utilizar a plataforma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="m@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>Senha</FormLabel>
                  </div>
                  <FormControl>
                    <Input placeholder="********" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-3">
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
               {!isLoading && 'Entrar'}
               {isLoading && (
                <div className="flex items-center gap-2">
                  <span>Entrando...</span>
                  <Loader className="animate-spin" />
                </div>
               )}
              </Button>
            </div>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Não tem uma conta?{" "}
          <Link href='/sign-up' className="underline underline-offset-4">
            Cadastre-se
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
