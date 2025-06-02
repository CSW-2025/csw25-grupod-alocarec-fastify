import { z } from 'zod';

export const Status = {
  PENDENTE: 'PENDENTE',
  APROVADA: 'APROVADA',
  REJEITADA: 'REJEITADA'
} as const;

export const createPedidoSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  aula_id: z.number().int().positive('ID da aula deve ser positivo'),
  disciplina_id: z.number().int().positive('ID da disciplina deve ser positivo'),
  status: z.enum([Status.PENDENTE, Status.APROVADA, Status.REJEITADA]),
  moderador_id: z.number().int().positive('ID do moderador deve ser positivo').nullable(),
  sala_id: z.number().int().positive('ID da sala deve ser positivo').nullable(),
  recurso_id: z.number().int().positive('ID do recurso deve ser positivo').nullable()
});

export const updatePedidoSchema = createPedidoSchema.partial(); 