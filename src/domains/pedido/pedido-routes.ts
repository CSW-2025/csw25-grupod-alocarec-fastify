import { FastifyInstance } from 'fastify';
import {
  createPedido,
  getAllPedidos,
  getPedidoById,
  updatePedido,
  deletePedido,
} from './pedido-controller';

const pedidoSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    nome: { type: 'string' },
    status: { type: 'string' },
    moderador_id: { type: 'number' },
    sala_id: { type: 'number' },
    recurso_id: { type: 'number' },
    aula_id: { type: 'number' },
    disciplina_id: { type: 'number' },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' }
  }
};

export default async function pedidoRoutes(fastify: FastifyInstance) {
  fastify.post('/', {
    schema: {
      tags: ['pedidos'],
      summary: 'Criar um novo pedido',
      body: {
        type: 'object',
        required: ['nome', 'status', 'aula_id', 'disciplina_id'],
        properties: {
          nome: { type: 'string' },
          status: { type: 'string' },
          moderador_id: { type: 'number' },
          sala_id: { type: 'number' },
          recurso_id: { type: 'number' },
          aula_id: { type: 'number' },
          disciplina_id: { type: 'number' }
        }
      },
      response: { 201: pedidoSchema }
    }
  }, createPedido);

  fastify.get('/', {
    schema: {
      tags: ['pedidos'],
      summary: 'Listar todos os pedidos',
      response: {
        200: {
          type: 'array',
          items: pedidoSchema
        }
      }
    }
  }, getAllPedidos);

  fastify.get('/:id', {
    schema: {
      tags: ['pedidos'],
      summary: 'Buscar pedido por ID',
      params: {
        type: 'object',
        required: ['id'],
        properties: { id: { type: 'string' } }
      },
      response: {
        200: pedidoSchema,
        404: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  }, getPedidoById);

  fastify.put('/:id', {
    schema: {
      tags: ['pedidos'],
      summary: 'Atualizar pedido',
      params: {
        type: 'object',
        required: ['id'],
        properties: { id: { type: 'string' } }
      },
      body: {
        type: 'object',
        properties: {
          nome: { type: 'string' },
          status: { type: 'string' },
          moderador_id: { type: 'number' },
          sala_id: { type: 'number' },
          recurso_id: { type: 'number' },
          aula_id: { type: 'number' },
          disciplina_id: { type: 'number' }
        }
      },
      response: {
        200: pedidoSchema,
        404: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  }, updatePedido);

  fastify.delete('/:id', {
    schema: {
      tags: ['pedidos'],
      summary: 'Deletar pedido',
      params: {
        type: 'object',
        required: ['id'],
        properties: { id: { type: 'string' } }
      },
      response: {
        204: { type: 'null' },
        404: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  }, deletePedido);
}
