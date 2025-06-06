import { z } from 'zod';

export const createPredioSchema = z.object({
  numero: z.string(),
  nome: z.string(),
  descricao: z.string().optional(),
  rua: z.string(),
  numero_endereco: z.string(),
  complemento: z.string().optional(),
  bairro: z.string(),
  cidade: z.string(),
  uf: z.string(),
  cep: z.string()
});

export const updatePredioSchema = createPredioSchema.partial().strict();
