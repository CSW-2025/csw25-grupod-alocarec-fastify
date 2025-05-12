import { prisma } from '../../config/database';
import { Turma, CreateTurmaInput, UpdateTurmaInput } from './turma-entity';

export async function createTurma(data: CreateTurmaInput): Promise<Turma> {
    return prisma.turma.create({ data }) as Promise<Turma>;
}

export async function getAllTurmas(): Promise<Turma[]> {
    return prisma.turma.findMany() as Promise<Turma[]>;
}

export async function getTurmaById(id: number): Promise<Turma | null> {
    return prisma.turma.findUnique({
        where: { id }
    }) as Promise<Turma | null>;
}

export async function updateTurma(id: number, data: UpdateTurmaInput): Promise<Turma | null> {
    return prisma.turma.update({
        where: { id },
        data
    }) as Promise<Turma | null>;
}

export async function deleteTurma(id: number): Promise<boolean> {
    return prisma.turma.delete({
        where: { id }
    }).then(() => true).catch(() => false);
} 