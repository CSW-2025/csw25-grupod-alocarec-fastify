import { Turma, CreateTurmaInput, UpdateTurmaInput } from './turma-entity';
import { createTurma, getAllTurmas, getTurmaById, updateTurma, deleteTurma } from './turma-repository';

export async function createTurmaService(data: CreateTurmaInput): Promise<Turma> {
    return createTurma(data);
}

export async function getAllTurmasService(): Promise<Turma[]> {
    return getAllTurmas();
}

export async function getTurmaByIdService(id: number): Promise<Turma | null> {
    return getTurmaById(id);
}

export async function updateTurmaService(id: number, data: UpdateTurmaInput): Promise<Turma | null> {
    return updateTurma(id, data);
}

export async function deleteTurmaService(id: number): Promise<boolean> {
    return deleteTurma(id);
} 