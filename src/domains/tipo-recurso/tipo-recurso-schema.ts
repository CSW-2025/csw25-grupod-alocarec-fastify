import { z } from 'zod';

export const createTipoRecursoSchema = z.object({
  nome: z.string()
});

export const updateTipoRecursoSchema = createTipoRecursoSchema.partial().strict();
