export interface Pedido {
  id: number;
  aula_id: number;
  disciplina_id: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreatePedidoInput = Omit<Pedido, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdatePedidoInput = Partial<CreatePedidoInput>;
