import {
  createTipoRecurso,
  getAllTipoRecursos,
  getTipoRecursoById,
  updateTipoRecurso,
  deleteTipoRecurso,
} from './tipo-recurso-repository';
import { CreateTipoRecursoInput, UpdateTipoRecursoInput, TipoRecurso } from './tipo-recurso-entity';
import { toTipoRecursoResponseDTO } from './dto/TipoRecursoMapper';
import { TipoRecursoResponseDTO } from './dto/TipoRecursoResponseDTO';

class ServiceError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = 'ServiceError';
    this.statusCode = statusCode;
  }
}

export async function createTipoRecursoService(data: CreateTipoRecursoInput): Promise<TipoRecursoResponseDTO> {
  try {
    const tipo = await createTipoRecurso(data);
    return toTipoRecursoResponseDTO(tipo);
  } catch (error) {
    throw new ServiceError('Erro ao criar tipo de recurso', 500);
  }
}

export async function getAllTipoRecursosService(): Promise<TipoRecursoResponseDTO[]> {
  try {
    const tipos = await getAllTipoRecursos();
    return tipos.map(toTipoRecursoResponseDTO);
  } catch (error) {
    throw new ServiceError('Erro ao listar tipos de recurso', 500);
  }
}

export async function getTipoRecursoByIdService(id: number): Promise<TipoRecursoResponseDTO> {
  try {
    const tipo = await getTipoRecursoById(id);
    if (!tipo) throw new ServiceError('Tipo de recurso não encontrado', 404);
    return toTipoRecursoResponseDTO(tipo);
  } catch (error) {
    if (error instanceof ServiceError) throw error;
    throw new ServiceError('Erro ao buscar tipo de recurso', 500);
  }
}

export async function updateTipoRecursoService(id: number, data: UpdateTipoRecursoInput): Promise<TipoRecursoResponseDTO> {
  try {
    const tipo = await updateTipoRecurso(id, data);
    if (!tipo) throw new ServiceError('Tipo de recurso não encontrado', 404);
    return toTipoRecursoResponseDTO(tipo);
  } catch (error) {
    if ((error as any).code === 'P2025') {
      throw new ServiceError('Tipo de recurso não encontrado', 404);
    }
    throw new ServiceError('Erro ao atualizar tipo de recurso', 500);
  }
}

export async function deleteTipoRecursoService(id: number): Promise<void> {
  try {
    const deleted = await deleteTipoRecurso(id);
    if (!deleted) throw new ServiceError('Tipo de recurso não encontrado', 404);
  } catch (error) {
    if ((error as any).code === 'P2025') {
      throw new ServiceError('Tipo de recurso não encontrado', 404);
    }
    throw new ServiceError('Erro ao deletar tipo de recurso', 500);
  }
}
