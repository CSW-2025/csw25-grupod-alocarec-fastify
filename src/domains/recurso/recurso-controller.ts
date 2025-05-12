import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateRecursoInput, UpdateRecursoInput } from './recurso-entity';
import {
  createRecursoService,
  getAllRecursosService,
  getRecursoByIdService,
  updateRecursoService,
  deleteRecursoService,
} from './recurso-service';

export async function createRecursoController(
  request: FastifyRequest<{ Body: CreateRecursoInput }>,
  reply: FastifyReply
) {
  const recurso = await createRecursoService(request.body);
  return reply.code(201).send(recurso);
}

export async function getAllRecursosController(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  const recursos = await getAllRecursosService();
  return reply.send(recursos);
}

export async function getRecursoByIdController(
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) {
  const recurso = await getRecursoByIdService(request.params.id);
  if (!recurso) {
    return reply.code(404).send({ message: 'Recurso não encontrado' });
  }
  return reply.send(recurso);
}

export async function updateRecursoController(
  request: FastifyRequest<{ Params: { id: number }; Body: UpdateRecursoInput }>,
  reply: FastifyReply
) {
  const recurso = await updateRecursoService(request.params.id, request.body);
  if (!recurso) {
    return reply.code(404).send({ message: 'Recurso não encontrado' });
  }
  return reply.send(recurso);
}

export async function deleteRecursoController(
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) {
  const success = await deleteRecursoService(request.params.id);
  if (!success) {
    return reply.code(404).send({ message: 'Recurso não encontrado' });
  }
  return reply.code(204).send();
}
