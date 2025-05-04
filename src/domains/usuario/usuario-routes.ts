import { FastifyInstance } from 'fastify';
import { createUser, getAllUsers } from './usuario-controller';

export default async function usuarioRotas(fastify: FastifyInstance) {
  fastify.post('/criarUsuario', createUser);
  fastify.get('/', getAllUsers);
}
