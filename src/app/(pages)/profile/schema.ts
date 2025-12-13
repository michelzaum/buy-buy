import { z } from "zod";

export const schema = z.object({
  name: z.string().min(1, { message: 'Informe um nome' }),
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().min(1, { message: 'Informe a senha' }).max(8),
  confirmPassword: z.string().min(1, { message: 'Confirme a senha' }).max(8),
});
