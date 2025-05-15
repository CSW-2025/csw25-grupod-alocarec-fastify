import { Perfil, CreatePerfilInput, UpdatePerfilInput } from './perfil-entity';
import * as perfilRepository from './perfil-repository';
import { toPerfilResponseDTO } from './dto/PerfilMapper';
import { PerfilResponseDTO } from './dto/PerfilResponseDTO';

class ServiceError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = 'ServiceError';
    this.statusCode = statusCode;
  }
}

export async function createPerfilService(data: CreatePerfilInput): Promise<PerfilResponseDTO> {
  try {
    const perfil = await perfilRepository.createPerfil(data);
    return toPerfilResponseDTO(perfil);
  } catch (error) {
    throw new ServiceError('Erro ao criar perfil', 500);
  }
}

export async function getAllPerfisService(): Promise<PerfilResponseDTO[]> {
  try {
    const perfis = await perfilRepository.getAllPerfis();
    return perfis.map(toPerfilResponseDTO);
  } catch (error) {
    throw new ServiceError('Erro ao listar perfis', 500);
  }
}

export async function getPerfilByIdService(id: number): Promise<PerfilResponseDTO> {
  try {
    const perfil = await perfilRepository.getPerfilById(id);
    if (!perfil) throw new ServiceError('Perfil não encontrado', 404);
    return toPerfilResponseDTO(perfil);
  } catch (error) {
    if (error instanceof ServiceError) throw error;
    throw new ServiceError('Erro ao buscar perfil', 500);
  }
}

export async function updatePerfilService(id: number, data: UpdatePerfilInput): Promise<PerfilResponseDTO> {
  try {
    const perfil = await perfilRepository.updatePerfil(id, data);
    if (!perfil) throw new ServiceError('Perfil não encontrado', 404);
    return toPerfilResponseDTO(perfil);
  } catch (error) {
    if ((error as any).code === 'P2025') {
      throw new ServiceError('Perfil não encontrado', 404);
    }
    throw new ServiceError('Erro ao atualizar perfil', 500);
  }
}

export async function deletePerfilService(id: number): Promise<void> {
  try {
    const deleted = await perfilRepository.deletePerfil(id);
    if (!deleted) throw new ServiceError('Perfil não encontrado', 404);
  } catch (error) {
    if ((error as any).code === 'P2025') {
      throw new ServiceError('Perfil não encontrado', 404);
    }
    throw new ServiceError('Erro ao deletar perfil', 500);
  }
} 