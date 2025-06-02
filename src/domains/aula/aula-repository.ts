import { PrismaClient, Aula } from '@prisma/client';

const prisma = new PrismaClient();

export class AulaRepository {
  async create(data: Omit<Aula, 'id'>): Promise<Aula> {
    return prisma.aula.create({ data });
  }

  async findAll(): Promise<Aula[]> {
    return prisma.aula.findMany();
  }

  async findById(id: number): Promise<Aula | null> {
    return prisma.aula.findUnique({ where: { id } });
  }

  async update(id: number, data: Partial<Omit<Aula, 'id'>>): Promise<Aula> {
    return prisma.aula.update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
    await prisma.aula.delete({ where: { id } });
  }
}
