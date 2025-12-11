'use client';

import Link from "next/link";
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

import { useSignUp } from "./useSignUp";

export default function SignUp() {
  const { form, isLoading, handleSubmit } = useSignUp();

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
               {isLoading && (
                <div className="flex items-center gap-2">
                  <span>Criando sua conta...</span>
                  <Loader className="animate-spin" />
                </div>
               )}
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
