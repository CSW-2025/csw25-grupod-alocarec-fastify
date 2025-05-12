import { Curriculo, CreateCurriculoInput, UpdateCurriculoInput } from './curriculo-entity';
import { createCurriculo, getAllCurriculos, getCurriculoById, updateCurriculo, deleteCurriculo } from './curriculo-repository';

export async function createCurriculoService(data: CreateCurriculoInput): Promise<Curriculo> {
    return createCurriculo(data);
}

export async function getAllCurriculosService(): Promise<Curriculo[]> {
    return getAllCurriculos();
}

export async function getCurriculoByIdService(id: number): Promise<Curriculo | null> {
    return getCurriculoById(id);
}

export async function updateCurriculoService(id: number, data: UpdateCurriculoInput): Promise<Curriculo | null> {
    return updateCurriculo(id, data);
}

export async function deleteCurriculoService(id: number): Promise<boolean> {
    const deleted = await deleteCurriculo(id);
    return !!deleted;
} 