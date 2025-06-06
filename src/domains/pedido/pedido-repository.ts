import { prisma } from '../../config/database';
import { CreatePedidoInput, UpdatePedidoInput } from './pedido-entity';

function toPrismaStatus(status: string): string {
  return status;
}

export function create(data: CreatePedidoInput) {
  return prisma.pedido.create({
    data: {
      nome: (data as any).nome,
      status: toPrismaStatus((data as any).status) as any,
      moderador_id: (data as any).moderador_id,
      sala_id: (data as any).sala_id,
      recurso_id: (data as any).recurso_id,
      aula_id: (data as any).aula_id,
      disciplina_id: (data as any).disciplina_id,
    }
  });
}

export function findAll() {
  return prisma.pedido.findMany();
}

export function findById(id: number) {
  return prisma.pedido.findUnique({ where: { id } });
}

export function update(id: number, data: UpdatePedidoInput) {
  return prisma.pedido.update({
    where: { id },
    data: {
      ...data,
      status: data.status ? toPrismaStatus(data.status) as any : undefined,
    },
  });
}

export async function remove(id: number): Promise<boolean> {
  try {
    await prisma.pedido.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}
