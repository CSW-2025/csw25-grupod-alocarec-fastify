    import {
  createRecurso,
  getAllRecursos,
  getRecursoById,
  updateRecurso,
  deleteRecurso,
} from './recurso-repository';
import { CreateRecursoInput, UpdateRecursoInput } from './recurso-entity';

export async function createRecursoService(data: CreateRecursoInput) {
  return await createRecurso(data);
}

export async function getAllRecursosService() {
  return await getAllRecursos();
}

export async function getRecursoByIdService(id: number) {
  return await getRecursoById(id);
}

export async function updateRecursoService(id: number, data: UpdateRecursoInput) {
  return await updateRecurso(id, data);
}

export async function deleteRecursoService(id: number) {
  return await deleteRecurso(id);
}
