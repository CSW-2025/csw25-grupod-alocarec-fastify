import { z } from 'zod';

export const createAulaSchema = z.object({
  nome: z.string(),
  data_inicio: z.string(),
  data_fim: z.string(),
  descricao: z.string().optional(),
  horario: z.string().optional()
});

export const updateAulaSchema = createAulaSchema.partial().strict();
