import { FastifyInstance } from 'fastify';
import {
  createPedido,
  getAllPedidos,
  getPedidoById,
  updatePedido,
  deletePedido,
} from './pedido-controller';

export default async function pedidoRoutes(fastify: FastifyInstance) {
  fastify.post('/', createPedido);
  fastify.get('/', getAllPedidos);
  fastify.get('/:id', getPedidoById);
  fastify.put('/:id', updatePedido);
  fastify.delete('/:id', deletePedido);
}
