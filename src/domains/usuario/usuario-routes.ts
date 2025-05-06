import { FastifyInstance } from 'fastify';
import { createUser, getAllUsers } from './usuario-controller';

export default async function usuarioRotas(fastify: FastifyInstance) {
  fastify.post('/', createUser);
  fastify.get('/', getAllUsers);
}
