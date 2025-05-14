import { Turma, CreateTurmaInput, UpdateTurmaInput } from './turma-entity';
import { createTurma, getAllTurmas, getTurmaById, updateTurma, deleteTurma } from './turma-repository';
import { toTurmaResponseDTO } from './dto/TurmaMapper';
import { TurmaResponseDTO } from './dto/TurmaResponseDTO';

class ServiceError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = 'ServiceError';
    this.statusCode = statusCode;
  }
}

export async function createTurmaService(data: CreateTurmaInput): Promise<TurmaResponseDTO> {
  try {
    const turma = await createTurma(data);
    return toTurmaResponseDTO(turma);
  } catch (error) {
    throw new ServiceError('Erro ao criar turma', 500);
  }
}

export async function getAllTurmasService(): Promise<TurmaResponseDTO[]> {
  try {
    const turmas = await getAllTurmas();
    return turmas.map(toTurmaResponseDTO);
  } catch (error) {
    throw new ServiceError('Erro ao listar turmas', 500);
  }
}

export async function getTurmaByIdService(id: number): Promise<TurmaResponseDTO> {
  try {
    const turma = await getTurmaById(id);
    if (!turma) throw new ServiceError('Turma não encontrada', 404);
    return toTurmaResponseDTO(turma);
  } catch (error) {
    if (error instanceof ServiceError) throw error;
    throw new ServiceError('Erro ao buscar turma', 500);
  }
}

export async function updateTurmaService(id: number, data: UpdateTurmaInput): Promise<TurmaResponseDTO> {
  try {
    const turma = await updateTurma(id, data);
    if (!turma) throw new ServiceError('Turma não encontrada', 404);
    return toTurmaResponseDTO(turma);
  } catch (error) {
    if ((error as any).code === 'P2025') {
      throw new ServiceError('Turma não encontrada', 404);
    }
    throw new ServiceError('Erro ao atualizar turma', 500);
  }
}

export async function deleteTurmaService(id: number): Promise<void> {
  try {
    const deleted = await deleteTurma(id);
    if (!deleted) throw new ServiceError('Turma não encontrada', 404);
  } catch (error) {
    if ((error as any).code === 'P2025') {
      throw new ServiceError('Turma não encontrada', 404);
    }
    throw new ServiceError('Erro ao deletar turma', 500);
  }
} 