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
import { Input } from "@/components/ui/input";
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
  userProducts: string[],
) {
    for (let i = 0; selectedProducts.length > i; i++) {
      // TODO: We also need to check if this product was already added in database for this user.
      // If so, avoid to save it again.
      if (!selectedProducts[i].wasAddedByAuthenticatedUser) {
        if (!userProducts.includes(selectedProducts[i].productId)) {
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

      const [userProducts] = await getProductsByUserEmail(data.email);

      let formattedUserProducts: string[] = [];
      if (userProducts && userProducts.items && userProducts.items.length > 0) {
        formattedUserProducts = formatUserProducts(userProducts.items);
      }

      await saveCartItemsByNotAuthenticaedUser(selectedProducts, data.email, formattedUserProducts);

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
                    <Link href='#' className="ml-auto inline-block text-sm underline">
                      Esqueceu sua senha?
                    </Link>
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
              <Button type="button" variant="outline" className="w-full">
                Login with Google
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
