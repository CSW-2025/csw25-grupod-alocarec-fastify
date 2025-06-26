// user.repository.ts
import { prisma } from '../../config/database';
import { Usuario, CreateUsuarioInput, UpdateUsuarioInput, Sexo } from './usuario-entity';

export async function createUser(data: CreateUsuarioInput): Promise<Usuario> {
  return prisma.usuario.create({
    data: {
      nome: data.nome,
      email: data.email,
      dataNascimento: new Date(data.dataNascimento),
      sexo: data.sexo as Sexo,
      perfilId: data.perfilId,
      senha: data.senha,
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
    where: { id: Number(id) },
    include: {
      telefones: true,
      perfil: true
    }
  }).then((user: any) => user ? { ...user, sexo: user.sexo as Sexo } : null);
}

export function updateUser(id: number, data: UpdateUsuarioInput): Promise<Usuario | null> {
  const updateData: any = { ...data };

  if (updateData.sexo) updateData.sexo = updateData.sexo as Sexo;
  if (updateData.dataNascimento) updateData.dataNascimento = new Date(updateData.dataNascimento);

  if (data.telefones) {
    updateData.telefones = {
      deleteMany: {},
      create: data.telefones
    };
  }

  if (data.perfilId !== undefined) {
    updateData.perfilId = data.perfilId;
  }

  return prisma.usuario.update({
    where: { id: Number(id) },
    data: updateData,
    include: {
      telefones: true,
      perfil: true
    }
  }).then((user: any) => user ? { ...user, sexo: user.sexo as Sexo } : null);
}

export function deleteUser(id: number): Promise<boolean> {
  return prisma.usuario.delete({
    where: { id: Number(id) }
  }).then(() => true).catch(() => false);
}
