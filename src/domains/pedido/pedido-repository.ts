import prisma from '../../config/database';
import { CreatePedidoInput, UpdatePedidoInput } from './pedido-entity';

export function create(data: CreatePedidoInput) {
  return prisma.pedido.create({ data });
}

export function findAll() {
  return prisma.pedido.findMany();
}

export function findById(id: number) {
  return prisma.pedido.findUnique({ where: { id } });
}

export function update(id: number, data: UpdatePedidoInput) {
  return prisma.pedido.update({ where: { id }, data });
}

export function remove(id: number) {
  return prisma.pedido.delete({ where: { id } });
}
