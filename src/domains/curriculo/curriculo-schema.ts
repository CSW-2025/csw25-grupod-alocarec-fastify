import { z } from 'zod';

export const createCurriculoSchema = z.object({
  nome_curso: z.string(),
  semestre_inicio_vigencia: z.string(),
  semestre_fim_vigencia: z.string()
});

export const updateCurriculoSchema = createCurriculoSchema.partial().strict();
