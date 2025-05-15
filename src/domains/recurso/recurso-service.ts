import {
  createRecurso,
  getAllRecursos,
  getRecursoById,
  updateRecurso,
  deleteRecurso,
} from './recurso-repository';
import { CreateRecursoInput, UpdateRecursoInput } from './recurso-entity';
import { toRecursoResponseDTO } from './dto/RecursoMapper';
import { RecursoResponseDTO } from './dto/RecursoResponseDTO';

class ServiceError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = 'ServiceError';
    this.statusCode = statusCode;
  }
}

export async function createRecursoService(data: CreateRecursoInput): Promise<RecursoResponseDTO> {
  try {
    const recurso = await createRecurso(data);
    return toRecursoResponseDTO(recurso);
  } catch (error) {
    throw new ServiceError('Erro ao criar recurso', 500);
  }
}

export async function getAllRecursosService(): Promise<RecursoResponseDTO[]> {
  try {
    const recursos = await getAllRecursos();
    return recursos.map(toRecursoResponseDTO);
  } catch (error) {
    throw new ServiceError('Erro ao listar recursos', 500);
  }
}

export async function getRecursoByIdService(id: number): Promise<RecursoResponseDTO> {
  try {
    const recurso = await getRecursoById(id);
    if (!recurso) throw new ServiceError('Recurso não encontrado', 404);
    return toRecursoResponseDTO(recurso);
  } catch (error) {
    if (error instanceof ServiceError) throw error;
    throw new ServiceError('Erro ao buscar recurso', 500);
  }
}

export async function updateRecursoService(id: number, data: UpdateRecursoInput): Promise<RecursoResponseDTO> {
  try {
    const recurso = await updateRecurso(id, data);
    if (!recurso) throw new ServiceError('Recurso não encontrado', 404);
    return toRecursoResponseDTO(recurso);
  } catch (error) {
    if ((error as any).code === 'P2025') {
      throw new ServiceError('Recurso não encontrado', 404);
    }
    throw new ServiceError('Erro ao atualizar recurso', 500);
  }
}

export async function deleteRecursoService(id: number): Promise<void> {
  try {
    const deleted = await deleteRecurso(id);
    if (!deleted) throw new ServiceError('Recurso não encontrado', 404);
  } catch (error) {
    if ((error as any).code === 'P2025') {
      throw new ServiceError('Recurso não encontrado', 404);
    }
    throw new ServiceError('Erro ao deletar recurso', 500);
  }
}
