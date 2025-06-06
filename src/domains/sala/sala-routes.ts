import { FastifyInstance } from 'fastify';
import {
  createSala,
  getAllSalas,
  getSalaById,
  updateSala,
  deleteSala,
} from './sala-controller';
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

export default async function salaRoutes(app: FastifyInstance) {
  app.addHook('preHandler', verifyJwt);

  app.post('/', { preHandler: verificarAdmin, schema: { tags: ['salas'] } }, createSala);

  app.get('/', {
    schema: {
      tags: ['salas'],
      summary: 'Listar todas as salas',
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              nome: { type: 'string' },
              capacidade: { type: 'number' },
              predioId: { type: 'number' },
              predio: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  nome: { type: 'string' }
                }
              }
            }
          }
        }
      }
    }
  }, getAllSalas);

  app.get('/:id', {
    schema: {
      tags: ['salas'],
      summary: 'Buscar sala por ID',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            nome: { type: 'string' },
            capacidade: { type: 'number' },
            predioId: { type: 'number' },
            predio: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                nome: { type: 'string' }
              }
            }
          }
        },
        404: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    }
  }, getSalaById);

  app.put('/:id', { preHandler: verificarAdmin, schema: { tags: ['salas'] } }, updateSala);

  app.delete('/:id', { preHandler: verificarAdmin, schema: { tags: ['salas'] } }, deleteSala);
} 