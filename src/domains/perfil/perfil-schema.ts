import { z } from 'zod';

export const createPerfilSchema = z.object({
  nome: z.string()
});

export const updatePerfilSchema = createPerfilSchema.partial().strict();
