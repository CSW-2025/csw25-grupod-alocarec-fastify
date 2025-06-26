import {
  createPredio,
  getAllPredios,
  getPredioById,
  updatePredio,
  deletePredio,
} from './predio-repository';
import { CreatePredioInput, UpdatePredioInput } from './predio-entity';
import { toPredioResponseDTO } from './dto/PredioMapper';
import { PredioResponseDTO } from './dto/PredioResponseDTO';

class ServiceError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = 'ServiceError';
    this.statusCode = statusCode;
  }
}

export async function createPredioService(data: CreatePredioInput): Promise<PredioResponseDTO> {
  try {
    const predio = await createPredio(data);
    return toPredioResponseDTO(predio);
  } catch (error) {
    throw new ServiceError('Erro ao criar prédio', 500);
  }
}

export async function getAllPrediosService(): Promise<PredioResponseDTO[]> {
  try {
    const predios = await getAllPredios();
    return predios.map(toPredioResponseDTO);
  } catch (error) {
    throw new ServiceError('Erro ao listar prédios', 500);
  }
}

export async function getPredioByIdService(id: number): Promise<PredioResponseDTO> {
  try {
    const predio = await getPredioById(id);
    if (!predio) throw new ServiceError('Prédio não encontrado', 404);
    return toPredioResponseDTO(predio);
  } catch (error) {
    if (error instanceof ServiceError) throw error;
    throw new ServiceError('Erro ao buscar prédio', 500);
  }
}

export async function updatePredioService(id: number, data: UpdatePredioInput): Promise<PredioResponseDTO> {
  try {
    const predio = await updatePredio(id, data);
    if (!predio) throw new ServiceError('Prédio não encontrado', 404);
    return toPredioResponseDTO(predio);
  } catch (error) {
    if ((error as any).code === 'P2025') {
      throw new ServiceError('Prédio não encontrado', 404);
    }
    throw new ServiceError('Erro ao atualizar prédio', 500);
  }
}

export async function deletePredioService(id: number): Promise<void> {
  try {
    const deleted = await deletePredio(id);
    if (!deleted) throw new ServiceError('Prédio não encontrado', 404);
  } catch (error) {
    console.error('Erro no deletePredioService:', error);
    
    // Se for erro de chave estrangeira (P2003)
    if ((error as any).code === 'P2003') {
      throw new ServiceError('Não é possível excluir este prédio pois ele possui salas associadas.', 400);
    }
    
    // Se for erro de registro não encontrado (P2025)
    if ((error as any).code === 'P2025') {
      throw new ServiceError('Prédio não encontrado', 404);
    }
    
    // Se for erro personalizado do repository
    if (error instanceof Error) {
      throw new ServiceError(error.message, 400);
    }
    
    throw new ServiceError('Erro ao deletar prédio', 500);
  }
}
