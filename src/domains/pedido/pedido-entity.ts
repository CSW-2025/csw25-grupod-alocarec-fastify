export enum Status {
  PENDENTE = 'pendente',
  APROVADA = 'aprovada',
  REJEITADA = 'rejeitada',
}

export interface Pedido {
  id: number;
  aula_id: number;
  disciplina_id: number;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}

export type CreatePedidoInput = Omit<Pedido, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdatePedidoInput = Partial<CreatePedidoInput>;
