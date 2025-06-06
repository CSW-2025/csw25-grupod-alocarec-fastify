import { z } from 'zod';

export const createRecursoSchema = z.object({
  descricao: z.string(),
  status: z.string(),
  disponivel: z.boolean(),
  tipo_recurso_id: z.number()
});

export const updateRecursoSchema = createRecursoSchema.partial().strict();
