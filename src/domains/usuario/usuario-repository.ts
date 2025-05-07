// user.repository.ts
import prisma from '../../config/database';
import { Usuario, CreateUsuarioInput, UpdateUsuarioInput } from './usuario-entity';

export function createUser(data: CreateUsuarioInput): Promise<Usuario> {
  return prisma.usuario.create({ data }) as Promise<Usuario>;
}

export function getAllUsers(): Promise<Usuario[]> {
  return prisma.usuario.findMany() as Promise<Usuario[]>;
}

export function getUserById(id: number): Promise<Usuario | null> {
  return prisma.usuario.findUnique({
    where: { id }
  }) as Promise<Usuario | null>;
}

export function updateUser(id: number, data: UpdateUsuarioInput): Promise<Usuario | null> {
  return prisma.usuario.update({
    where: { id },
    data
  }) as Promise<Usuario | null>;
}

export function deleteUser(id: number): Promise<boolean> {
  return prisma.usuario.delete({
    where: { id }
  }).then(() => true).catch(() => false);
}
