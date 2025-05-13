import { PrismaClient, Aula as PrismaAula } from '@prisma/client';

const prisma = new PrismaClient();

export class AulaRepository {
  async create(data: Omit<PrismaAula, 'id'>): Promise<PrismaAula> {
    return prisma.aula.create({ data });
  }

  async findAll(): Promise<PrismaAula[]> {
    return prisma.aula.findMany();
  }

  async findById(id: number): Promise<PrismaAula | null> {
    return prisma.aula.findUnique({ where: { id } });
  }

  async update(id: number, data: Partial<Omit<PrismaAula, 'id'>>): Promise<PrismaAula> {
    return prisma.aula.update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
    await prisma.aula.delete({ where: { id } });
  }
}
