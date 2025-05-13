import { FastifyReply, FastifyRequest } from 'fastify';
import * as salaService from './sala-service';
import { CreateSalaInput, UpdateSalaInput } from './sala-entity';

export async function createSala(req: FastifyRequest, res: FastifyReply) {
  try {
    const { nome, capacidade, predioId } = req.body as CreateSalaInput;
    const sala = await salaService.createSala({ nome, capacidade, predioId });
    res.status(201).send(sala);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Ocorreu um erro inesperado ao criar a sala.'
    });
  }
}

export async function getAllSalas(req: FastifyRequest, res: FastifyReply) {
  try {
    const salas = await salaService.getAllSalas();
    res.send(salas);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Ocorreu um erro inesperado ao listar as salas.'
    });
  }
}

export async function getSalaById(req: FastifyRequest, res: FastifyReply) {
  try {
    const { id } = req.params as { id: string };
    const sala = await salaService.getSalaById(Number(id));
    if (!sala) {
      res.status(404).send({ message: 'Sala não encontrada' });
      return;
    }
    res.send(sala);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Ocorreu um erro inesperado ao buscar a sala.'
    });
  }
}

export async function updateSala(req: FastifyRequest, res: FastifyReply) {
  try {
    const { id } = req.params as { id: string };
    const updateData = req.body as UpdateSalaInput;
    const sala = await salaService.updateSala(Number(id), updateData);
    if (!sala) {
      res.status(404).send({ message: 'Sala não encontrada' });
      return;
    }
    res.send(sala);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Ocorreu um erro inesperado ao atualizar a sala.'
    });
  }
}

export async function deleteSala(req: FastifyRequest, res: FastifyReply) {
  try {
    const { id } = req.params as { id: string };
    const success = await salaService.deleteSala(Number(id));
    if (!success) {
      res.status(404).send({ message: 'Sala não encontrada' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Ocorreu um erro inesperado ao deletar a sala.'
    });
  }
} 