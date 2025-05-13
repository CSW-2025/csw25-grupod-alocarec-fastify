import { CreateReservaInput, UpdateReservaInput } from './reserva-entity';

let reservas = [] as any[];
let idCounter = 1;

export async function createReserva(data: CreateReservaInput) {
  const novaReserva = {  ...data, id: idCounter++, };
  reservas.push(novaReserva);
  return novaReserva;
}

export async function getAllReservas() {
  return reservas;
}

export async function getReservaById(id: number) {
  return reservas.find((reserva) => reserva.id === id);
}

export async function updateReserva(id: number, data: UpdateReservaInput) {
  const index = reservas.findIndex((reserva) => reserva.id === id);
  if (index === -1) return null;
  reservas[index] = { ...reservas[index], ...data };
  return reservas[index];
}

export async function deleteReserva(id: number) {
  reservas = reservas.filter((reserva) => reserva.id !== id);
}
