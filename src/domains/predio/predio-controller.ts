import { FastifyRequest, FastifyReply } from 'fastify';
import { CreatePredioInput, UpdatePredioInput } from './predio-entity';
import {
  createPredio,
  getAllPredios,
  getPredioById,
  updatePredio,
  deletePredio,
} from './predio-repository';

export async function createPredioController(
  request: FastifyRequest<{ Body: CreatePredioInput }>,
  reply: FastifyReply
) {
  const predio = await createPredio(request.body);
  return reply.code(201).send(predio);
}

export async function getAllPrediosController(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  const predios = await getAllPredios();
  return reply.send(predios);
}

export async function getPredioByIdController(
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) {
  const predio = await getPredioById(request.params.id);
  if (!predio) {
    return reply.code(404).send({ message: 'Prédio não encontrado' });
  }
  return reply.send(predio);
}

export async function updatePredioController(
  request: FastifyRequest<{ Params: { id: number }; Body: UpdatePredioInput }>,
  reply: FastifyReply
) {
  const predio = await updatePredio(request.params.id, request.body);
  if (!predio) {
    return reply.code(404).send({ message: 'Prédio não encontrado' });
  }
  return reply.send(predio);
}

export async function deletePredioController(
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) {
  const success = await deletePredio(request.params.id);
  if (!success) {
    return reply.code(404).send({ message: 'Prédio não encontrado' });
  }
  return reply.code(204).send();
}
