'use client';

import { ChangeEvent, useState } from 'react';
import Image from "next/image";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const schema = z.object({
  name: z.string().min(1, { message: 'Informe um nome' }),
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().min(1, { message: 'Informe a senha' }).max(8),
  confirmPassword: z.string().min(1, { message: 'Confirme a senha' }).max(8),
});

type FormData = z.infer<typeof schema>;

export default function Profile() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const [profileImagePreview, setProfileImagePreview] = useState<string | undefined>('');

  const handleSubmit = form.handleSubmit(async (formData): Promise<void> => {
    console.log(formData);
  });

  function handleProfileImagePreview(event: ChangeEvent<HTMLInputElement>): void {
    const file = event.target.files?.[0];
    setProfileImagePreview((prevState) =>
      file ? URL.createObjectURL(file) : prevState,
    );
  }

  function handleSelectNewProfileImage(): void {
    document.getElementById('#ProfileImage')?.click();
  }

  return (
    <div className="flex justify-center h-dvh">
      <div className='w-full p-4'>
        <div className="flex flex-col items-center gap-6">
          <Image
            width={200}
            height={200}
            src={profileImagePreview ? profileImagePreview : "https://github.com/shadcn.png"}
            alt="@shadcn"
            className="rounded-full"
          />
          <div className="flex items-center gap-4">
            <div>
              <input
                id='#ProfileImage'
                onChange={handleProfileImagePreview}
                type="file"
                className="hidden"
              />
              <Button variant='secondary' onClick={handleSelectNewProfileImage}>Editar foto</Button>
            </div>
            <Button variant='destructive'>Remover foto</Button>
          </div>
        </div>

        <div className='flex justify-center p-4'>
          <Form {...form}>
            <form className='w-full max-w-xl flex flex-col gap-8 pt-6' onSubmit={handleSubmit}>
              <FormField
                control={form.control}
                name='name'
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
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe@mail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Senha</FormLabel>
                    <FormControl>
                      <Input placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className='h-12'>
                Salvar
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
