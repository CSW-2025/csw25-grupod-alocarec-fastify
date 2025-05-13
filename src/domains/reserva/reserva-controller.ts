import { FastifyReply, FastifyRequest } from 'fastify';
import * as reservaService from './reserva-service';
import { CreateReservaInput, UpdateReservaInput } from './reserva-entity';

export async function createReserva(req: FastifyRequest, res: FastifyReply) {
  try {
    const { salaId, usuarioId, dataHora } = req.body as CreateReservaInput;
    const reserva = await reservaService.createReserva({ salaId, usuarioId, dataHora });
    res.status(201).send(reserva);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Ocorreu um erro inesperado ao criar a reserva.'
    });
  }
}

export async function getAllReservas(req: FastifyRequest, res: FastifyReply) {
  try {
    const reservas = await reservaService.getAllReservas();
    res.send(reservas);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Ocorreu um erro inesperado ao listar as reservas.'
    });
  }
}

export async function getReservaById(req: FastifyRequest, res: FastifyReply) {
  try {
    const { id } = req.params as { id: string };
    const reserva = await reservaService.getReservaById(Number(id));
    if (!reserva) {
      res.status(404).send({ message: 'Reserva não encontrada' });
      return;
    }
    res.send(reserva);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Ocorreu um erro inesperado ao buscar a reserva.'
    });
  }
}

export async function updateReserva(req: FastifyRequest, res: FastifyReply) {
  try {
    const { id } = req.params as { id: string };
    const updateData = req.body as UpdateReservaInput;
    const reserva = await reservaService.updateReserva(Number(id), updateData);
    if (!reserva) {
      res.status(404).send({ message: 'Reserva não encontrada' });
      return;
    }
    res.send(reserva);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Ocorreu um erro inesperado ao atualizar a reserva.'
    });
  }
}

export async function deleteReserva(req: FastifyRequest, res: FastifyReply) {
  try {
    const { id } = req.params as { id: string };
    const success = await reservaService.deleteReserva(Number(id));
    if (!success) {
      res.status(404).send({ message: 'Reserva não encontrada' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Ocorreu um erro inesperado ao deletar a reserva.'
    });
  }
} 