import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

// Criar uma nova sala
export async function createSala(data: { nome: string, capacidade: number, andar: string, recurso?: string }) {
  try {
    const sala = await prisma.sala.create({
      data: {
        nome: data.nome,
        capacidade: data.capacidade,
        andar: data.andar,
        recurso: data.recurso,
      },
    });
    return sala;
  } catch (error) {
    throw new Error('Erro ao criar a sala: ' + getErrorMessage(error));
  }
}

// Obter todas as salas
export async function getAllSalas() {
  try {
    return await prisma.sala.findMany();
  } catch (error) {
    throw new Error('Erro ao listar as salas: ' + getErrorMessage(error));
  }
}

// Obter uma sala pelo ID
export async function getSalaById(id: number) {
  try {
    return await prisma.sala.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    throw new Error('Erro ao buscar a sala: ' + getErrorMessage(error));
  }
}

// Atualizar os dados de uma sala
export async function updateSala(id: number, data: { nome?: string, capacidade?: number, andar?: string, recurso?: string }) {
  try {
    const sala = await prisma.sala.update({
      where: {
        id,
      },
      data: {
        nome: data.nome,
        capacidade: data.capacidade,
        andar: data.andar,
        recurso: data.recurso,
      },
    });
    return sala;
  } catch (error) {
    throw new Error('Erro ao atualizar a sala: ' + getErrorMessage(error));
  }
}

// Deletar uma sala
export async function deleteSala(id: number) {
  try {
    await prisma.sala.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    throw new Error('Erro ao deletar a sala: ' + getErrorMessage(error));
  }
}
