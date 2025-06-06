import { FastifyInstance } from 'fastify';
import {
  createPredioController,
  getAllPrediosController,
  getPredioByIdController,
  updatePredioController,
  deletePredioController,
} from './predio-controller';
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

export default async function predioRoutes(app: FastifyInstance) {
  app.addHook('preHandler', verifyJwt);

  app.post('/', { preHandler: verificarAdmin, schema: { tags: ['predios'] } }, createPredioController);
  app.put('/:id', { preHandler: verificarAdmin, schema: { tags: ['predios'] } }, updatePredioController);
  app.delete('/:id', { preHandler: verificarAdmin, schema: { tags: ['predios'] } }, deletePredioController);
  app.get('/', { schema: { tags: ['predios'] } }, getAllPrediosController);
  app.get('/:id', { schema: { tags: ['predios'] } }, getPredioByIdController);
}
