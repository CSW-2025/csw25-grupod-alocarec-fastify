import { z } from 'zod';

export const createSalaSchema = z.object({
  nome: z.string(),
  capacidade: z.number(),
  predioId: z.number()
});

export const updateSalaSchema = createSalaSchema.partial().strict();
