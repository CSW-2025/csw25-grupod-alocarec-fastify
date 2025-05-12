import { FastifyInstance } from 'fastify';
import {
  createAula,
  getAllAulas,
  getAulaById,
  updateAula,
  deleteAula,
} from './aula-controller';

export default async function aulaRoutes(fastify: FastifyInstance) {
  fastify.post('/aulas', createAula);
  fastify.get('/aulas', getAllAulas);
  fastify.get('/aulas/:id', getAulaById);
  fastify.put('/aulas/:id', updateAula);
  fastify.delete('/aulas/:id', deleteAula);
}
