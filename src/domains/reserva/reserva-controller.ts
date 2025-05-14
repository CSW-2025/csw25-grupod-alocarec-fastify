import { FastifyReply, FastifyRequest } from 'fastify';
import { createReservaService, getAllReservasService, getReservaByIdService, updateReservaService, deleteReservaService } from './reserva-service';
import { CreateReservaInput, UpdateReservaInput } from './reserva-entity';

export async function createReservaController(req: FastifyRequest<{ Body: CreateReservaInput }>, res: FastifyReply) {
  const reserva = await createReservaService(req.body);
  res.status(201).send(reserva);
}

export async function getAllReservasController(req: FastifyRequest, res: FastifyReply) {
  const reservas = await getAllReservasService();
  res.send(reservas);
}

export async function getReservaByIdController(req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply) {
  const reserva = await getReservaByIdService(req.params.id);
  res.send(reserva);
}

export async function updateReservaController(req: FastifyRequest<{ Params: { id: number }, Body: UpdateReservaInput }>, res: FastifyReply) {
  const reserva = await updateReservaService(req.params.id, req.body);
  res.send(reserva);
}

export async function deleteReservaController(req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply) {
  await deleteReservaService(req.params.id);
  res.status(204).send();
}

export {
  createReservaController as createReserva,
  getAllReservasController as getAllReservas,
  getReservaByIdController as getReservaById,
  updateReservaController as updateReserva,
  deleteReservaController as deleteReserva
}; 