import { FastifyInstance } from 'fastify';
import { createTipoRecursoController, getAllTipoRecursosController, getTipoRecursoByIdController, updateTipoRecursoController, deleteTipoRecursoController } from './tipo-recurso-controller';
import { verifyJwt } from '../../config/auth';

function verificarAdminOuCoordenador(request: any, reply: any, done: any) {
  const user = request.user;
  if (!user || !user.perfil || (user.perfil.nome !== 'Admin' && user.perfil.nome !== 'Coordenador')) {
    reply.code(403).send({ message: 'Acesso restrito a administradores ou coordenadores.' });
    return;
  }
  done();
}

export default async function tipoRecursoRoutes(fastify: FastifyInstance) {
  // Middleware para autenticação JWT
  fastify.addHook('preHandler', verifyJwt);
    fastify.post('/', { preHandler: verificarAdminOuCoordenador, schema: {
        tags: ['tipos de recurso'],
        summary: 'Criar um novo tipo de recurso',
    } }, createTipoRecursoController);
    fastify.get('/', {
        schema: {
            tags: ['tipos de recurso'],
            summary: 'Listar todos os tipos de recurso',
        }
    }, getAllTipoRecursosController);
    fastify.get('/:id', {
        schema: {
            tags: ['tipos de recurso'],
            summary: 'Buscar tipo de recurso por ID',
            params: {
                type: 'object',
                required: ['id'],
                properties: { id: { type: 'string' } }
            }
        }
    }, getTipoRecursoByIdController);
    fastify.put('/:id', { preHandler: verificarAdminOuCoordenador, schema: {
        tags: ['tipos de recurso'],
        summary: 'Atualizar tipo de recurso',
        params: {
            type: 'object',
            required: ['id'],
            properties: { id: { type: 'string' } }
        }
    } }, updateTipoRecursoController);
    fastify.delete('/:id', { preHandler: verificarAdminOuCoordenador, schema: {
        tags: ['tipos de recurso'],
        summary: 'Deletar tipo de recurso',
        params: {
            type: 'object',
            required: ['id'],
            properties: { id: { type: 'string' } }
        }
    } }, deleteTipoRecursoController);
}
