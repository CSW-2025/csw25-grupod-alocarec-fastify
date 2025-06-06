import { z } from 'zod';

export const createTurmaSchema = z.object({
  numero: z.string(),
  semestre: z.string(),
  professor_id: z.number(),
  vagas: z.number(),
  disciplina_id: z.number().optional()
});

export const updateTurmaSchema = createTurmaSchema.partial().strict();
