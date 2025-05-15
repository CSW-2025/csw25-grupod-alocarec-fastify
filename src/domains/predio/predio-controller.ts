import { FastifyRequest, FastifyReply } from 'fastify';
import { CreatePredioInput, UpdatePredioInput } from './predio-entity';
import { createPredioService, getAllPrediosService, getPredioByIdService, updatePredioService, deletePredioService } from './predio-service';

export async function createPredioController(
  request: FastifyRequest<{ Body: CreatePredioInput }>,
  reply: FastifyReply
) {
  const predio = await createPredioService(request.body);
  return reply.code(201).send(predio);
}

export async function getAllPrediosController(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  const predios = await getAllPrediosService();
  return reply.send(predios);
}

export async function getPredioByIdController(
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) {
  const predio = await getPredioByIdService(request.params.id);
  return reply.send(predio);
}

export async function updatePredioController(
  request: FastifyRequest<{ Params: { id: number }; Body: UpdatePredioInput }>,
  reply: FastifyReply
) {
  const predio = await updatePredioService(request.params.id, request.body);
  return reply.send(predio);
}

export async function deletePredioController(
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) {
  await deletePredioService(request.params.id);
  return reply.code(204).send();
}

export {
  createPredioController as createPredio,
  getAllPrediosController as getAllPredios,
  getPredioByIdController as getPredioById,
  updatePredioController as updatePredio,
  deletePredioController as deletePredio
};
