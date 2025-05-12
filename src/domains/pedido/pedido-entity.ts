export interface Pedido {
    id: number;
    nome: string;
    moderador_id?: number;
    sala_id?: number;
    recurso_id?: number;
    status: string;
}

export type CreatePedidoInput = Omit<Pedido, 'id'>;
export type UpdatePedidoInput = Partial<CreatePedidoInput>; 