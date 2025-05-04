// user.repository.ts
import prisma from '../../config/database';
import { Usuario } from './usuario-entity';

type CreateUserData = Omit<Usuario, 'id'>;

export function createUser(data: CreateUserData) {
  return prisma.usuario.create({ data });
}

export function getAllUsers() {
  return prisma.usuario.findMany();
}
