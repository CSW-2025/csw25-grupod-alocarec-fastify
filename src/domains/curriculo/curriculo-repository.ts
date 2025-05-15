import { prisma } from '../../config/database';
import { Curriculo, CreateCurriculoInput, UpdateCurriculoInput } from './curriculo-entity';

export async function createCurriculo(data: CreateCurriculoInput) {
    return prisma.curriculo.create({ data });
}

export async function getAllCurriculos() {
    return prisma.curriculo.findMany();
}

export function getCurriculoById(id: number) {
    return prisma.curriculo.findUnique({
        where: { id },
    });
}

export async function updateCurriculo(id: number, data: UpdateCurriculoInput) {
    return prisma.curriculo.update({
        where: { id },
        data,
    });
}

export async function deleteCurriculo(id: number) {
    return prisma.curriculo.delete({
        where: { id },
    });
} 