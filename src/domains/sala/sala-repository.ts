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
    where: { id },
    include: { predio: true }
  });
}

export function updateSala(id: number, data: UpdateSalaInput): Promise<Sala> {
  return prisma.sala.update({
    where: { id },
    data,
    include: { predio: true }
  });
}

export function deleteSala(id: number): Promise<boolean> {
  return prisma.sala.delete({ where: { id } })
    .then(() => true)
    .catch(() => false);
} 