'use client';

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { useProfile } from './useProfile';
import { Loader } from "lucide-react";

export default function Profile() {
  const {
    form,
    profileImagePreview,
    isLoading,
    isRemoveProfileImageModalOpen,
    handleSubmit,
    handleProfileImagePreview,
    handleRemoveProfileImage,
    handleSelectNewProfileImage,
    toggleRemoveProfileImageModalOpen,
  } = useProfile();

  return (
    <>
      {isLoading ? (
        <div className="min-h-screen grid place-items-center p-4">
          <div className="flex flex-col gap-8 items-center">
            <Loader className="animate-spin" />
          </div>
        </div>
      ): (
        <div className="flex justify-center h-dvh">
          <div className='w-full p-4'>
            <div className="flex flex-col items-center gap-6">
              <Image
                width={200}
                height={200}
                src={profileImagePreview ? profileImagePreview as string : "https://github.com/shadcn.png"}
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
                <Button variant='destructive' onClick={() => toggleRemoveProfileImageModalOpen(true)}>
                  Remover foto
                </Button>
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

            <Dialog open={isRemoveProfileImageModalOpen}>
              <DialogContent className="[&>button]:hidden flex flex-col gap-6">
                <DialogHeader className="flex flex-col gap-4">
                  <DialogTitle>Tem certeza?</DialogTitle>
                  <DialogDescription>
                    Quer mesmo remover a foto de perfil?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-row w-full mt-4">
                  <Button
                    className="flex-1 hover:cursor-pointer hover:bg-gray-200 transition-colors duration-200 ease-in-out"
                    variant='secondary'
                    onClick={() => toggleRemoveProfileImageModalOpen(false)}
                  >
                    <span className="font-semibold">Cancelar</span>
                  </Button>
                  <Button
                    className="flex-1 hover:cursor-pointer hover:bg-red-500 transition-colors duration-200 ease-in-out"
                    variant='destructive'
                    onClick={handleRemoveProfileImage}
                  >
                    <span className="font-semibold">Remover</span>
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </>
  )
}
