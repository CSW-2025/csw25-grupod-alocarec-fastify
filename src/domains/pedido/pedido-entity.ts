import { Status } from '@prisma/client';

export { Status };

export interface Pedido {
  id: number;
  aula_id: number;
  disciplina_id: number;
  status: Status;
  nome: string;
  moderador_id: number | null;
  sala_id: number | null;
  recurso_id: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export type CreatePedidoInput = Omit<Pedido, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdatePedidoInput = Partial<CreatePedidoInput>;
