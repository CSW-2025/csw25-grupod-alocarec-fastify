import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateDisciplinaInput, UpdateDisciplinaInput } from './disciplina-entity';
import * as disciplinaService from './disciplina-service';

export async function createDisciplina(
  request: FastifyRequest<{ Body: CreateDisciplinaInput }>,
  reply: FastifyReply
) {
  const disciplina = await disciplinaService.createDisciplina(request.body);
  return reply.code(201).send(disciplina);
}

export async function getAllDisciplinas(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const disciplinas = await disciplinaService.getAllDisciplinas();
  return reply.send(disciplinas);
}

export async function getDisciplinaById(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const disciplina = await disciplinaService.getDisciplinaById(Number(request.params.id));
  return disciplina ? reply.send(disciplina) : reply.code(404).send({ message: 'Disciplina não encontrada' });
}

export async function updateDisciplina(
  request: FastifyRequest<{ Params: { id: string }, Body: UpdateDisciplinaInput }>,
  reply: FastifyReply
) {
  const disciplina = await disciplinaService.updateDisciplina(Number(request.params.id), request.body);
  return reply.send(disciplina);
}

export async function deleteDisciplina(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  await disciplinaService.deleteDisciplina(Number(request.params.id));
  return reply.code(204).send();
}
