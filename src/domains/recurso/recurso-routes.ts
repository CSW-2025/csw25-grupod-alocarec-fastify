import { FastifyInstance } from 'fastify';
import {
  createRecursoController,
  getAllRecursosController,
  getRecursoByIdController,
  updateRecursoController,
  deleteRecursoController,
} from './recurso-controller';
import { verifyJwt } from '../../config/auth';

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
  app.addHook('preHandler', verifyJwt);

  app.post('/', { preHandler: verificarAdmin, schema: { tags: ['recursos'] } }, createRecursoController);
  app.put('/:id', { preHandler: verificarAdmin, schema: { tags: ['recursos'] } }, updateRecursoController);
  app.delete('/:id', { preHandler: verificarAdmin, schema: { tags: ['recursos'] } }, deleteRecursoController);
  app.get('/', { schema: { tags: ['recursos'] } }, getAllRecursosController);
  app.get('/:id', { schema: { tags: ['recursos'] } }, getRecursoByIdController);
}
