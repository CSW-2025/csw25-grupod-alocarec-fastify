import { prisma } from '../../config/database';
import { Reserva, CreateReservaInput, UpdateReservaInput } from './reserva-entity';

function toReserva(reserva: any): Reserva {
  return {
    ...reserva,
    dataHora: reserva.dataHora instanceof Date ? reserva.dataHora.toISOString() : reserva.dataHora,
  };
}

export async function createReserva(data: CreateReservaInput): Promise<Reserva> {
  const reserva = await prisma.reserva.create({
    data,
    include: { sala: true, usuario: true }
  });
  return toReserva(reserva);
}

export async function findAllReservas(): Promise<Reserva[]> {
  const reservas = await prisma.reserva.findMany({
    include: { sala: true, usuario: true }
  });
  return reservas.map(toReserva);
}

export async function findReservaById(id: number): Promise<Reserva | null> {
  const reserva = await prisma.reserva.findUnique({
    where: { id: Number(id) },
    include: { sala: true, usuario: true }
  });
  return reserva ? toReserva(reserva) : null;
}

export async function findReservaBySalaAndDataHora(
  salaId: number,
  dataHora: string
): Promise<Reserva | null> {
  const reserva = await prisma.reserva.findFirst({
    where: { salaId: Number(salaId), dataHora: new Date(dataHora) },
    include: { sala: true, usuario: true }
  });
  return reserva ? toReserva(reserva) : null;
}

export async function updateReserva(id: number, data: UpdateReservaInput): Promise<Reserva> {
  const reserva = await prisma.reserva.update({
    where: { id: Number(id) },
    data,
    include: { sala: true, usuario: true }
  });
  return toReserva(reserva);
}

export function deleteReserva(id: number): Promise<boolean> {
  return prisma.reserva.delete({ where: { id: Number(id) } })
    .then(() => true)
    .catch(() => false);
} 