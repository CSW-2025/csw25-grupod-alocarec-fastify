import { prisma } from '../../config/database';
import { Perfil, CreatePerfilInput, UpdatePerfilInput } from './perfil-entity';

export function createPerfil(data: CreatePerfilInput): Promise<Perfil> {
  return prisma.perfil.create({ data }) as Promise<Perfil>;
}

export function getAllPerfis(): Promise<Perfil[]> {
  return prisma.perfil.findMany() as Promise<Perfil[]>;
}

export function getPerfilById(id: number): Promise<Perfil | null> {
  return prisma.perfil.findUnique({
    where: { id }
  }) as Promise<Perfil | null>;
}

export function updatePerfil(id: number, data: UpdatePerfilInput): Promise<Perfil | null> {
  return prisma.perfil.update({
    where: { id },
    data
  }) as Promise<Perfil | null>;
}

export function deletePerfil(id: number): Promise<boolean> {
  return prisma.perfil.delete({
    where: { id }
  }).then(() => true).catch(() => false);
} 