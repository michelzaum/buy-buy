import { z } from "zod";

export const schema = z.object({
  name: z.string().min(1, { message: 'Informe um nome' }),
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
}).refine(
  (values) => {
    return values.password === values.confirmPassword;
  },
  {
    message: 'The passwords do not match',
    path: ['confirmPassword'],
  }
);
