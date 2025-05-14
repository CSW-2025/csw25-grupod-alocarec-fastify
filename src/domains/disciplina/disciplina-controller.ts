import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateDisciplinaInput, UpdateDisciplinaInput } from './disciplina-entity';
import { createDisciplinaService, getAllDisciplinasService, getDisciplinaByIdService, updateDisciplinaService, deleteDisciplinaService } from './disciplina-service';

export async function createDisciplinaController(request: FastifyRequest<{ Body: CreateDisciplinaInput }>, reply: FastifyReply) {
  const disciplina = await createDisciplinaService(request.body);
  return reply.code(201).send(disciplina);
}

export async function getAllDisciplinasController(request: FastifyRequest, reply: FastifyReply) {
  const disciplinas = await getAllDisciplinasService();
  return reply.send(disciplinas);
}

export async function getDisciplinaByIdController(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
  const disciplina = await getDisciplinaByIdService(request.params.id);
  return reply.send(disciplina);
}

export async function updateDisciplinaController(request: FastifyRequest<{ Params: { id: number }, Body: UpdateDisciplinaInput }>, reply: FastifyReply) {
  const disciplina = await updateDisciplinaService(request.params.id, request.body);
  return reply.send(disciplina);
}

export async function deleteDisciplinaController(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
  await deleteDisciplinaService(request.params.id);
  return reply.code(204).send();
}

export {
  createDisciplinaController as createDisciplina,
  getAllDisciplinasController as getAllDisciplinas,
  getDisciplinaByIdController as getDisciplinaById,
  updateDisciplinaController as updateDisciplina,
  deleteDisciplinaController as deleteDisciplina
};
