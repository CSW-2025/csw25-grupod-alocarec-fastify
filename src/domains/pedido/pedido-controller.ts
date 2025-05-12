import { FastifyReply, FastifyRequest } from 'fastify';
import { CreatePedidoInput, UpdatePedidoInput } from './pedido-entity';
import * as pedidoService from './pedido-service';

export async function createPedido(
  request: FastifyRequest<{ Body: CreatePedidoInput }>,
  reply: FastifyReply
) {
  const pedido = await pedidoService.createPedido(request.body);
  return reply.code(201).send(pedido);
}

export async function getAllPedidos(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const pedidos = await pedidoService.getAllPedidos();
  return reply.send(pedidos);
}

export async function getPedidoById(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const pedido = await pedidoService.getPedidoById(Number(request.params.id));
  return pedido ? reply.send(pedido) : reply.code(404).send({ message: 'Pedido não encontrado' });
}

export async function updatePedido(
  request: FastifyRequest<{ Params: { id: string }, Body: UpdatePedidoInput }>,
  reply: FastifyReply
) {
  const pedido = await pedidoService.updatePedido(Number(request.params.id), request.body);
  return reply.send(pedido);
}

export async function deletePedido(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  await pedidoService.deletePedido(Number(request.params.id));
  return reply.code(204).send();
}
