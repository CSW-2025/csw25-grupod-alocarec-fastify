import { Curriculo, CreateCurriculoInput, UpdateCurriculoInput } from './curriculo-entity';
import { createCurriculo, getAllCurriculos, getCurriculoById, updateCurriculo, deleteCurriculo } from './curriculo-repository';
import { toCurriculoResponseDTO } from './dto/CurriculoMapper';
import { CurriculoResponseDTO } from './dto/CurriculoResponseDTO';

class ServiceError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = 'ServiceError';
    this.statusCode = statusCode;
  }
}

export async function createCurriculoService(data: CreateCurriculoInput): Promise<CurriculoResponseDTO> {
  try {
    const curriculo = await createCurriculo(data);
    return toCurriculoResponseDTO(curriculo);
  } catch (error) {
    throw new ServiceError('Erro ao criar currículo', 500);
  }
}

export async function getAllCurriculosService(): Promise<CurriculoResponseDTO[]> {
  try {
    const curriculos = await getAllCurriculos();
    return curriculos.map(toCurriculoResponseDTO);
  } catch (error) {
    throw new ServiceError('Erro ao listar currículos', 500);
  }
}

export async function getCurriculoByIdService(id: number): Promise<CurriculoResponseDTO> {
  try {
    const curriculo = await getCurriculoById(id);
    if (!curriculo) throw new ServiceError('Currículo não encontrado', 404);
    return toCurriculoResponseDTO(curriculo);
  } catch (error) {
    if (error instanceof ServiceError) throw error;
    throw new ServiceError('Erro ao buscar currículo', 500);
  }
}

export async function updateCurriculoService(id: number, data: UpdateCurriculoInput): Promise<CurriculoResponseDTO> {
  try {
    const curriculo = await updateCurriculo(id, data);
    if (!curriculo) throw new ServiceError('Currículo não encontrado', 404);
    return toCurriculoResponseDTO(curriculo);
  } catch (error) {
    if ((error as any).code === 'P2025') {
      throw new ServiceError('Currículo não encontrado', 404);
    }
    throw new ServiceError('Erro ao atualizar currículo', 500);
  }
}

export async function deleteCurriculoService(id: number): Promise<void> {
  try {
    const deleted = await deleteCurriculo(id);
    if (!deleted) throw new ServiceError('Currículo não encontrado', 404);
  } catch (error) {
    if ((error as any).code === 'P2025') {
      throw new ServiceError('Currículo não encontrado', 404);
    }
    throw new ServiceError('Erro ao deletar currículo', 500);
  }
} 