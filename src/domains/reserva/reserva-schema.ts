import { z } from 'zod';

export const createReservaSchema = z.object({
  salaId: z.number(),
  usuarioId: z.number(),
  dataHora: z.string()
});

export const updateReservaSchema = createReservaSchema.partial().strict();
