import { Curriculo, CreateCurriculoInput, UpdateCurriculoInput } from './curriculo-entity';
import { createCurriculo, getAllCurriculos, getCurriculoById, updateCurriculo, deleteCurriculo } from './curriculo-repository';

function toCurriculo(curriculo: any): Curriculo {
  return {
    ...curriculo,
    createdAt: curriculo.createdAt ? curriculo.createdAt.toISOString() : '',
    updatedAt: curriculo.updatedAt ? curriculo.updatedAt.toISOString() : '',
  };
}

export async function createCurriculoService(data: CreateCurriculoInput): Promise<Curriculo> {
  const curriculo = await createCurriculo(data);
  return toCurriculo(curriculo);
}

export async function getAllCurriculosService(): Promise<Curriculo[]> {
  const curriculos = await getAllCurriculos();
  return curriculos.map(toCurriculo);
}

export async function getCurriculoByIdService(id: number): Promise<Curriculo | null> {
  const curriculo = await getCurriculoById(id);
  return curriculo ? toCurriculo(curriculo) : null;
}

export async function updateCurriculoService(id: number, data: UpdateCurriculoInput): Promise<Curriculo | null> {
  const curriculo = await updateCurriculo(id, data);
  return curriculo ? toCurriculo(curriculo) : null;
}

export async function deleteCurriculoService(id: number): Promise<boolean> {
  const deleted = await deleteCurriculo(id);
  return !!deleted;
} 