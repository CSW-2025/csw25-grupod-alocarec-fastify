import * as salaRepository from './sala-repository';
import { Sala, CreateSalaInput, UpdateSalaInput } from './sala-entity';
import { toSalaResponseDTO } from './dto/SalaMapper';
import { SalaResponseDTO } from './dto/SalaResponseDTO';

class ServiceError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = 'ServiceError';
    this.statusCode = statusCode;
  }
}

export async function createSalaService(data: CreateSalaInput): Promise<SalaResponseDTO> {
  try {
    const sala = await salaRepository.createSala(data);
    return toSalaResponseDTO(sala);
  } catch (error) {
    throw new ServiceError('Erro ao criar sala', 500);
  }
}

export async function getAllSalasService(): Promise<SalaResponseDTO[]> {
  try {
    const salas = await salaRepository.findAllSalas();
    return salas.map(toSalaResponseDTO);
  } catch (error) {
    throw new ServiceError('Erro ao listar salas', 500);
  }
}

export async function getSalaByIdService(id: number): Promise<SalaResponseDTO> {
  try {
    const sala = await salaRepository.findSalaById(id);
    if (!sala) throw new ServiceError('Sala não encontrada', 404);
    return toSalaResponseDTO(sala);
  } catch (error) {
    if (error instanceof ServiceError) throw error;
    throw new ServiceError('Erro ao buscar sala', 500);
  }
}

export async function updateSalaService(id: number, data: UpdateSalaInput): Promise<SalaResponseDTO> {
  try {
    const sala = await salaRepository.updateSala(id, data);
    if (!sala) throw new ServiceError('Sala não encontrada', 404);
    return toSalaResponseDTO(sala);
  } catch (error) {
    if ((error as any).code === 'P2025') {
      throw new ServiceError('Sala não encontrada', 404);
    }
    throw new ServiceError('Erro ao atualizar sala', 500);
  }
}

export async function deleteSalaService(id: number): Promise<void> {
  try {
    const deleted = await salaRepository.deleteSala(id);
    if (!deleted) throw new ServiceError('Sala não encontrada', 404);
  } catch (error) {
    if ((error as any).code === 'P2025') {
      throw new ServiceError('Sala não encontrada', 404);
    }
    throw new ServiceError('Erro ao deletar sala', 500);
  }
} 