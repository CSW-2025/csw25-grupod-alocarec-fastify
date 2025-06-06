import { FastifyInstance } from 'fastify';
import { createPerfilController, getAllPerfisController, getPerfilByIdController, updatePerfilController, deletePerfilController } from './perfil-controller';
import { verifyJwt } from '../../config/auth';

const perfilSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    nome: { type: 'string' }
  }
};

function verificarAdmin(request: any, reply: any, done: any) {
  const user = request.user;
  if (!user || !user.perfil || user.perfil.nome !== 'Admin') {
    reply.code(403).send({ message: 'Acesso restrito a administradores.' });
    return;
  }
  done();
}

export default async function perfilRoutes(fastify: FastifyInstance) {
  // Middleware para autenticação JWT
  fastify.addHook('preHandler', verifyJwt);
  fastify.post('/', { preHandler: verificarAdmin, schema: {
    tags: ['perfis'],
    summary: 'Criar um novo perfil',
    body: {
      type: 'object',
      required: ['nome'],
      properties: {
        nome: { type: 'string' }
      }
    },
    response: {
      201: perfilSchema
    }
  } }, createPerfilController);

  fastify.get('/', {
    schema: {
      tags: ['perfis'],
      summary: 'Listar todos os perfis',
      response: {
        200: {
          type: 'array',
          items: perfilSchema
        }
      }
    }
  }, getAllPerfisController);

  fastify.get('/:id', {
    schema: {
      tags: ['perfis'],
      summary: 'Buscar perfil por ID',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string' }
        }
      },
      response: {
        200: perfilSchema,
        404: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    }
  }, getPerfilByIdController);

  fastify.put('/:id', { preHandler: verificarAdmin, schema: {
    tags: ['perfis'],
    summary: 'Atualizar perfil',
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string' }
      }
    },
    body: {
      type: 'object',
      properties: {
        nome: { type: 'string' }
      }
    },
    response: {
      200: perfilSchema,
      404: {
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      }
    }
  } }, updatePerfilController);

  fastify.delete('/:id', { preHandler: verificarAdmin, schema: {
    tags: ['perfis'],
    summary: 'Deletar perfil',
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string' }
      }
    },
    response: {
      204: { type: 'null' },
      404: {
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      }
    }
  } }, deletePerfilController);
} 