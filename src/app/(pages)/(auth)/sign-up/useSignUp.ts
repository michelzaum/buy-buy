import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";

import { schema } from "./schema";
import { FormData } from "./types";

export function useSignUp() {
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

  return {
    form,
    isLoading,
    handleSubmit,
  };
}
