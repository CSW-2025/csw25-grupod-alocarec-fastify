import { z } from 'zod';

export const createUsuarioSchema = z.object({
  email: z.string().email(),
  nome: z.string(),
  dataNascimento: z.string(), // ou z.date() se preferir
  sexo: z.string(),
  perfilId: z.number(),
  senha: z.string(),
  telefones: z.array(
    z.object({
      numero: z.string(),
      descricao: z.string()
    })
  )
});

export type CreateUsuarioInput = z.infer<typeof createUsuarioSchema>; 