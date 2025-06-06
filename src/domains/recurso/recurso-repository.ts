import { prisma } from '../../config/database';
import { CreateRecursoInput, UpdateRecursoInput } from './recurso-entity';

export async function createRecurso(data: CreateRecursoInput) {
  return await prisma.recurso.create({ data });
}

export async function getAllRecursos() {
  return await prisma.recurso.findMany();
}

export async function getRecursoById(id: number) {
  return await prisma.recurso.findUnique({ where: { id } });
}

export async function updateRecurso(id: number, data: UpdateRecursoInput) {
  return await prisma.recurso.update({ where: { id }, data });
}

export async function deleteRecurso(id: number): Promise<boolean> {
  try {
    await prisma.recurso.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}
