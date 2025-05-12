// user.repository.ts
import { prisma } from '../../config/database';
import { Usuario, CreateUsuarioInput, UpdateUsuarioInput } from './usuario-entity';

export function createUser(data: CreateUsuarioInput): Promise<Usuario> {
  return prisma.usuario.create({
    data: {
      nome: data.nome,
      email: data.email,
      dataNascimento: data.dataNascimento,
      sexo: data.sexo,
      perfilId: data.perfilId,
      telefones: {
        create: data.telefones // array de { numero, descricao }
      },
      createdAt: new Date(),
      updatedAt: new Date()
    },
    include: {
      telefones: true,
      perfil: true
    }
  });
}

export function getAllUsers(): Promise<Usuario[]> {
  return prisma.usuario.findMany({
    include: {
      telefones: true,
      perfil: true
    }
  });
}

export function getUserById(id: number): Promise<Usuario | null> {
  return prisma.usuario.findUnique({
    where: { id },
    include: {
      telefones: true,
      perfil: true
    }
  });
}

export function updateUser(id: number, data: UpdateUsuarioInput): Promise<Usuario | null> {
  const updateData: any = { ...data, updatedAt: new Date() };
  if (updateData.perfilId === undefined) delete updateData.perfilId;
  return prisma.usuario.update({
    where: { id },
    data: updateData,
    include: {
      telefones: true,
      perfil: true
    }
  });
}

export function deleteUser(id: number): Promise<boolean> {
  return prisma.usuario.delete({
    where: { id }
  }).then(() => true).catch(() => false);
}
