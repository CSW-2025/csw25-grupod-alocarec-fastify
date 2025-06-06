import { Pedido, CreatePedidoInput, UpdatePedidoInput } from './pedido-entity';
import * as repository from './pedido-repository';
import { toPedidoResponseDTO } from './dto/PedidoMapper';
import { PedidoResponseDTO } from './dto/PedidoResponseDTO';

class ServiceError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = 'ServiceError';
    this.statusCode = statusCode;
  }
}

export async function createPedidoService(data: CreatePedidoInput): Promise<PedidoResponseDTO> {
  try {
    const pedido = await repository.create(data);
    return toPedidoResponseDTO(pedido);
  } catch (error) {
    throw new ServiceError('Erro ao criar pedido', 500);
  }
}

export async function getAllPedidosService(): Promise<PedidoResponseDTO[]> {
  try {
    const pedidos = await repository.findAll();
    return pedidos.map(toPedidoResponseDTO);
  } catch (error) {
    throw new ServiceError('Erro ao listar pedidos', 500);
  }
}

export async function getPedidoByIdService(id: number): Promise<PedidoResponseDTO> {
  try {
    const pedido = await repository.findById(id);
    if (!pedido) throw new ServiceError('Pedido não encontrado', 404);
    return toPedidoResponseDTO(pedido);
  } catch (error) {
    if (error instanceof ServiceError) throw error;
    throw new ServiceError('Erro ao buscar pedido', 500);
  }
}

export async function updatePedidoService(id: number, data: UpdatePedidoInput): Promise<PedidoResponseDTO> {
  try {
    const existing = await repository.findById(id);
    if (!existing) throw new ServiceError('Pedido não encontrado', 404);
    const pedido = await repository.update(id, data);
    return toPedidoResponseDTO(pedido);
  } catch (error) {
    if (error instanceof ServiceError) throw error;
    if ((error as any).code === 'P2025') {
      throw new ServiceError('Pedido não encontrado', 404);
    }
    throw new ServiceError('Erro ao atualizar pedido', 500);
  }
}

export async function deletePedidoService(id: number): Promise<void> {
  try {
    const deleted = await repository.remove(id);
    if (!deleted) throw new ServiceError('Pedido não encontrado', 404);
  } catch (error) {
    if (error instanceof ServiceError) throw error;
    if ((error as any).code === 'P2025') {
      throw new ServiceError('Pedido não encontrado', 404);
    }
    throw new ServiceError('Erro ao deletar pedido', 500);
  }
}
