import { Pedido, CreatePedidoInput, UpdatePedidoInput } from './pedido-entity';
import * as repository from './pedido-repository';

export async function createPedido(data: CreatePedidoInput): Promise<Pedido> {
  return await repository.create(data);
}

export async function getAllPedidos(): Promise<Pedido[]> {
  return await repository.findAll();
}

export async function getPedidoById(id: number): Promise<Pedido | null> {
  return await repository.findById(id);
}

export async function updatePedido(id: number, data: UpdatePedidoInput): Promise<Pedido | null> {
  const existing = await repository.findById(id);
  if (!existing) return null;

  return await repository.update(id, data);
}

export async function deletePedido(id: number): Promise<void> {
  await repository.remove(id);
}
