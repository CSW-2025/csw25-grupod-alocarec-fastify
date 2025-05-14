import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateAulaInput, UpdateAulaInput } from './aula-entity';
import * as aulaService from './aula-service';

export async function createAula(
  request: FastifyRequest<{ Body: CreateAulaInput }>,
  reply: FastifyReply
) {
  const aula = await aulaService.createAula(request.body);
  return reply.code(201).send(aula);
}

export async function getAllAulas(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const aulas = await aulaService.getAllAulas();
  return reply.send(aulas);
}

export async function getAulaById(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const aula = await aulaService.getAulaById(Number(request.params.id));
  return reply.send(aula);
}

export async function updateAula(
  request: FastifyRequest<{ Params: { id: string }, Body: UpdateAulaInput }>,
  reply: FastifyReply
) {
  const aula = await aulaService.updateAula(Number(request.params.id), request.body);
  return reply.send(aula);
}

export async function deleteAula(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  await aulaService.deleteAula(Number(request.params.id));
  return reply.code(204).send();
}
