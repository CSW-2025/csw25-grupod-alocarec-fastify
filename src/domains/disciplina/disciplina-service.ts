import { Disciplina, CreateDisciplinaInput, UpdateDisciplinaInput } from './disciplina-entity';
import * as repository from './disciplina-repository';
import { toDisciplinaResponseDTO } from './dto/DisciplinaMapper';
import { DisciplinaResponseDTO } from './dto/DisciplinaResponseDTO';

class ServiceError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = 'ServiceError';
    this.statusCode = statusCode;
  }
}

export async function createDisciplinaService(data: CreateDisciplinaInput): Promise<DisciplinaResponseDTO> {
  try {
    const disciplina = await repository.create(data);
    return toDisciplinaResponseDTO(disciplina);
  } catch (error) {
    throw new ServiceError('Erro ao criar disciplina', 500);
  }
}

export async function getAllDisciplinasService(): Promise<DisciplinaResponseDTO[]> {
  try {
    const disciplinas = await repository.findAll();
    return disciplinas.map(toDisciplinaResponseDTO);
  } catch (error) {
    throw new ServiceError('Erro ao listar disciplinas', 500);
  }
}

export async function getDisciplinaByIdService(id: number): Promise<DisciplinaResponseDTO> {
  try {
    const disciplina = await repository.findById(id);
    if (!disciplina) throw new ServiceError('Disciplina não encontrada', 404);
    return toDisciplinaResponseDTO(disciplina);
  } catch (error) {
    if (error instanceof ServiceError) throw error;
    throw new ServiceError('Erro ao buscar disciplina', 500);
  }
}

export async function updateDisciplinaService(id: number, data: UpdateDisciplinaInput): Promise<DisciplinaResponseDTO> {
  try {
    const existing = await repository.findById(id);
    if (!existing) throw new ServiceError('Disciplina não encontrada', 404);
    const disciplina = await repository.update(id, data);
    return toDisciplinaResponseDTO(disciplina);
  } catch (error) {
    if ((error as any).code === 'P2025') {
      throw new ServiceError('Disciplina não encontrada', 404);
    }
    throw new ServiceError('Erro ao atualizar disciplina', 500);
  }
}

export async function deleteDisciplinaService(id: number): Promise<void> {
  try {
    const deleted = await repository.remove(id);
    if (!deleted) throw new ServiceError('Disciplina não encontrada', 404);
  } catch (error) {
    if ((error as any).code === 'P2025') {
      throw new ServiceError('Disciplina não encontrada', 404);
    }
    throw new ServiceError('Erro ao deletar disciplina', 500);
  }
}
