import { prisma } from '../../config/database';
import { Sala, CreateSalaInput, UpdateSalaInput } from './sala-entity';

export function createSala(data: CreateSalaInput): Promise<Sala> {
  return prisma.sala.create({
    data,
    include: { predio: true }
  });
}

export function findAllSalas(): Promise<Sala[]> {
  return prisma.sala.findMany({
    include: { predio: true }
  });
}

export function findSalaById(id: number): Promise<Sala | null> {
  return prisma.sala.findUnique({
    where: { id: Number(id) },
    include: { predio: true }
  });
}

export function updateSala(id: number, data: UpdateSalaInput): Promise<Sala> {
  return prisma.sala.update({
    where: { id: Number(id) },
    data,
    include: { predio: true }
  });
}

export function deleteSala(id: number): Promise<boolean> {
  return prisma.sala.delete({ where: { id: Number(id) } })
    .then(() => true)
    .catch((error) => {
      console.error('Erro ao deletar sala:', error);
      // Se for erro de chave estrangeira, a sala tem relacionamentos
      if (error.code === 'P2003') {
        throw new Error('Não é possível excluir esta sala pois ela possui pedidos, reservas ou aulas associadas.');
      }
      throw error;
    });
} 