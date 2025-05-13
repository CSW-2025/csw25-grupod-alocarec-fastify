import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateReservaInput, UpdateReservaInput } from './reserva-entity';
import * as reservaService from './reserva-service';

export async function createReserva(
  request: FastifyRequest<{ Body: CreateReservaInput }>,
  reply: FastifyReply
) {
  try {
    const reserva = await reservaService.createReserva(request.body);
    return reply.code(201).send(reserva);
  } catch (error) {
    reply.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Ocorreu um erro inesperado ao criar a reserva.'
    });
  }
}

export async function getAllReservas(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const reservas = await reservaService.getAllReservas();
    return reply.send(reservas);
  } catch (error) {
    reply.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Ocorreu um erro inesperado ao listar as reservas.'
    });
  }
}

export async function getReservaById(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const reserva = await reservaService.getReservaById(Number(request.params.id));
    return reserva ? reply.send(reserva) : reply.code(404).send({ message: 'Reserva não encontrada' });
  } catch (error) {
    reply.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Ocorreu um erro inesperado ao buscar a reserva.'
    });
  }
}

export async function updateReserva(
  request: FastifyRequest<{ Params: { id: string }, Body: UpdateReservaInput }>,
  reply: FastifyReply
) {
  try {
    const reserva = await reservaService.updateReserva(Number(request.params.id), request.body);
    return reply.send(reserva);
  } catch (error) {
    reply.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Ocorreu um erro inesperado ao atualizar a reserva.'
    });
  }
}

export async function deleteReserva(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    await reservaService.deleteReserva(Number(request.params.id));
    return reply.code(204).send();
  } catch (error) {
    reply.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Ocorreu um erro inesperado ao deletar a reserva.'
    });
  }
}
