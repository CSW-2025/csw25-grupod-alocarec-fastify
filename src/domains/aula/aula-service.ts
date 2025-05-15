import { AulaRepository } from './aula-repository';
import { Aula } from './aula-entity';
import { toAulaResponseDTO } from './dto/AulaMapper';
import { AulaResponseDTO } from './dto/AulaResponseDTO';

const aulaRepository = new AulaRepository();

function toAula(aula: any): Aula {
  return {
    ...aula,
    data_inicio: aula.data_inicio instanceof Date ? aula.data_inicio.toISOString() : aula.data_inicio,
    data_fim: aula.data_fim instanceof Date ? aula.data_fim.toISOString() : aula.data_fim,
    createdAt: aula.createdAt,
    updatedAt: aula.updatedAt,
  };
}

class ServiceError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = 'ServiceError';
    this.statusCode = statusCode;
  }
}

export async function createAula(data: any): Promise<AulaResponseDTO> {
  try {
    const aula = await aulaRepository.create(data);
    return toAulaResponseDTO(aula);
  } catch (error) {
    throw new ServiceError('Erro ao criar aula', 500);
  }
}

export async function getAllAulas(): Promise<AulaResponseDTO[]> {
  try {
    const aulas = await aulaRepository.findAll();
    return aulas.map(toAulaResponseDTO);
  } catch (error) {
    throw new ServiceError('Erro ao listar aulas', 500);
  }
}

export async function getAulaById(id: number): Promise<AulaResponseDTO> {
  try {
    const aula = await aulaRepository.findById(id);
    if (!aula) {
      throw new ServiceError('Aula não encontrada', 404);
    }
    return toAulaResponseDTO(aula);
  } catch (error) {
    if (error instanceof ServiceError) throw error;
    throw new ServiceError('Erro ao buscar aula', 500);
  }
}

export async function updateAula(id: number, data: any): Promise<AulaResponseDTO> {
  try {
    const aula = await aulaRepository.update(id, data);
    return toAulaResponseDTO(aula);
  } catch (error) {
    if ((error as any).code === 'P2025') {
      throw new ServiceError('Aula não encontrada', 404);
    }
    throw new ServiceError('Erro ao atualizar aula', 500);
  }
}

export async function deleteAula(id: number): Promise<void> {
  try {
    await aulaRepository.delete(id);
  } catch (error) {
    if ((error as any).code === 'P2025') {
      throw new ServiceError('Aula não encontrada', 404);
    }
    throw new ServiceError('Erro ao deletar aula', 500);
  }
}
