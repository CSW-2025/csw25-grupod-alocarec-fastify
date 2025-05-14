import * as reservaRepository from './reserva-repository';
import { Reserva, CreateReservaInput, UpdateReservaInput } from './reserva-entity';
import { toReservaResponseDTO } from './dto/ReservaMapper';
import { ReservaResponseDTO } from './dto/ReservaResponseDTO';

class ServiceError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = 'ServiceError';
    this.statusCode = statusCode;
  }
}

export async function createReservaService(data: CreateReservaInput): Promise<ReservaResponseDTO> {
  try {
    const reserva = await reservaRepository.createReserva(data);
    return toReservaResponseDTO(reserva);
  } catch (error) {
    throw new ServiceError('Erro ao criar reserva', 500);
  }
}

export async function getAllReservasService(): Promise<ReservaResponseDTO[]> {
  try {
    const reservas = await reservaRepository.findAllReservas();
    return reservas.map(toReservaResponseDTO);
  } catch (error) {
    throw new ServiceError('Erro ao listar reservas', 500);
  }
}

export async function getReservaByIdService(id: number): Promise<ReservaResponseDTO> {
  try {
    const reserva = await reservaRepository.findReservaById(id);
    if (!reserva) throw new ServiceError('Reserva não encontrada', 404);
    return toReservaResponseDTO(reserva);
  } catch (error) {
    if (error instanceof ServiceError) throw error;
    throw new ServiceError('Erro ao buscar reserva', 500);
  }
}

export async function updateReservaService(id: number, data: UpdateReservaInput): Promise<ReservaResponseDTO> {
  try {
    const reserva = await reservaRepository.updateReserva(id, data);
    if (!reserva) throw new ServiceError('Reserva não encontrada', 404);
    return toReservaResponseDTO(reserva);
  } catch (error) {
    if ((error as any).code === 'P2025') {
      throw new ServiceError('Reserva não encontrada', 404);
    }
    throw new ServiceError('Erro ao atualizar reserva', 500);
  }
}

export async function deleteReservaService(id: number): Promise<void> {
  try {
    const deleted = await reservaRepository.deleteReserva(id);
    if (!deleted) throw new ServiceError('Reserva não encontrada', 404);
  } catch (error) {
    if ((error as any).code === 'P2025') {
      throw new ServiceError('Reserva não encontrada', 404);
    }
    throw new ServiceError('Erro ao deletar reserva', 500);
  }
} 