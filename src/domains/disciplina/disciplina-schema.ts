import { z } from 'zod';

export const createDisciplinaSchema = z.object({
  nome: z.string(),
  codigo: z.string(),
  creditos: z.number(),
  carga_horaria: z.number(),
  ementa: z.string().optional()
});

export const updateDisciplinaSchema = createDisciplinaSchema.partial().strict();
