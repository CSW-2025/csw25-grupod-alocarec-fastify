import { FastifyRequest, FastifyReply } from 'fastify';
import { CreatePedidoInput, UpdatePedidoInput } from './pedido-entity';
import { createPedidoService, getAllPedidosService, getPedidoByIdService, updatePedidoService, deletePedidoService } from './pedido-service';

export async function createPedidoController(request: FastifyRequest<{ Body: CreatePedidoInput }>, reply: FastifyReply) {
  const pedido = await createPedidoService(request.body);
  return reply.code(201).send(pedido);
}

export async function getAllPedidosController(request: FastifyRequest, reply: FastifyReply) {
  const pedidos = await getAllPedidosService();
  return reply.send(pedidos);
}

export async function getPedidoByIdController(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
  const pedido = await getPedidoByIdService(request.params.id);
  return reply.send(pedido);
}

export async function updatePedidoController(request: FastifyRequest<{ Params: { id: number }, Body: UpdatePedidoInput }>, reply: FastifyReply) {
  const pedido = await updatePedidoService(request.params.id, request.body);
  return reply.send(pedido);
}

export async function deletePedidoController(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
  await deletePedidoService(request.params.id);
  return reply.code(204).send();
}

export {
  createPedidoController as createPedido,
  getAllPedidosController as getAllPedidos,
  getPedidoByIdController as getPedidoById,
  updatePedidoController as updatePedido,
  deletePedidoController as deletePedido
};
