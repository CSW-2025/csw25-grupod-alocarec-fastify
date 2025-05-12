import { prisma } from '../../config/database';
import { Curriculo, CreateCurriculoInput, UpdateCurriculoInput } from './curriculo-entity';

export async function createCurriculo(data: CreateCurriculoInput): Promise<Curriculo> {
    return prisma.curriculo.create({ data }) as Promise<Curriculo>;
}

export async function getAllCurriculos(): Promise<Curriculo[]> {
    return prisma.curriculo.findMany();
}

export async function getCurriculoById(id: number): Promise<Curriculo | null> {
    return prisma.curriculo.findUnique({
        where: { id },
    });
}

export async function updateCurriculo(id: number, data: UpdateCurriculoInput): Promise<Curriculo | null> {
    return prisma.curriculo.update({
        where: { id },
        data,
    });
}

export async function deleteCurriculo(id: number): Promise<Curriculo | null> {
    return prisma.curriculo.delete({
        where: { id },
    });
} 