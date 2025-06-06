import { prisma } from '../../config/database';
import { CreatePredioInput, UpdatePredioInput } from './predio-entity';

export async function createPredio(data: CreatePredioInput) {
  return await prisma.predio.create({ data });
}

export async function getAllPredios() {
  return await prisma.predio.findMany();
}

export async function getPredioById(id: number) {
  return await prisma.predio.findUnique({ where: { id } });
}

export async function updatePredio(id: number, data: UpdatePredioInput) {
  return await prisma.predio.update({ where: { id }, data });
}

export async function deletePredio(id: number): Promise<boolean> {
  try {
    await prisma.predio.delete({ where: { id } });
    return true;
  } catch (error) {
    return false;
  }
}
