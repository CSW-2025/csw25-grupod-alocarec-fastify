import { prisma } from '../../config/database';
import { Horario, CreateHorarioInput, UpdateHorarioInput } from './horario-entity';

export async function createHorario(data: CreateHorarioInput): Promise<Horario> {
    return prisma.horario.create({ data }) as Promise<Horario>;
}

export async function getAllHorarios(): Promise<Horario[]> {
    return prisma.horario.findMany() as Promise<Horario[]>;
}

export async function getHorarioById(id: number): Promise<Horario | null> {
    return prisma.horario.findUnique({
        where: { id }
    }) as Promise<Horario | null>;
}

export async function updateHorario(id: number, data: UpdateHorarioInput): Promise<Horario | null> {
    return prisma.horario.update({
        where: { id },
        data
    }) as Promise<Horario | null>;
}

export async function deleteHorario(id: number): Promise<boolean> {
    return prisma.horario.delete({
        where: { id }
    }).then(() => true).catch(() => false);
} 