import { prisma } from '../../config/database';
import { CreatePredioInput, UpdatePredioInput } from './predio-entity';

export async function createPredio(data: CreatePredioInput) {
  return await prisma.predio.create({ data });
}

export async function getAllPredios() {
  return await prisma.predio.findMany();
}

export async function getPredioById(id: number) {
  return await prisma.predio.findUnique({ where: { id: Number(id) } });
}

export async function updatePredio(id: number, data: UpdatePredioInput) {
  return await prisma.predio.update({ where: { id: Number(id) }, data });
}

export async function deletePredio(id: number): Promise<boolean> {
  try {
    await prisma.predio.delete({ where: { id: Number(id) } });
    return true;
  } catch (error) {
    console.error('Erro ao deletar prédio:', error);
    // Se for erro de chave estrangeira, o prédio tem salas associadas
    if ((error as any).code === 'P2003') {
      throw new Error('Não é possível excluir este prédio pois ele possui salas associadas.');
    }
    throw error;
  }
}
