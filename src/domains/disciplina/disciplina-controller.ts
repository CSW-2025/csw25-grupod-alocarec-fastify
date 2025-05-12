import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateDisciplinaInput, UpdateDisciplinaInput } from './disciplina-entity';
import * as disciplinaService from './disciplina-service';

export async function createDisciplina(
  request: FastifyRequest<{ Body: CreateDisciplinaInput }>,
  reply: FastifyReply
) {
  try {
    const disciplina = await disciplinaService.createDisciplinaService(request.body);
    return reply.code(201).send(disciplina);
  } catch (error) {
    reply.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Ocorreu um erro inesperado ao criar a disciplina.'
    });
  }
}

export async function getAllDisciplinas(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const disciplinas = await disciplinaService.getAllDisciplinasService();
    return reply.send(disciplinas);
  } catch (error) {
    reply.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Ocorreu um erro inesperado ao listar as disciplinas.'
    });
  }
}

export async function getDisciplinaById(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const disciplina = await disciplinaService.getDisciplinaByIdService(Number(request.params.id));
    return disciplina ? reply.send(disciplina) : reply.code(404).send({ message: 'Disciplina não encontrada' });
  } catch (error) {
    reply.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Ocorreu um erro inesperado ao buscar a disciplina.'
    });
  }
}

export async function updateDisciplina(
  request: FastifyRequest<{ Params: { id: string }, Body: UpdateDisciplinaInput }>,
  reply: FastifyReply
) {
  try {
    const disciplina = await disciplinaService.updateDisciplinaService(Number(request.params.id), request.body);
    return reply.send(disciplina);
  } catch (error) {
    reply.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Ocorreu um erro inesperado ao atualizar a disciplina.'
    });
  }
}

export async function deleteDisciplina(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    await disciplinaService.deleteDisciplinaService(Number(request.params.id));
    return reply.code(204).send();
  } catch (error) {
    reply.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Ocorreu um erro inesperado ao deletar a disciplina.'
    });
  }
}
