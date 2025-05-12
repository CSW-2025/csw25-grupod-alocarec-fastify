import { FastifyInstance } from 'fastify';
import { createPerfilController, getAllPerfisController, getPerfilByIdController, updatePerfilController, deletePerfilController } from './perfil-controller';

const perfilSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    nome: { type: 'string' }
  }
};

export default async function perfilRoutes(fastify: FastifyInstance) {
  fastify.post('/', {
    schema: {
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
    }
  }, createPerfilController);

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

  fastify.put('/:id', {
    schema: {
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
    }
  }, updatePerfilController);

  fastify.delete('/:id', {
    schema: {
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
    }
  }, deletePerfilController);
} 