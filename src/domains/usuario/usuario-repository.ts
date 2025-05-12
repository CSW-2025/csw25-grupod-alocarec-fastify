// user.repository.ts
import { prisma } from '../../config/database';
import { Usuario, CreateUsuarioInput, UpdateUsuarioInput, Sexo } from './usuario-entity';

export function createUser(data: CreateUsuarioInput): Promise<Usuario> {
  return prisma.usuario.create({
    data: {
      nome: data.nome,
      email: data.email,
      dataNascimento: data.dataNascimento,
      sexo: data.sexo as Sexo,
      perfilId: data.perfilId,
      telefones: {
        create: data.telefones // array de { numero, descricao }
      }
    },
    include: {
      telefones: true,
      perfil: true
    }
  }).then((user: any) => ({ ...user, sexo: user.sexo as Sexo }));
}

export function getAllUsers(): Promise<Usuario[]> {
  return prisma.usuario.findMany({
    include: {
      telefones: true,
      perfil: true
    }
  }).then((users: any[]) => users.map((user: any) => ({ ...user, sexo: user.sexo as Sexo })));
}

export function getUserById(id: number): Promise<Usuario | null> {
  return prisma.usuario.findUnique({
    where: { id },
    include: {
      telefones: true,
      perfil: true
    }
  }).then((user: any) => user ? { ...user, sexo: user.sexo as Sexo } : null);
}

export function updateUser(id: number, data: UpdateUsuarioInput): Promise<Usuario | null> {
  const updateData: any = { ...data };
  if (updateData.perfilId === undefined) delete updateData.perfilId;
  if (updateData.sexo) updateData.sexo = updateData.sexo as Sexo;
  return prisma.usuario.update({
    where: { id },
    data: updateData,
    include: {
      telefones: true,
      perfil: true
    }
  }).then((user: any) => user ? { ...user, sexo: user.sexo as Sexo } : null);
}

export function deleteUser(id: number): Promise<boolean> {
  return prisma.usuario.delete({
    where: { id }
  }).then(() => true).catch(() => false);
}
