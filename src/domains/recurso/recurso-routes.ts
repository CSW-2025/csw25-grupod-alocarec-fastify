import { FastifyInstance } from 'fastify';
import {
  createRecursoController,
  getAllRecursosController,
  getRecursoByIdController,
  updateRecursoController,
  deleteRecursoController,
} from './recurso-controller';

declare module 'fastify' {
  interface FastifyRequest {
    user?: any;
  }
}

function verificarAdmin(request: any, reply: any, done: any) {
  const user = request.user;
  if (!user || !user.perfil || user.perfil.nome !== 'Admin') {
    reply.code(403).send({ message: 'Acesso restrito a administradores.' });
    return;
  }
  done();
}

export default async function recursoRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request, reply) => {
    if (request.headers.authorization) {
      try {
        const token = request.headers.authorization.replace('Bearer ', '');
        const decoded = require('jsonwebtoken').verify(token, require('../../config/jwt').JWT_SECRET);
        request.user = decoded;
      } catch (err) {
        reply.code(401).send({ message: 'Token inválido.' });
      }
    }
  });

  app.post('/', { preHandler: verificarAdmin, schema: { tags: ['recursos'] } }, createRecursoController);
  app.put('/:id', { preHandler: verificarAdmin, schema: { tags: ['recursos'] } }, updateRecursoController);
  app.delete('/:id', { preHandler: verificarAdmin, schema: { tags: ['recursos'] } }, deleteRecursoController);
  app.get('/', { schema: { tags: ['recursos'] } }, getAllRecursosController);
  app.get('/:id', { schema: { tags: ['recursos'] } }, getRecursoByIdController);
}
