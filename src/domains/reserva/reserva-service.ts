import * as reservaRepository from './reserva-repository';
import { Reserva, CreateReservaInput, UpdateReservaInput } from './reserva-entity';

export function createReserva(data: CreateReservaInput) {
  return reservaRepository.createReserva(data);
}

export function getAllReservas(): Promise<Reserva[]> {
  return reservaRepository.findAllReservas();
}

export function getReservaById(id: number): Promise<Reserva | null> {
  return reservaRepository.findReservaById(id);
}

export function updateReserva(id: number, data: UpdateReservaInput): Promise<Reserva> {
  return reservaRepository.updateReserva(id, data);
}

export function deleteReserva(id: number): Promise<boolean> {
  return reservaRepository.deleteReserva(id);
} 