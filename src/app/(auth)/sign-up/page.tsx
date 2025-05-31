'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';
import { toast } from "sonner";

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

const schema = z.object({
  name: z.string().min(1, 'Informe um nome'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Informe a senha'),
});

type FormData = z.infer<typeof schema>;

export default function SignUp() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const handleSubmit = form.handleSubmit(async (formData): Promise<void> => {
    try {
      setIsLoading(true);
      await axios.post('/api/auth/sign-up', formData);

      router.push('/sign-in');
      toast.success('Conta cadastrada com sucesso', {
        description: 'Faça login na sua conta',
      });
    } catch {
      setIsLoading(false);
      toast.error('Erro ao criar a sua conta');
    }
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Faça seu cadastro</CardTitle>
        <CardDescription>
          Preencha os campos abaixo para criar uma conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input placeholder="m@example.com" type="password" {...field} />
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
                {!isLoading && 'Criar conta'}
                {isLoading && 'Criando sua conta...'}
              </Button>
            </div>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Já tem uma conta?{" "}
          <Link href="/sign-in" className="underline underline-offset-4">
            Entre
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
