import { FastifyInstance } from 'fastify';
import { createSala, getAllSalas } from './salas-controller';

export default async function salaRoutes(fastify: FastifyInstance) {
  fastify.post('/', createSala);
  fastify.get('/', getAllSalas);
}
