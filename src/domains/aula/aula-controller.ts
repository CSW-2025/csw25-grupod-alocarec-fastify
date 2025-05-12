import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateAulaInput, UpdateAulaInput } from './aula-entity';
import * as aulaService from './aula-service';

export async function createAula(
  request: FastifyRequest<{ Body: CreateAulaInput }>,
  reply: FastifyReply
) {
  try {
    const aula = await aulaService.createAula(request.body);
    return reply.code(201).send(aula);
  } catch (error) {
    reply.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Ocorreu um erro inesperado ao criar a aula.'
    });
  }
}

export async function getAllAulas(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const aulas = await aulaService.getAllAulas();
    return reply.send(aulas);
  } catch (error) {
    reply.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Ocorreu um erro inesperado ao listar as aulas.'
    });
  }
}

export async function getAulaById(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const aula = await aulaService.getAulaById(Number(request.params.id));
    return aula ? reply.send(aula) : reply.code(404).send({ message: 'Aula não encontrada' });
  } catch (error) {
    reply.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Ocorreu um erro inesperado ao buscar a aula.'
    });
  }
}

export async function updateAula(
  request: FastifyRequest<{ Params: { id: string }, Body: UpdateAulaInput }>,
  reply: FastifyReply
) {
  try {
    const aula = await aulaService.updateAula(Number(request.params.id), request.body);
    return reply.send(aula);
  } catch (error) {
    reply.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Ocorreu um erro inesperado ao atualizar a aula.'
    });
  }
}

export async function deleteAula(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    await aulaService.deleteAula(Number(request.params.id));
    return reply.code(204).send();
  } catch (error) {
    reply.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Ocorreu um erro inesperado ao deletar a aula.'
    });
  }
}
