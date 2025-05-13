import { prisma } from '../../config/database';
import { CreateDisciplinaInput, UpdateDisciplinaInput } from './disciplina-entity';

export function create(data: CreateDisciplinaInput) {
  return prisma.disciplina.create({ data });
}

export function findAll() {
  return prisma.disciplina.findMany();
}

export function findById(id: number) {
  return prisma.disciplina.findUnique({
    where: { id },
  });
}

export function update(id: number, data: UpdateDisciplinaInput) {
  return prisma.disciplina.update({ where: { id }, data });
}

export function remove(id: number) {
  return prisma.disciplina.delete({ where: { id } });
}
