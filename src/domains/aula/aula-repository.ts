import { prisma } from '../../config/database';
import { CreateAulaInput, UpdateAulaInput } from './aula-entity';

export function create(data: CreateAulaInput) {
  return prisma.aula.create({ data });
}

export function findAll() {
  return prisma.aula.findMany();
}

export function findById(id: number) {
  return prisma.aula.findUnique({ where: { id } });
}

export function update(id: number, data: UpdateAulaInput) {
  return prisma.aula.update({ where: { id }, data });
}

export function remove(id: number) {
  return prisma.aula.delete({ where: { id } });
}
