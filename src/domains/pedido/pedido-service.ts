import { Pedido, CreatePedidoInput, UpdatePedidoInput } from './pedido-entity';
import * as repository from './pedido-repository';

function toPedido(pedido: any): Pedido {
  return {
    ...pedido,
    createdAt: pedido.createdAt ? pedido.createdAt.toISOString() : '',
    updatedAt: pedido.updatedAt ? pedido.updatedAt.toISOString() : '',
    aula_id: pedido.aula_id ?? null,
    disciplina_id: pedido.disciplina_id ?? null,
  };
}

export async function createPedido(data: CreatePedidoInput): Promise<Pedido> {
  const pedido = await repository.create(data);
  return toPedido(pedido);
}

export async function getAllPedidos(): Promise<Pedido[]> {
  const pedidos = await repository.findAll();
  return pedidos.map(toPedido);
}

export async function getPedidoById(id: number): Promise<Pedido | null> {
  const pedido = await repository.findById(id);
  return pedido ? toPedido(pedido) : null;
}

export async function updatePedido(id: number, data: UpdatePedidoInput): Promise<Pedido | null> {
  const existing = await repository.findById(id);
  if (!existing) return null;
  const pedido = await repository.update(id, data);
  return pedido ? toPedido(pedido) : null;
}

export async function deletePedido(id: number): Promise<void> {
  await repository.remove(id);
}
