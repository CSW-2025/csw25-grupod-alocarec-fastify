import { z } from 'zod';

export const createPedidoSchema = z.object({
  aula_id: z.number(),
  disciplina_id: z.number(),
  status: z.enum(['PENDENTE', 'APROVADA', 'REJEITADA']),
  nome: z.string(),
  moderador_id: z.number().nullable(),
  sala_id: z.number().nullable(),
  recurso_id: z.number().nullable()
});

export const updatePedidoSchema = z.object({
  status: z.enum(['PENDENTE', 'APROVADA', 'REJEITADA']).optional(),
  nome: z.string().optional(),
  moderador_id: z.number().nullable().optional(),
  sala_id: z.number().nullable().optional(),
  recurso_id: z.number().nullable().optional()
}); 