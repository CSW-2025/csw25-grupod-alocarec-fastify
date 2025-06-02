import { Status } from '@prisma/client';

export interface Pedido {
  id: number;
  nome: string;
  status: Status;
  moderador_id: number | null;
  sala_id: number | null;
  recurso_id: number | null;
  aula_id: number;
  disciplina_id: number;
  createdAt: Date;
  updatedAt: Date;
}

export type CreatePedidoInput = Omit<Pedido, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdatePedidoInput = Partial<CreatePedidoInput>;
