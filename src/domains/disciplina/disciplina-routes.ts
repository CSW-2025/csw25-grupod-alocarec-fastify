import { FastifyInstance } from 'fastify';
import {
  createDisciplina,
  getAllDisciplinas,
  getDisciplinaById,
  updateDisciplina,
  deleteDisciplina,
} from './disciplina-controller';

export default async function disciplinaRoutes(fastify: FastifyInstance) {
  fastify.post('/', createDisciplina);
  fastify.get('/', getAllDisciplinas);
  fastify.get('/:id', getDisciplinaById);
  fastify.put('/:id', updateDisciplina);
  fastify.delete('/:id', deleteDisciplina);
}
