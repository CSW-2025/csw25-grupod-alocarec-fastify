// user.service.ts
import * as userRepository from './usuario-repository';
import { Usuario, CreateUsuarioInput } from './usuario-entity';
import bcrypt from 'bcryptjs';
import { toUsuarioResponseDTO } from './dto/UsuarioMapper';
import { UsuarioResponseDTO } from './dto/UsuarioResponseDTO';
import { prisma } from '../../config/database';

class ServiceError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = 'ServiceError';
    this.statusCode = statusCode;
  }
}

export async function createUserService(data: CreateUsuarioInput): Promise<UsuarioResponseDTO> {
  try {
    const hashedPassword = await bcrypt.hash(data.senha, 10);
    const usuario = await userRepository.createUser({ ...data, senha: hashedPassword });
    return toUsuarioResponseDTO(usuario);
  } catch (error) {
    throw new ServiceError('Erro ao criar usuário', 500);
  }
}

export async function getAllUsersService(): Promise<UsuarioResponseDTO[]> {
  try {
    const usuarios = await userRepository.getAllUsers();
    return usuarios.map(toUsuarioResponseDTO);
  } catch (error) {
    throw new ServiceError('Erro ao listar usuários', 500);
  }
}

export async function getUserByIdService(id: number): Promise<UsuarioResponseDTO> {
  try {
    const usuario = await userRepository.getUserById(id);
    if (!usuario) throw new ServiceError('Usuário não encontrado', 404);
    return toUsuarioResponseDTO(usuario);
  } catch (error) {
    if (error instanceof ServiceError) throw error;
    throw new ServiceError('Erro ao buscar usuário', 500);
  }
}

export async function updateUserService(id: number, data: Partial<CreateUsuarioInput>): Promise<UsuarioResponseDTO> {
  try {
    const updateData = { ...data };
    if (data.senha) {
      updateData.senha = await bcrypt.hash(data.senha, 10);
    }
    const usuario = await userRepository.updateUser(id, updateData);
    if (!usuario) throw new ServiceError('Usuário não encontrado', 404);
    return toUsuarioResponseDTO(usuario);
  } catch (error) {
    if ((error as any).code === 'P2025') {
      throw new ServiceError('Usuário não encontrado', 404);
    }
    throw new ServiceError('Erro ao atualizar usuário', 500);
  }
}

export async function deleteUserService(id: number): Promise<void> {
  try {
    const deleted = await userRepository.deleteUser(id);
    if (!deleted) throw new ServiceError('Usuário não encontrado', 404);
  } catch (error) {
    if ((error as any).code === 'P2025') {
      throw new ServiceError('Usuário não encontrado', 404);
    }
    throw new ServiceError('Erro ao deletar usuário', 500);
  }
}

export async function getUserByEmail(email: string) {
  return prisma.usuario.findUnique({
    where: { email },
    include: { perfil: true }
  });
}
