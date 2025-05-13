import {
  createPredio,
  getAllPredios,
  getPredioById,
  updatePredio,
  deletePredio,
} from './predio-repository';
import { CreatePredioInput, UpdatePredioInput } from './predio-entity';

export async function createPredioService(data: CreatePredioInput) {
  return await createPredio(data);
}

export async function getAllPrediosService() {
  return await getAllPredios();
}

export async function getPredioByIdService(id: number) {
  return await getPredioById(id);
}

export async function updatePredioService(id: number, data: UpdatePredioInput) {
  return await updatePredio(id, data);
}

export async function deletePredioService(id: number) {
  return await deletePredio(id);
}
